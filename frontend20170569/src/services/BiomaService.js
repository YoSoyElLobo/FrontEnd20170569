import axios from "axios";
import url from "../config";


export async function getBioma (setValues) {
  const response = await axios.get(`${url}bioma/list`)
  let dataParse = response.data.payload.biomas.map((row) => {
    return {...row, id: row.idBioma}
  })
  setValues(dataParse)
}