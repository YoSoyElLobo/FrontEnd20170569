import axios from "axios";
import url from "../config";
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";
import Link from '@mui/material/Link';

export async function getPais (setValues) {
  const response = await axios.get(`${url}pais/list`)
  let dataParse = response.data.payload.paises.map((row) => {
    return {...row, id: row.idPais}
  })
  setValues(dataParse)
}

export async function insertPais (data, setValues, setValuesFiltered, setNotify) {
  const pais = {
    nombreEspanol: data.nombreEspanol,
    nombreIngles: data.nombreIngles
  }
  axios.post(`${url}pais/create`, pais)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
        type: 'success'
      });
      getPais(setValues)
      getPais(setValuesFiltered)
      
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

export async function updatePais (data, setValues, setValuesFiltered, setNotify) {
  const pais   = {
    idPais: data.idPais,
    nombreEspanol: data.nombreEspanol,
    nombreIngles: data.nombreIngles
  }
  await axios.put(`${url}pais/update`, pais)
    .then(response => {
      getPais(setValues)
      getPais(setValuesFiltered)
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

export async function deletePais(id, setValues, setValuesFiltered, setNotify) {
  axios.delete(`${url}pais/delete?idPais=${id}`)
  .then(response => {
    setNotify({
      isOpen: true,
      message: 'Eliminado correctamente',
      type: 'success'
    });
    getPais(setValues)
    getPais(setValuesFiltered)
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

export async function loadBulkPais (file, setNotify, setValues, setValuesFiltered) {
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
  await axios.get(`${url}pais/list`)
  .then(response => {
    let dataParse = response.data.payload.paises.map((row) => {
      return {...row, id: row.idPais}
    })
    temp = dataParse;
  })
  //Fin

  data = data.filter((row) => row.length);
  let paises = data.slice(1, data.length);
  paises = paises.map((pais, index) => {
    return {nombreEspanol: pais[0],
            nombreIngles: pais[1]}
  })

  try{
    validate(paises);
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
    const response = await axios.post(`${url}pais/createAll`, paises);
    await setNotify({
      isOpen: true,
      message: 'Paises cargados existosamente',
      type: 'success'
    });
    getPais(setValues)
    getPais(setValuesFiltered)
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



const validate = (paises) => {

  let arrayLog = [];
  paises.forEach((pais, index) => {
    const rowNumber = index + 1;
    if (!(pais.nombreEspanol && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(pais.nombreEspanol)))
      arrayLog.push(`Error en nombre de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
    if (!(pais.nombreIngles && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(pais.nombreIngles)))
      arrayLog.push(`Error en nombre de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
  });
  let arrayLog2 = arrayLog.map(log => { return { error: log } });
  if(arrayLog.length)
    throw arrayLog2;
}


