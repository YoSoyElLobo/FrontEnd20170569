import axios from "axios";
import url from "../config";

import * as usuarioService from '../services/UsuarioService';



export async function insertUsuarioDeporte (data, setValues, setNotify) {
  console.log(data)
  const usuarioDeporte = {
    usuario: {
        idUsuario: data.usuario.idUsuario
    },
    deporte: {
        idDeporte: data.deporte.idDeporte
    },
    frecuencia: {
        idFrecuencia: data.frecuencia.idFrecuencia
    },
    fechaInicio: data.fechaInicio,
    fechaModificacion: new Date()
  }
  axios.post(`${url}usuariodeporte/create`, usuarioDeporte)
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

export async function updateUsuarioDeporte (data, setValues, setNotify) {
  console.log(data)
  const usuarioDeporte = {
    idUsuarioDeporte: data.idUsuarioDeporte,
    usuario: {
        idUsuario: data.usuario.idUsuario
    },
    deporte: {
        idDeporte: data.deporte.idDeporte
    },
    frecuencia: {
        idFrecuencia: data.frecuencia.idFrecuencia
    },
    fechaInicio: data.fechaInicio,
    fechaModificacion: new Date()
  }
  axios.put(`${url}usuariodeporte/update`, usuarioDeporte)
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

export async function deleteUsuarioDeporte(data, setValues, setNotify) {
    axios.delete(`${url}usuariodeporte/delete?idUsuarioDeporte=${data.idUsuarioDeporte}`)
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
        message: "No se pudo eliminar el deporte",
        type: 'error'
      });
    });
  }
