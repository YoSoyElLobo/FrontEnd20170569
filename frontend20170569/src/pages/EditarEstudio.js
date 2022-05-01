import React from "react";
import { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

//Components
import { UserContext } from "../context/UserContext";
import TLPageTitle from "../components/atoms/TLPageTitle.atom";

import TLIconButton from "../components/atoms/TLIconButton.atom";

import TLNotification from '../components/molecules/TLNotification.molecule';

//import TLEstudioForm from "../components/organisms/TLEstudioForm.organism";

import TLEstudioForm from "../components/organisms/TLEstudioForm.organism";
import Typography from '@mui/material/Typography';


//Mui
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import * as estudioService from '../services/EstudioService'
import * as usuarioService from '../services/UsuarioService'
import * as paisService from '../services/PaisService'
import * as biomaService from '../services/BiomaService'
import * as materialService from '../services/MaterialService'

import { useTranslation } from "react-i18next";
import { StyledEngineProvider } from "@mui/styled-engine-sc";

const EditarEstudio = () => {
  
  const {user, setUser} = useContext(UserContext);
  const history = useHistory(); 
  const {t, i18n} = useTranslation();
  const { idEstudio } = useParams();

  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");

  const [estudio, setEstudio] = useState(null)
  const [usuarios, setUsuarios] = useState(null);
  const [paises, setPaises] = useState(null);
  const [biomas, setBiomas] = useState(null);
  const [materiales, setMateriales] = useState(null);



  const [createEstudio, setCreateEstudio] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
    

  useEffect(async () => {
    await estudioService.getEstudioById(idEstudio, setEstudio)
    usuarioService.getUsuario(setUsuarios)
    paisService.getPais(setPaises)
    biomaService.getBioma(setBiomas);
    materialService.getMaterial(setMateriales);    
  }, [])

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function edit (data, resetForm) {
    await estudioService.updateEstudio(data, setEstudio,  setNotify);

  }
  
  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5, pb: 5}}>
      <TLIconButton sx={{ color: '#727272'}}><ArrowBackIcon fontSize = "large" onClick={() => user.rol.idRol === '1' ? history.push('/estudios') : history.push(`/ver-estudio/${idEstudio}`)} /></TLIconButton>
      <TLPageTitle sx={{ margin: 2 }}>{t("EditarEstudio")}</TLPageTitle>
      <Typography align = 'justify' sx = {{fontWeight: 'bold', pt: 2}}>{t("IngreseEstudio")}</Typography>
      
      {estudio !== null && <TLEstudioForm
        addOrEdit={edit}
        recordForEdit = {estudio}
        setCreateEstudio = {setCreateEstudio}
        update = {update}
        usuarios = {usuarios}
        paises = {paises}
        biomas = {biomas}
        materiales = {materiales}
      /> }
      
      <TLNotification 
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    </Grid>
  );
}

export default EditarEstudio;