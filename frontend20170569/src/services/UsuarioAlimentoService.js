import axios from "axios";
import url from "../config";

import * as usuarioService from '../services/UsuarioService';



export async function insertUsuarioAlimento (data, setValues, setNotify) {
  console.log(data)
  const usuarioAlimento = {
    usuario: {
        idUsuario: data.usuario.idUsuario
    },
    alimento: {
        idAlimento: data.alimento.idAlimento
    },
    cantidad: data.cantidad,
    fechaModificacion: new Date()
  }
  axios.post(`${url}usuarioalimento/create`, usuarioAlimento)
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

export async function updateUsuarioAlimento (data, setValues, setNotify) {
  console.log(data)
  const usuarioAlimento = {
    idUsuarioAlimento: data.idUsuarioAlimento,
    usuario: {
        idUsuario: data.usuario.idUsuario
    },
    alimento: {
        idAlimento: data.alimento.idAlimento
    },
    apellidos: data.apellidos,
    cantidad: data.cantidad,
    fechaModificacion: new Date()
  }
  axios.put(`${url}usuarioalimento/update`, usuarioAlimento)
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

export async function deleteUsuarioAlimento(data, setValues, setNotify) {
    axios.delete(`${url}usuarioalimento/delete?idUsuarioAlimento=${data.idUsuarioAlimento}`)
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
        message: "No se pudo eliminar el alimento",
        type: 'error'
      });
    });
  }
