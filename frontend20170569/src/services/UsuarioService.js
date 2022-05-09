import axios from "axios";
import url from "../config";
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";
import Link from '@mui/material/Link';

export async function getUsuario (setValues) {
  const response = await axios.get(`${url}usuario/list`)
  let dataParse = response.data.payload.usuarios.map((row) => {
    return {...row, id: row.idUsuario}
  })
  setValues(dataParse)
}

export async function getUsuarioById (id, setValues) {
  const response = await axios.get(`${url}usuario/findById?idUsuario=${id}`)
  let usuario =  response.data.payload.usuario;
  usuario.listUsuarioEnfermedad = response.data.payload.usuario.listUsuarioEnfermedad.map((row) => {
    return {...row, 
            id: row.idUsuarioEnfermedad, 
            usuario: {
              idUsuario: id
            }}
  });
  usuario.listUsuarioFarmaco = response.data.payload.usuario.listUsuarioFarmaco.map((row) => {
    return  {...row,
            id: row.idUsuarioFarmaco,
            usuario: {
              idUsuario: id
            }}
  });
  usuario.listUsuarioDeporte = response.data.payload.usuario.listUsuarioDeporte.map((row) => {
    return  {...row,
            id: row.idUsuarioDeporte,
            usuario: {
              idUsuario: id
            }}
  });
  usuario.listUsuarioAlimento = response.data.payload.usuario.listUsuarioAlimento.map((row) => {
    return  {...row, 
            id: row.idUsuarioAlimento,
            usuario: {
              idUsuario: id
            }}
  });


  console.log(response.data.payload.usuario.sexo)
  setValues(usuario) 
  
  

}

export async function insertUsuario (data, setValues, setValuesFiltered, setNotify) {
  const usuario = {
    nombres: data.nombres,
    apellidos: data.apellidos,
    correoElectronico: data.correoElectronico,
    sexo: data.sexo,
    numeroDocumento: data.numeroDocumento,
    telefono: data.telefono,
    fechaNacimiento: data.fechaNacimiento,
    rol: {
      idRol: data.rol.idRol
    }
  }
  axios.post(`${url}usuario/create`, usuario)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
        type: 'success'
      });
      getUsuario(setValues)
      getUsuario(setValuesFiltered)
      
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

export async function updateUsuario (data, setValues, setValuesFiltered, setNotify) {

  const usuario   = {
    idUsuario: data.idUsuario,
    nombres: data.nombres,
    apellidos: data.apellidos,
    correoElectronico: data.correoElectronico,
    sexo: data.sexo,
    numeroDocumento: data.numeroDocumento,
    telefono: data.telefono,
    fechaNacimiento: data.fechaNacimiento,
    rol: {
        idRol: data.rol.idRol
    }
  }
  await axios.put(`${url}usuario/update`, usuario)
    .then(response => {
      getUsuario(setValues)
      getUsuario(setValuesFiltered)
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

export async function deleteUsuario(id, setValues, setValuesFiltered, setNotify) {
  axios.delete(`${url}usuario/delete?idUsuario=${id}`)
  .then(response => {
    setNotify({
      isOpen: true,
      message: 'Eliminado correctamente',
      type: 'success'
    });
    getUsuario(setValues)
    getUsuario(setValuesFiltered)
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

export async function getEspera (setValues) {
  const response = await axios.get(`${url}usuario/listEspera`)
  let dataParse = response.data.payload.usuarios.map((row) => {
    return {...row, id: row.idUsuario}
  })
  setValues(dataParse)
}

export async function aprobarConsentimiento (id, setValues, setValuesFiltered, setNotify) {
  await axios.post(`${url}usuario/aprobarConsentimiento?idUsuario=${id}`)
    .then(response => {
      getUsuario(setValues)
      getUsuario(setValuesFiltered)
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

export async function rechazarConsentimiento (id, setValues, setValuesFiltered, setNotify) {
  await axios.post(`${url}usuario/rechazarConsentimiento?idUsuario=${id}`)
    .then(response => {
      getUsuario(setValues)
      getUsuario(setValuesFiltered)
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
  await axios.get(`${url}rol/list`)
  .then(response => {
    let dataParse = response.data.payload.roles.map((row) => {
      return {...row, id: row.idRol}
    })
    roles = dataParse;
  })

  data = data.filter((row) => row.length);
  let usuarios = data.slice(1, data.length);
  usuarios = usuarios.map((usuario, index) => {

    return {nombres: usuario[0],
            apellidos: usuario[1],
            correoElectronico: usuario[2],
            sexo: usuario[3],
            numeroDocumento: usuario[4],
            telefono: usuario[5],
            fechaNacimiento: usuario[6],
            rol: roles.find((rol) => rol.nombreEspanol === usuario[7])   
        }
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

  console.log(usuarios)
  try {
    const response = await axios.post(`${url}usuario/createAll`, usuarios);
    await setNotify({
      isOpen: true,
      message: 'Usuarios cargados existosamente',
      type: 'success'
    });
    getUsuario(setValues)
    getUsuario(setValuesFiltered)
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



const validate = (usuarios) => {

  let arrayLog = [];
  usuarios.forEach((usuario, index) => {
    const rowNumber = index + 1;
    if (!(usuario.nombres && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(usuario.nombres)))
      arrayLog.push(`Error en nombre de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
    if (!(usuario.apellidos && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(usuario.apellidos)))
      arrayLog.push(`Error en nombre de fila ${rowNumber}: Este campo es obligatorio y debe ser alfabético`);
    if (!(usuario.correoElectronico && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(usuario.correoElectronico)))
      arrayLog.push(`Error en correo de fila ${rowNumber}: Correo electrónico no válido`);
    if (!(usuario.numeroDocumento && (/^[0-9\b]+$/).test(usuario.numeroDocumento.toString())))
      arrayLog.push(`Error en código de fila ${rowNumber}: Este campo es obligatorio y debe ser numérico`);
    if (!(usuario.telefono && (/^[0-9\b]+$/).test(usuario.telefono.toString())))
      arrayLog.push(`Error en código de fila ${rowNumber}: Este campo es obligatorio y debe ser numérico`);
    if (!(usuario.fechaNacimiento && (/^(0?[1-9]|[12][0-9]|3[01])[\-\-](0?[1-9]|1[012])[\-\-]\d{4}$/).test(usuario.fechaNacimiento)))
      arrayLog.push(`Error en código de fila ${rowNumber}: Este campo es obligatorio y debe ser estar en el formato dd-mm-aaaa`);

    //falta el de la fecha
  });
  let arrayLog2 = arrayLog.map(log => { return { error: log } });
  if(arrayLog.length)
    throw arrayLog2;
}

export async function updateDatosGenerales (data, setValues, setNotify) {
  const usuario   = {
    idUsuario: data.idUsuario,
    correoElectronico: data.correoElectronico,
    sexo: data.sexo,
    telefono: data.telefono,
    fechaNacimiento: data.fechaNacimiento,
    peso: data.peso,
    talla: data.talla
  }
  
  await axios.put(`${url}usuario/updateDatosGenerales`, usuario)
    .then(response => {
      getUsuarioById(data.idUsuario, setValues)
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

export async function retiro (data, setNotify) {
  const usuario   = {
    idUsuario: data.idUsuario,
    motivoRechazo: data.motivoRechazo
  }
  
  await axios.put(`${url}usuario/retiro`, usuario)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Información retirada del sistema correctamente',
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


export async function consentimiento (data, setNotify, setUser) {
  const usuario   = {
    idUsuario: data.idUsuario,
    nombres: data.nombres,
    apellidos: data.apellidos,
    pais: {
      idPais: data.idPais
    },
    documentoConsentimiento: data.documentoConsentimiento
  }
  
  await axios.put(`${url}usuario/consentimiento`, usuario)
    .then(response => {
      setUser(response.data.payload.usuario)
      setNotify({
        isOpen: true,
        message: 'Documento de consentimiento informado registrado correctamente',
        type: 'success'
      });
    }
  )
    .catch(error => {
      console.log(error)
      setNotify({
        isOpen: true,
        message: error.response.message,
        type: 'error'
      });
    });
}

