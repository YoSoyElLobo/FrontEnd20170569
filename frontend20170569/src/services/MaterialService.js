import axios from "axios";
import url from "../config";


export async function getMaterial (setValues) {
  const response = await axios.get(`${url}material/list`)
  let dataParse = response.data.payload.materiales.map((row) => {
    return {...row, id: row.idMaterial}
  })
  setValues(dataParse)
}