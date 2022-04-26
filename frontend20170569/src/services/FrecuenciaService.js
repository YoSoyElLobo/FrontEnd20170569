import axios from "axios";
import url from "../config";

export async function getFrecuencia (setValues) {
  const response = await axios.get(`${url}frecuencia/list`)
  let dataParse = response.data.payload.frecuencias.map((row) => {
    return {...row, id: row.idFrecuencia}
  })
  setValues(dataParse)
}


