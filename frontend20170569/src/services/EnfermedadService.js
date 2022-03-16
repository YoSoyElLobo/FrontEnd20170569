import axios from "axios";
import url from "../config";
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";
import Link from '@mui/material/Link';

export async function getEnfermedad (setValues) {
  const response = await axios.get(`${url}enfermedad/list`)
  let dataParse = response.data.payload.enfermedades.map((row) => {
    return {...row, id: row.idEnfermedad}
  })
  setValues(dataParse)
}

export async function insertUsuario (data, values, setValues, valuesFiltered, setValuesFiltered, setNotify) {
  const usuario = {
    codigoPUCP: data.codigoPUCP,
    nombre: data.nombre,
    apPaterno: data.apPaterno,
    apMaterno: data.apMaterno,
    correoElectronico: data.correoElectronico,
    rol: {
      idRol: data.rol.idRol,
      descripcion: data.rol.descripcion,
    },
    descripcion: data.descripcion
  }
  axios.post(`${url}user/create`, usuario)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
        type: 'success'
      });
      insertItem(values, setValues, usuario)
      insertItem(valuesFiltered, setValuesFiltered, usuario)
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

export async function updateUsuario (data, values, setValues, valuesFiltered, setValuesFiltered, setNotify) {
  const usuario = {
    idUsuario: data.idUsuario,
    codigoPUCP: data.codigoPUCP,
    nombre: data.nombre,
    apPaterno: data.apPaterno,
    apMaterno: data.apMaterno,
    correoElectronico: data.correoElectronico,
    rol: {
      idRol: data.rol.idRol,
    },
    descripcion: data.descripcion,
    infoCompleta: data.infoCompleta
  }
  await axios.put(`${url}user/update`, usuario)
    .then(response => {
      let newUser = response.data.payload.usuario
      updateItem(values, setValues, newUser)
      updateItem(valuesFiltered, setValuesFiltered, newUser)
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

export async function deleteUsuario(id, values, setValues, valuesFiltered, setValuesFiltered, setNotify) {
  axios.get(`${url}user/delete?id=${id}`)
  .then(response => {
    setNotify({
      isOpen: true,
      message: 'Eliminado correctamente',
      type: 'success'
    });
    deleteItem(values, setValues, id)
    deleteItem(valuesFiltered, setValuesFiltered, id)
    }
  )
  .catch(error => {
    setNotify({
      isOpen: true,
      message: "No se pudo eliminar el usuario",
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

export async function loadBulkUsuario (file, setNotify, setValues, setValuesFiltered) {

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
  await axios.get(`${url}role/list`)
  .then(response => {
    let dataParse = response.data.payload.roles.map((row) => {
      return {...row, id: row.idRol}
    })
    roles = dataParse;
  })

  data = data.filter((row) => row.length);
  let usuarios = data.slice(1, data.length);
  usuarios = usuarios.map((usuario, index) => {
    return {codigoPUCP: usuario[0], nombre: usuario[1], apPaterno: usuario[2], apMaterno: usuario[3], correoElectronico: usuario[4], descripcion: usuario[5] ?? "", rol: roles.find((rol) => rol.descripcion === usuario[6])}
  })

  try{
    validate(usuarios);
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
    const response = await axios.post(`${url}user/import`, usuarios);
    await setNotify({
      isOpen: true,
      message: 'Usuarios cargados existosamente',
      type: 'success'
    });
    getEnfermedad(setValues)
    getEnfermedad(setValuesFiltered)
  } catch(error) {
    let erorres = error.response.data.payload.errores.map(log => { return { error: log } });
    let linkComponent = <> Error - Descargue los errores de usuarios repetido <Link sx={{color: 'white', textDecoration: "underline", textDecorationColor: "white"}} onClick={(e) => exportToExcel(erorres, "Log_errores_repetidos")}> aquí </Link> </>;
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

export async function getColaborador (setValues) {
  const response = await axios.get(`${url}user/colaborators`)
  let dataParse = response.data.payload.coolaboradores.map((row) => {
    return {...row, id: row.idUsuario}
  })
  setValues(dataParse)
}

const validate = (usuarios) => {

  let arrayLog = [];
  usuarios.forEach((usuario, index) => {
    const rowNumber = index + 1;
    if (!(usuario.codigoPUCP.toString().length === 8 && (/^[0-9\b]+$/).test(usuario.codigoPUCP.toString())))
      arrayLog.push(`Error en código de fila ${rowNumber}: Este campo es obligatorio, debe contener 8 digitos y ser numérico`);
    if (!(usuario.nombre && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(usuario.nombre)))
      arrayLog.push(`Error en nombre de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
    if (!(usuario.apPaterno && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(usuario.apPaterno)))
      arrayLog.push(`Error en apellido paterno de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
    if (!(usuario.apMaterno && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(usuario.apMaterno)))
      arrayLog.push(`Error en apellido materno de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
    if (!(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:pucp\.edu\.pe|pucp\.pe)$/).test(usuario.correoElectronico))
      arrayLog.push(`Error en correo de fila ${rowNumber}: Correo electrónico PUCP no válido`);
    if (!usuario.rol)
      arrayLog.push(`Error en rol de fila ${rowNumber}: Campo obligatorio`);
  });
  let arrayLog2 = arrayLog.map(log => { return { error: log } });
  if(arrayLog.length)
    throw arrayLog2;
}

const insertItem = async (values, setValues, newvalue) => {
  let lastindex = Math.max.apply(Math, values.map(v => v.idUsuario))

  let g = newvalue
  g.idUsuario = lastindex + 1
  g.id = g.idUsuario
  await setValues([
    ...values,
    g
  ]);
}

const updateItem = (values, setValues, newvalue) => {
  let index = values.findIndex(x=> x.idUsuario === newvalue.idUsuario);

  let g = values[index]
  g = newvalue
  g.id = g.idUsuario
  if (index !== -1){
    setValues([
      ...values.slice(0,index),
      g,
      ...values.slice(index+1)
    ]);
  }
}

const deleteItem = (values, setValues, id) => {
  let index = values.findIndex(x=> x.idUsuario === id);

  if (index !== -1){
    setValues([
      ...values.slice(0,index),
      ...values.slice(index+1)
    ]);
  }
}