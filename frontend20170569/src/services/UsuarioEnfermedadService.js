import axios from "axios";
import url from "../config";

import * as usuarioService from '../services/UsuarioService';



export async function insertUsuarioEnfermedad (data, setValues, setNotify) {
  console.log(data)
  const usuarioEnfermedad = {
    usuario: {
        idUsuario: data.usuario.idUsuario
    },
    enfermedad: {
        idEnfermedad: data.enfermedad.idEnfermedad
    },
    fechaDiagnostico: data.fechaDiagnostico,
    estado: data.estado,
    fechaModificacion: new Date()
  }
  axios.post(`${url}usuarioenfermedad/create`, usuarioEnfermedad)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
        type: 'success'
      });
      usuarioService.getUsuarioById(data.usuario.idUsuario, setValues)      
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

export async function updateUsuarioEnfermedad (data, setValues, setNotify) {
  console.log(data)
  const usuarioEnfermedad = {
    idUsuarioEnfermedad: data.idUsuarioEnfermedad,
    usuario: {
        idUsuario: data.usuario.idUsuario
    },
    enfermedad: {
        idEnfermedad: data.enfermedad.idEnfermedad
    },
    fechaDiagnostico: data.fechaDiagnostico,
    estado: data.estado,
    fechaModificacion: new Date()
  }
  axios.put(`${url}usuarioenfermedad/update`, usuarioEnfermedad)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
        type: 'success'
      });
      usuarioService.getUsuarioById(data.usuario.idUsuario, setValues)      
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

export async function deleteUsuarioEnfermedad(data, setValues, setNotify) {
    axios.delete(`${url}usuarioenfermedad/delete?idUsuarioEnfermedad=${data.idUsuarioEnfermedad}`)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Eliminado correctamente',
        type: 'success'
      });
        console.log(data)
        usuarioService.getUsuarioById(data.usuario.idUsuario, setValues)
      }
    )
    .catch(error => {
      setNotify({
        isOpen: true,
        message: "No se pudo eliminar el enfermedad",
        type: 'error'
      });
    });
  }
