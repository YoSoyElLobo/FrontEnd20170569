import React, {useState, useEffect } from "react";
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

//components
import TLLabel from '../atoms/TLLabel.atom';
import TLIconButton from '../atoms/TLIconButton.atom';
import TLNotification from '../molecules/TLNotification.molecule';

//mui
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CancelIcon from '@mui/icons-material/Cancel';
import Container from '../../styles/Dropzone';

import {t} from 'i18next';

const TLFileUpload = ({ setSave, service, accept, maxFiles, setValues, setValuesFiltered }) => {
  const [file, setFile] = useState(null);
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
      maxSize: 20000000,
      maxFiles: maxFiles,
      accept: accept,
      onDropAccepted: (acceptedFiles) => {
        setFile(acceptedFiles[0]);
      },
      onDropRejected:(fileRejections) => {
        setNotify({
          isOpen: true,
          message: 'Formato incorrecto',
          type: 'error'
        })
      }
    });

  useEffect(() => {
    setSave(() => () => onSave())
  }, [file])

  const onSave = async () => {
    if (file) {
      let result = await service(file, setNotify, setValues, setValuesFiltered);
      return result;
    }
    else {
      setNotify({
        isOpen: true,
        message: 'Por favor, debe subir un archivo',
        type: 'error'
      });
      return false;
    }
  }

  return(
    <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
      {!file && <input {...getInputProps()}/>}
      <UploadFileIcon/>
      <TLLabel>{file ? file.path : t('ArrastreArchivo')}</TLLabel>
      {file && <TLIconButton onClick={()=>setFile(null)}><CancelIcon/></TLIconButton>}
      <TLNotification 
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Container>
  )
}

export default TLFileUpload;