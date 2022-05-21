import axios from "axios";
import url from "../config";
import * as estudioService from '../services/EstudioService';
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";
import Link from '@mui/material/Link';

export async function insertUsuarioEstudio (idUsuario, idEstudio, setValues, setNotify) {
  const usuarioEstudio = {
    usuario: {
        idUsuario: idUsuario
    },
    estudio: {
        idEstudio: idEstudio
    }
  }
  axios.post(`${url}usuarioestudio/create`, usuarioEstudio)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
        type: 'success'
      });
      estudioService.getEstudioById(usuarioEstudio.estudio.idEstudio, setValues);      
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

export async function updateUsuarioEstudio (data, idEstudio, setValues, setNotify) {
  const usuarioEstudio = {
    idUsuarioEstudio: data.idUsuarioEstudio,
    usuario: {
        idUsuario: data.usuario.idUsuario
    },
    estudio: {
        idEstudio: idEstudio
    },
    codigoMuestra: data.codigoMuestra,
    fechaMuestreo: data.fechaMuestreo
  }
  console.log(data)
  axios.put(`${url}usuarioestudio/update`, usuarioEstudio)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
        type: 'success'
      });
      estudioService.getEstudioById(idEstudio, setValues);      
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


const validate = (listUsuarioEstudio) => {

  let arrayLog = [];
  console.log(listUsuarioEstudio)
  listUsuarioEstudio.forEach((usuarioEstudio, index) => {
    const rowNumber = index + 1;
    if (!(usuarioEstudio.usuario.idUsuario && (/^[0-9\b]+$/).test(usuarioEstudio.usuario.idUsuario.toString())))
      arrayLog.push(`Error en código de fila ${rowNumber}: Este campo es obligatorio y debe ser numérico`);
    if (!(usuarioEstudio.codigoMuestra && (/^[a-zA-Z0-9_]*$/).test(usuarioEstudio.codigoMuestra)))
      arrayLog.push(`Error en nombre de fila ${rowNumber}: Este campo es obligatorio y debe ser alfanumérico`);
    if (!(usuarioEstudio.fechaMuestreo && (/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/).test(usuarioEstudio.fechaMuestreo)))
      arrayLog.push(`Error en código de fila ${rowNumber}: Este campo es obligatorio y debe ser estar en el formato aaaa-mm-dd`);
  });
  let arrayLog2 = arrayLog.map(log => { return { error: log } });
  if(arrayLog.length)
    throw arrayLog2;
}

export async function loadBulkParticipante (file, idEstudio, setNotify, setValues) {
  let data;
  const reader = new FileReader();
  reader.onload = function (e) {
    const readedData = XLSX.read(e.target.result, {type: 'binary'});
    const wsname = readedData.SheetNames[0];
    const ws = readedData.Sheets[wsname];
    data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  };
  reader.readAsBinaryString(file);

  let roles;
  await axios.get(`${url}rol/list`)
  .then(response => {
    let dataParse = response.data.payload.roles.map((row) => {
      return {...row, id: row.idRol}
    })
    roles = dataParse;
  })
  data = data.filter((row) => row.length);
  let listUsuarioEstudio = data.slice(1, data.length);
  listUsuarioEstudio = listUsuarioEstudio.map((usuarioEstudio, index) => {

    return {usuario: { idUsuario: usuarioEstudio[0] },
            estudio: { idEstudio: idEstudio},
            codigoMuestra: usuarioEstudio[1],
            fechaMuestreo: usuarioEstudio[2]
            }
  })
  try{
    validate(listUsuarioEstudio);
    console.log(4)
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
  console.log(listUsuarioEstudio)
  try {
    const response = await axios.post(`${url}usuarioestudio/createAll`, listUsuarioEstudio);
    await setNotify({
      isOpen: true,
      message: 'Participantes actualizados existosamente',
      type: 'success'
    });
    estudioService.getEstudioById(idEstudio, setValues)
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