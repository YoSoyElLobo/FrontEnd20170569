import axios from "axios";
import url from "../config";
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";
import Link from '@mui/material/Link';

export async function getDeporte (setValues) {
  const response = await axios.get(`${url}deporte/list`)
  let dataParse = response.data.payload.deportes.map((row) => {
    return {...row, id: row.idDeporte}
  })
  setValues(dataParse)
}

export async function insertDeporte (data, setValues, setValuesFiltered, setNotify) {
  const deporte = {
    nombreEspanol: data.nombreEspanol,
    nombreIngles: data.nombreIngles,
  }
  axios.post(`${url}deporte/create`, deporte)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
        type: 'success'
      });
      getDeporte(setValues)
      getDeporte(setValuesFiltered)
      
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

export async function updateDeporte (data, setValues, setValuesFiltered, setNotify) {
  const deporte   = {
    idDeporte: data.idDeporte,
    nombreEspanol: data.nombreEspanol,
    nombreIngles: data.nombreIngles,
  }
  await axios.put(`${url}deporte/update`, deporte)
    .then(response => {
      getDeporte(setValues)
      getDeporte(setValuesFiltered)
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

export async function deleteDeporte(id, setValues, setValuesFiltered, setNotify) {
  axios.delete(`${url}deporte/delete?idDeporte=${id}`)
  .then(response => {
    setNotify({
      isOpen: true,
      message: 'Eliminado correctamente',
      type: 'success'
    });
    getDeporte(setValues)
    getDeporte(setValuesFiltered)
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

export async function loadBulkDeporte (file, setNotify, setValues, setValuesFiltered) {
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
  await axios.get(`${url}deporte/list`)
  .then(response => {
    let dataParse = response.data.payload.deportes.map((row) => {
      return {...row, id: row.idRol}
    })
    temp = dataParse;
  })
  //Fin

  data = data.filter((row) => row.length);
  let deportes = data.slice(1, data.length);
  deportes = deportes.map((deporte, index) => {
    return {nombreEspanol: deporte[0], 
            nombreIngles: deporte[1]}
  })

  try{
    validate(deportes);
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
    const response = await axios.post(`${url}deporte/createAll`, deportes);
    await setNotify({
      isOpen: true,
      message: 'Deportes cargados existosamente',
      type: 'success'
    });
    getDeporte(setValues)
    getDeporte(setValuesFiltered)
  } catch(error) {
    let erorres = error.response.data.payload.errores.map(log => { return { error: log } });
    let linkComponent = <> Error - Descargue los errores de deportes repetidos <Link sx={{color: 'white', textDecoration: "underline", textDecorationColor: "white"}} onClick={(e) => exportToExcel(erorres, "Log_errores_repetidos")}> aquí </Link> </>;
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



const validate = (deportes) => {

  let arrayLog = [];
  deportes.forEach((deporte, index) => {
    const rowNumber = index + 1;
    if (!(deporte.nombreEspanol && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(deporte.nombreEspanol)))
      arrayLog.push(`Error en nombre de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
    if (!(deporte.nombreIngles && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(deporte.nombreIngles)))
      arrayLog.push(`Error en nombre de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
  });
  let arrayLog2 = arrayLog.map(log => { return { error: log } });
  if(arrayLog.length)
    throw arrayLog2;
}


