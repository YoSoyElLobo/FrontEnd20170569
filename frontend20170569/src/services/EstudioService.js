import axios from "axios";
import url from "../config";
import * as XLSX from 'xlsx';
import * as FileSaver from "file-saver";
import Link from '@mui/material/Link';

export async function getEstudio (setValues) {
  const response = await axios.get(`${url}estudio/list`)
  let dataParse = response.data.payload.estudios.map((row) => {
    return {...row, id: row.idEstudio}
  })
  console.log(dataParse)
  setValues(dataParse)
}

export async function getEstudioById (id, setValues) {
  const response = await axios.get(`${url}estudio/findById?idEstudio=${id}`)
  setValues(response.data.payload.estudio) 
}

