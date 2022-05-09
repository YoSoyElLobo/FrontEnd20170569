import axios from "axios";
import url from "../config";

export async function uploadFileService (file) {
  return new Promise(resolve => {
    let formData = new FormData();
    formData.append("multipartFile",file);
    axios.post(
      `${url}cloudinary/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
    ).then(result=>{
      resolve(result.data.payload.archivo.secure_url)
    })
  })
}