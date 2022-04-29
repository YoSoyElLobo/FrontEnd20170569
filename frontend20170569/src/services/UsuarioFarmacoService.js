import axios from "axios";
import url from "../config";

import * as usuarioService from '../services/UsuarioService';



export async function insertUsuarioFarmaco (data, setValues, setNotify) {
  console.log(data)
  const usuarioFarmaco = {
    usuario: {
        idUsuario: data.usuario.idUsuario
    },
    farmaco: {
        idFarmaco: data.farmaco.idFarmaco
    },
    dosis: data.dosis,
    cantidad: data.cantidad,
    frecuencia: {
        idFrecuencia: data.frecuencia.idFrecuencia
    },
    fechaInicio: data.fechaInicio,
    fechaModificacion: new Date()
  }
  axios.post(`${url}usuariofarmaco/create`, usuarioFarmaco)
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

export async function updateUsuarioFarmaco (data, setValues, setNotify) {
  console.log(data)
  const usuarioFarmaco = {
    idUsuarioFarmaco: data.idUsuarioFarmaco,
    usuario: {
        idUsuario: data.usuario.idUsuario
    },
    farmaco: {
        idFarmaco: data.farmaco.idFarmaco
    },
    dosis: data.dosis,
    cantidad: data.cantidad,
    frecuencia: {
        idFrecuencia: data.frecuencia.idFrecuencia
    },
    fechaInicio: data.fechaInicio,
    fechaModificacion: new Date()
  }
  axios.put(`${url}usuariofarmaco/update`, usuarioFarmaco)
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

export async function deleteUsuarioFarmaco(data, setValues, setNotify) {
    axios.delete(`${url}usuariofarmaco/delete?idUsuarioFarmaco=${data.idUsuarioFarmaco}`)
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
        message: "No se pudo eliminar el farmaco",
        type: 'error'
      });
    });
  }
