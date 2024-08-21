import React from "react";
import moment from 'moment';
import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
//Components
import { UserContext } from "../context/UserContext";
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

//Mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import * as estudioService from '../services/EstudioService';
import * as usuarioEstudioService from '../services/UsuarioEstudioService';

import { useTranslation } from "react-i18next";


const VerEstudio = () => {

  const {user, setUser} = useContext(UserContext);
  const history = useHistory(); 
  const {t, i18n} = useTranslation();
  const { idEstudio } = useParams();

  const [estudio, setEstudio] = useState(null);
  const [usuarioEstudio, setUsuarioEstudio] = useState(null);


  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    estudioService.getEstudioById(idEstudio, setEstudio);
  }, [])

  async function handleAprobar(){
    usuarioEstudioService.aprobarParticipacion(usuarioEstudio.idUsuarioEstudio, idEstudio, setEstudio, setNotify)
  }

  async function handleRechazar(){
    usuarioEstudioService.rechazarParticipacion(usuarioEstudio.idUsuarioEstudio, idEstudio, setEstudio, setNotify)
    await sleep(2000)
    history.push(`/estudiosParticipando`)
  }

  useEffect(() => {
    if (user.rol.idRol === 3 && estudio)
      setUsuarioEstudio(estudio.listUsuarioEstudio.filter(x => x.usuario.idUsuario === user.idUsuario )[0])
  }, [estudio])

  

  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5, pb: 5}}>
      <TLIconButton sx={{ color: '#727272'}}><ArrowBackIcon fontSize = "large" onClick={() => user.rol.idRol ===1 ? history.push('/estudios') :  user.rol.idRol === 2 ? history.push('/estudiosAsignados') :  history.push('/estudiosParticipando')}/></TLIconButton>

      <Grid container alignItems="center" justifyContent = 'left' spacing={2} sx={{pt: 2}}>
        <Grid item xs={7}>
          <TLPageTitle sx={{ margin: 2 }}>{t("Estudio")} #{('00'+idEstudio).slice(-2)}</TLPageTitle>
        </Grid>
        {user.rol.idRol !== 3 && <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item justifyContent='center' >
              <TLButton label={t('PARTICIPANTES')} variant="contained" alignItems="center" sx = {{fontWeight: 'bold'}} onClick ={() => history.push(`/editar-estudio/${idEstudio}/participantes`)}/>
            </Grid>
            <Grid item justifyContent='center' >
              <TLButton label={t('EDITAR')} variant="contained" alignItems="center" sx = {{fontWeight: 'bold'}} onClick ={() => history.push(`/editar-estudio/${idEstudio}`)}/>
            </Grid>
          </Grid>
        </Grid>}
      </Grid>

      <Grid alignItems="center" spacing={2} sx={{pt: 2, my: 2}}>
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
          
      {user.rol.idRol === 3 && usuarioEstudio && usuarioEstudio.aceptado === false &&
      <Grid container alignItems="center" justifyContent = 'center' spacing={2} sx={{pt: 2, pb: 2}}>
        <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'large', pb: 1.5}}>{t("ConfirmParticipacion")}:</Typography>
        <Grid container alignItems="center" justifyContent = 'center' spacing={2}>
            <Grid item justifyContent='center' >
              <TLButton label={t('ACEPTAR')} variant="contained" alignItems="center" sx = {{fontWeight: 'bold'}} onClick ={handleAprobar}/>
            </Grid>
            <Grid item justifyContent='center' >
              <TLButton label={t('RECHAZAR')} variant="contained" alignItems="center" sx = {{fontWeight: 'bold'}} onClick ={handleRechazar}/>
            </Grid>
        </Grid>
      </Grid>}
      <TLNotification 
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    </Grid>
  );
}

export default VerEstudio;