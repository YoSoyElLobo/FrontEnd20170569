import React from "react";
import { useState, useEffect, useContext } from "react";
//Components
import {useForm, Form} from '../components/atoms/TLForm.atom';
import { UserContext } from "../context/UserContext";
import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLIconButton from "../components/atoms/TLIconButton.atom";
import TLLabel from "../components/atoms/TLLabel.atom";
import TLSelection from "../components/atoms/TLSelection.atom";
import TLNotification from '../components/molecules/TLNotification.molecule';
import TLTextField from "../components/atoms/TLTextField.atom";
import TLDialog from '../components/organisms/TLDialog.organism';
import TLDeporteForm from "../components/organisms/TLDeporteForm.organism";
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
import TLFileUploadConsent from "../components/organisms/TLFileUploadConsent.organism";
//Constants
import { ColumnsDeportes } from '../constants/ColumnsDeportes.constant';
//Mui
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';

import * as paisService from '../services/PaisService';
import * as usuarioService from '../services/UsuarioService';
import * as fileService from '../services/FileService';

import { useTranslation } from "react-i18next";

const Confidencialidad = () => {

  const {user, setUser} = useContext(UserContext);

  const initialValues = {
    idUsuario: user.idUsuario,
    nombres: '',
    apellidos: '',
    pais: {
      idPais: 0, 
      nombreEspanol: '' ,
      nombreIngles: ''   
    },
    documentoConsentimiento: ''
  }

  const validate = () => {
    let temp = {}
    temp.nombres = values.nombres && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(values.nombres) ? "" : "Este campo es obligatorio y debe ser alfabético"
    temp.apellidos = values.apellidos && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(values.apellidos) ? "" : "Este campo es obligatorio y debe ser alfabético"
    temp.numeroDocumento = values.numeroDocumento ? "" : "Este campo es obligatorio"
    temp.pais = values.pais.idPais !== 0 ? "" : "Este campo es obligatorio"  
    temp.documentoConsentimiento = values.documentoConsentimiento ? "" : "El documento de consentimiento es obligatorio" 
    setErrors({
      ...temp
    })
    return Object.values(temp).every(x => x === "")
  }

  const handleSelection = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idPais: value,
        nombreEspanol: paises.filter(x => x.idPais === value)[0].nombreEspanol,
        nombreIngles: paises.filter(x => x.idPais === value)[0].nombreIngles
      }
    });
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  }=useForm(initialValues);


  const {t, i18n} = useTranslation();

  const [file, setFile] = useState(null);
  const [paises, setPaises] = useState(null);
  const [loadConfidencialidad, setLoadConfidencialidad] = useState(null)
  const [urlCloudinary, setUrlCloudinary] = useState(null)

  const [search, setSearch] = useState("");
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})

  useEffect(() => {
    paisService.getPais(setPaises);
  }, [])

  const handleSave = () =>{
    if (!file){
      setNotify({
        isOpen: true,
        message: 'Por favor, debe subir un archivo',
        type: 'error'
      });
    }
    else{
      fileService.uploadFileService(file)
        .then(fileUrl => {
          console.log(fileUrl)
          setValues({...values, documentoConsentimiento: fileUrl});
          if (validate()){
            console.log(values)
            usuarioService.consentimiento(values, setNotify, setUser);
          }      
        })
    }
    
  }

  return (
    <>
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLPageTitle sx={{ margin: 2 }}>{t("Confidencialidad")}</TLPageTitle>
    </Grid>
    {user.enEspera !== true && 
    <Grid width={'80%'} m="auto" sx={{pt: 5, pb: 3}}>
      <Typography align = 'justify' sx = {{fontWeight: 'bold'}}>
        {t("MensajeConfidencialidad")}
      </Typography>
      <Typography align = 'justify' sx = {{fontWeight: 'bold'}}>
      {t('DescargueFormato')} <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/tesis20170569.appspot.com/o/PlantillaUsuario.xlsx?alt=media&token=9c0ed9a7-ed91-4f86-a17e-b51dcc10d840">{t('aqui')}</a> 
      </Typography>
      <Form>
        <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
          <Grid item xs={4}>
            <TLLabel>{t("Nombres")}*</TLLabel>
          </Grid>
          <Grid item xs={8}>
            <TLTextField 
              name="nombres"
              label={t("Nombres")}
              value={values.nombres}
              onChange={handleInputChange}
              error={errors.nombres}
              inputProps={{ maxLength: 100 }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("Apellidos")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
          <TLTextField 
            name="apellidos"
            label={t("Apellidos")}
            value={values.apellidos}
            onChange={handleInputChange}
            error={errors.apellidos}
            inputProps={{ maxLength: 50 }}
            
            fullWidth
          />
        </Grid>
        <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
          <Grid item xs={4}>
            <TLLabel>{t("NumeroDocumento")}*</TLLabel>
          </Grid>
          <Grid item xs={8}>
            <TLTextField 
              name="numeroDocumento"
              label={t("NumeroDocumento")}
              value={values.numeroDocumento}
              onChange={handleInputChange}
              error={errors.numeroDocumento}
              inputProps={{ maxLength: 100 }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
          <Grid item xs={4}>
            <TLLabel>{t("Pais")}*</TLLabel>
          </Grid>
          <Grid item xs={8}>
            <TLSelection 
              name="pais"
              label={t("Pais")}
              menuItems={paises}
              value={values.pais.idPais}
              onChange={handleSelection}
              error={errors.pais}
            />
          </Grid>
        </Grid>

      </Grid>
      </Form>
      <TLFileUploadConsent file={file} setFile={setFile} accept={'.pdf'} maxFiles={1}/>
      <Grid container justifyContent="flex-end" alignItems="center" spacing={2} sx={{pt: 2}}>
        <Grid item>
          <TLButton label={t('GUARDAR')} variant="contained" sx = {{fontWeight: 'bold'}} onClick={handleSave}/>
        </Grid>
      </Grid>
    </Grid>}
    {user.enEspera === true && 
    <Grid width={'80%'} m="auto" sx={{pt: 5, pb: 3}}>
      <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large'}}>
        {t("MensajeEspera")}
      </Typography>
    </Grid>}
    <TLNotification 
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </>
  );
}

export default Confidencialidad;