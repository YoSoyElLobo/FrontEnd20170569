import axios from "axios";
import url from "../config";
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";
import Link from '@mui/material/Link';

export async function getFarmaco (setValues) {
  const response = await axios.get(`${url}farmaco/list`)
  let dataParse = response.data.payload.farmacos.map((row) => {
    return {...row, id: row.idFarmaco}
  })
  setValues(dataParse)
}

export async function insertFarmaco (data, setValues, setValuesFiltered, setNotify) {
  const farmaco = {
    nombreEspanol: data.nombreEspanol,
    nombreIngles: data.nombreIngles
  }
  axios.post(`${url}farmaco/create`, farmaco)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
        type: 'success'
      });
      getFarmaco(setValues)
      getFarmaco(setValuesFiltered)
      
    }
  )
    .catch(error => {
      setNotify({
        isOpen: true,
        message: error.response.data.message,
        type: 'error'
      });
    });
}

export async function updateFarmaco (data, setValues, setValuesFiltered, setNotify) {
  const farmaco   = {
    idFarmaco: data.idFarmaco,
    nombreEspanol: data.nombreEspanol,
    nombreIngles: data.nombreIngles
  }
  await axios.put(`${url}farmaco/update`, farmaco)
    .then(response => {
      getFarmaco(setValues)
      getFarmaco(setValuesFiltered)
      setNotify({
        isOpen: true,
        message: 'Actualizado correctamente',
        type: 'success'
      });
    }
  )
    .catch(error => {
      setNotify({
        isOpen: true,
        message: error.response.data.message,
        type: 'error'
      });
    });
}

export async function deleteFarmaco(id, setValues, setValuesFiltered, setNotify) {
  axios.delete(`${url}farmaco/delete?idFarmaco=${id}`)
  .then(response => {
    setNotify({
      isOpen: true,
      message: 'Eliminado correctamente',
      type: 'success'
    });
    getFarmaco(setValues)
    getFarmaco(setValuesFiltered)
    }
  )
  .catch(error => {
    setNotify({
      isOpen: true,
      message: "No se pudo eliminar el fármaco",
      type: 'error'
    });
  });
}

const exportToExcel = (error, filename) => {
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  let ws = XLSX.utils.json_to_sheet(error);
  ws.A1.v = "Errores";
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, filename + fileExtension);
}

export async function loadBulkFarmaco (file, setNotify, setValues, setValuesFiltered) {
  let data;
  const reader = new FileReader();
  reader.onload = function (e) {
    const readedData = XLSX.read(e.target.result, {type: 'binary'});
    const wsname = readedData.SheetNames[0];
    const ws = readedData.Sheets[wsname];
    data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  };
  reader.readAsBinaryString(file);

  //Inicio. Este bloque de código hace tiempo para superar la asincronicidad
  let temp;
  await axios.get(`${url}farmaco/list`)
  .then(response => {
    let dataParse = response.data.payload.farmacos.map((row) => {
      return {...row, id: row.idRol}
    })
    temp = dataParse;
  })
  //Fin

  data = data.filter((row) => row.length);
  let farmacos = data.slice(1, data.length);
  farmacos = farmacos.map((farmaco, index) => {
    return {nombreEspanol: farmaco[0],
            nombreIngles: farmaco[1]}
  })

  try{
    validate(farmacos);
  } catch (error) {
    let linkComponent = <> Error - Descargue los errores de formato <Link sx={{color: 'white', textDecoration: "underline", textDecorationColor: "white"}} onClick={(e) => exportToExcel(error, "Log_errores_formato")}> aquí </Link> </>;
    setNotify({
      isOpen: true,
      message: linkComponent,
      type: 'error',
      permanent: true
    });
    return false;
  }

  
  try {
    const response = await axios.post(`${url}farmaco/createAll`, farmacos);
    await setNotify({
      isOpen: true,
      message: 'Farmacos cargados existosamente',
      type: 'success'
    });
    getFarmaco(setValues)
    getFarmaco(setValuesFiltered)
  } catch(error) {
    let erorres = error.response.data.payload.errores.map(log => { return { error: log } });
    let linkComponent = <> Error - Descargue los errores de fármacos repetidos <Link sx={{color: 'white', textDecoration: "underline", textDecorationColor: "white"}} onClick={(e) => exportToExcel(erorres, "Log_errores_repetidos")}> aquí </Link> </>;
    await setNotify({
      isOpen: true,
      message: linkComponent,
      type: 'error',
      permanent: true
    });
    return false;
  }

  return true;
}



const validate = (farmacos) => {

  let arrayLog = [];
  farmacos.forEach((farmaco, index) => {
    const rowNumber = index + 1;
    if (!(farmaco.nombreEspanol && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(farmaco.nombreEspanol)))
      arrayLog.push(`Error en nombre de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
    if (!(farmaco.nombreIngles && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(farmaco.nombreIngles)))
      arrayLog.push(`Error en nombre de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
  });
  let arrayLog2 = arrayLog.map(log => { return { error: log } });
  if(arrayLog.length)
    throw arrayLog2;
}


