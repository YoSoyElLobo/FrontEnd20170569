import axios from "axios";
import url from "../config";

export async function getRol (setValues) {
  axios.get(`${url}rol/list`)
    .then(response => {
      let dataParse = response.data.payload.roles.map((row) => {
        return {...row, id: row.idRol}
      })
      setValues(dataParse)
    })
}



