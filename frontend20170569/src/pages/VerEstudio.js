import React from "react";
import moment from 'moment';
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
//Components
import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLIconButton from "../components/atoms/TLIconButton.atom";
import TLLabel from "../components/atoms/TLLabel.atom";
import TLNotification from '../components/molecules/TLNotification.molecule';
import TLDialog from '../components/organisms/TLDialog.organism';
//import TLEstudioForm from "../components/organisms/TLEstudioForm.organism";
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
import TLFileUpload from "../components/organisms/TLFileUploadValues.organism";
//Constants
import { ColumnsEstudiosAdministracion } from '../constants/ColumnsEstudiosAdministracion.constant';
//Mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import * as estudioService from '../services/EstudioService'

import { useTranslation } from "react-i18next";


const VerEstudio = () => {

  
  const history = useHistory(); 
  const {t, i18n} = useTranslation();
  const { idEstudio } = useParams();

  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [estudio, setEstudio] = useState(null);

  const [createEstudio, setCreateEstudio] = useState(null)
  const [deleteEstudio, setDeleteEstudio] = useState(null)

  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
    

  useEffect(() => {
    estudioService.getEstudioById(idEstudio, setEstudio);

  }, [])

  

  

  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLIconButton sx={{ color: '#727272'}}><ArrowBackIcon fontSize = "large" onClick={() => history.push('/estudiosAsignados')}/></TLIconButton>

      <Grid container alignItems="center" justifyContent = 'center' spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
          <TLPageTitle sx={{ margin: 2 }}>{t("Estudio")} #{('00'+idEstudio).slice(-2)}</TLPageTitle>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item justifyContent='center' >
            <TLButton label={t('EDITAR')} variant="contained" alignItems="center" sx = {{fontWeight: 'bold'}} onClick ={() => history.push(`/editar-estudio/${idEstudio}`)}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid alignItems="center" spacing={2} sx={{pt: 4}}>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("Investigador")}: {estudio ? estudio.investigador.nombres + ' ' + estudio.investigador.apellidos: ""}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("Nombre")}: {estudio ? i18n.language === 'es' ? estudio.nombreEspanol : estudio.nombreIngles: ""}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("Descripcion")}:</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large'}}>{estudio ? i18n.language === 'es' ? estudio.descripcionEspanol : estudio.descripcionIngles: ""}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("FechaInicio")}: {estudio ? moment(estudio.fechaInicio).format("DD/MM/yyyy"): ""}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("FechaFin")}: {estudio ? moment(estudio.fechaFin).format("DD/MM/yyyy"): ""}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("Pais")}: {estudio ? i18n.language === 'es' ? estudio.pais.nombreEspanol : estudio.pais.nombreIngles: ""}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("Latitud")}: {estudio && estudio.latitud ? estudio.latitud: t("NoDisponible")}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("Longitud")}: {estudio && estudio.longitud ? estudio.longitud: t("NoDisponible")}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("Bioma")}: {estudio ? i18n.language === 'es' ? estudio.bioma.nombreEspanol : estudio.bioma.nombreIngles : ""}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("Fuente")}: {estudio ? estudio.fuente : ""}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("Material")}: {estudio ? i18n.language === 'es' ? estudio.material.nombreEspanol : estudio.material.nombreIngles : ""}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("NCBISampleClassification")}: {estudio && estudio.ncbiSampleClassification ? estudio.ncbiSampleClassification: t("NoDisponible")}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("MetodoSecuenciacion")}: {estudio && estudio.metodoSecuenciacion ? estudio.metodoSecuenciacion: t("NoDisponible")}</Typography>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pt: 1.5}}>{t("Resultados")}: {estudio && estudio.resultados ? estudio.resultados: t("NoDisponible")}</Typography>

      </Grid>
      
      <TLNotification 
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    </Grid>
  );
}

export default VerEstudio;