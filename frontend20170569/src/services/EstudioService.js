import axios from "axios";
import url from "../config";

export async function getEstudio (setValues) {
  const response = await axios.get(`${url}estudio/list`)
  let dataParse = response.data.payload.estudios.map((row) => {
    return {...row, id: row.idEstudio}
  })
  setValues(dataParse)
}

export async function getEstudioByInvestigador (id, setValues) {
  const response = await axios.get(`${url}estudio/listByInvestigador?idUsuario=${id}`)
  let dataParse = response.data.payload.estudios.map((row) => {
    return {...row, id: row.idEstudio}
  })
  setValues(dataParse)
}

export async function getEstudioByParticipante (id, setValues) {
  const response = await axios.get(`${url}estudio/listByParticipante?idUsuario=${id}`)
  let dataParse = response.data.payload.estudios.map((row) => {
    return {...row, id: row.idEstudio}
  })
  setValues(dataParse)
}

export async function getEstudioById (id, setValues) {
  const response = await axios.get(`${url}estudio/findById?idEstudio=${id}`)
  console.log(response.data.payload.estudio)
  let  estudio = response.data.payload.estudio;
  estudio.listUsuarioEstudio = estudio.listUsuarioEstudio.map((row) => 
    {
      return {...row, id: row.idUsuarioEstudio}
    })
  estudio.listUsuarioEstudio.forEach ((row) => {
    row.usuario.listUsuarioEnfermedad = row.usuario.listUsuarioEnfermedad.map ((row) => {
      return {...row, 
        id: row.idUsuarioEnfermedad}
    })
    row.usuario.listUsuarioFarmaco = row.usuario.listUsuarioFarmaco.map ((row) => {
      return {...row, 
        id: row.idUsuarioFarmaco}
    })
    row.usuario.listUsuarioDeporte = row.usuario.listUsuarioDeporte.map ((row) => {
      return {...row, 
        id: row.idUsuarioDeporte}
    })
    row.usuario.listUsuarioAlimento = row.usuario.listUsuarioAlimento.map ((row) => {
      return {...row, 
        id: row.idUsuarioAlimento}
    })
  })

  setValues(estudio) 
}

export async function insertEstudio (data, setValues, setValuesFiltered, setNotify) {
  const estudio = {
    nombreEspanol: data.nombreEspanol,
    nombreIngles: data.nombreIngles,
    descripcionEspanol: data.descripcionEspanol,
    descripcionIngles: data.descripcionIngles,
    investigador: {
      idUsuario: data.investigador.idUsuario
    },
    fechaInicio: data.fechaInicio,
    fechaFin: data.fechaFin,
    pais: {
      idPais: data.pais.idPais
    },
    latitud: data.latitud,
    longitud: data.longitud,
    bioma: {
      idBioma: data.bioma.idBioma
    },
    fuente: data.fuente, 
    material: {
      idMaterial: data.material.idMaterial
    },
    ncbisampleClassification: data.ncbisampleClassification,
    metodoSecuenciacion: data.metodoSecuenciacion,
    resultados: data.resultados
  }
  console.log(estudio)
  axios.post(`${url}estudio/create`, estudio)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
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

export async function updateEstudio (data, setValues, setNotify) {
  const estudio = {
    idEstudio: data.idEstudio,
    nombreEspanol: data.nombreEspanol,
    nombreIngles: data.nombreIngles,
    descripcionEspanol: data.descripcionEspanol,
    descripcionIngles: data.descripcionIngles,
    investigador: {
      idUsuario: data.investigador.idUsuario
    },
    fechaInicio: data.fechaInicio,
    fechaFin: data.fechaFin,
    pais: {
      idPais: data.pais.idPais
    },
    latitud: data.latitud,
    longitud: data.longitud,
    bioma: {
      idBioma: data.bioma.idBioma
    },
    fuente: data.fuente, 
    material: {
      idMaterial: data.material.idMaterial
    },
    ncbiSampleClassification: data.ncbiSampleClassification,
    metodoSecuenciacion: data.metodoSecuenciacion,
    resultados: data.resultados
  }
  axios.put(`${url}estudio/update`, estudio)
    .then(response => {
      setNotify({
        isOpen: true,
        message: 'Guardado correctamente',
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
  getEstudioById(data.idEstudio, setValues)
}


export async function deleteEstudio(id, setValues, setValuesFiltered, setNotify) {
  axios.delete(`${url}estudio/delete?idEstudio=${id}`)
  .then(response => {
    setNotify({
      isOpen: true,
      message: 'Eliminado correctamente',
      type: 'success'
    });
    getEstudio(setValues)
    getEstudio(setValuesFiltered)
    }
  )
  .catch(error => {
    setNotify({
      isOpen: true,
      message: "No se pudo eliminar el estudio",
      type: 'error'
    });
  });
}


