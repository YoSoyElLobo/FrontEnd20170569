import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import TLEstudioForm from "../components/organisms/TLEstudioForm.organism";
import Typography from '@mui/material/Typography';

//Constants
import { ColumnsEstudiosAdministracion } from '../constants/ColumnsEstudiosAdministracion.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import * as estudioService from '../services/EstudioService'
import * as usuarioService from '../services/UsuarioService'
import * as paisService from '../services/PaisService'

import { useTranslation } from "react-i18next";

const CrearEstudio = () => {

  
  const history = useHistory(); 
  const {t, i18n} = useTranslation();

  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");

  const [usuarios, setUsuarios] = useState(null);
  const [paises, setPaises] = useState(null);



  const [createEstudio, setCreateEstudio] = useState(null)
  const [deleteEstudio, setDeleteEstudio] = useState(null)
  const [loadBulkUsers, setLoadBulkUsers] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
    

  useEffect(() => {
    usuarioService.getUsuario(setUsuarios)
    paisService.getPais(setPaises)
  }, [])

  const add = (data, resetForm) => {
    /*if (data.idEstudio === 0)
      estudioService.insertEstudio(data, setRecords, setRecordsFiltered, setNotify);
    else
      estudioService.updateEstudio(data, setRecords, setRecordsFiltered, setNotify);
    resetForm()*/
  }

  const onDelete = (idEstudio) => {
    //estudioService.deleteEstudio(idEstudio, setRecords, setRecordsFiltered, setNotify);
  }

  const handleSearch = e => {
    let value = e.target.value.toLowerCase();
    setSearch(value);
    let filtered
    if (value === "")
      filtered = records;
    else
      filtered = records.filter(x => `${x.nombreEspanol}`.toLowerCase().includes(value) || `${x.nombreIngles}`.toLowerCase().includes(value))
    setRecordsFiltered(filtered)
  }

  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLIconButton sx={{ color: '#727272'}}><ArrowBackIcon fontSize = "large" onClick={() => history.push('/estudios')} /></TLIconButton>
      <TLPageTitle sx={{ margin: 2 }}>{t("CrearEstudio")}</TLPageTitle>
      <Typography align = 'justify' sx = {{fontWeight: 'bold', pt: 2}}>
        {t("IngreseEstudio")}
      </Typography>
      
      <TLEstudioForm
        addOrEdit={add}
        recordForEdit = {null}
        setCreateEstudio = {setCreateEstudio}
        update = {update}
        usuarios = {usuarios}
        paises = {paises}
      >
      </TLEstudioForm>

      
      
      <TLNotification 
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    </Grid>
  );
}

export default CrearEstudio;