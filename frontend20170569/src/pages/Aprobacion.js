import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//Components

import TLSelection from '../components/atoms/TLSelection.atom';

import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLIconButton from "../components/atoms/TLIconButton.atom";

import TLNotification from '../components/molecules/TLNotification.molecule';
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Constants
import { ColumnsAprobacion } from '../constants/ColumnsAprobacion.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
//Service
import * as usuarioService from '../services/UsuarioService';
import * as rolService from '../services/RolService';

import { useTranslation } from "react-i18next";

const Aprobacion = () => {

  const history = useHistory(); 

  const {t, i18n} = useTranslation();

  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");
  
  const [selection, setSelection] = useState(0);
  const [roles, setRoles] = useState(null);

  const [aprobacionUsuario, setAprobacionUsuario] = useState(null)
  const [rechazoUsuario, setRechazoUsuario] = useState(null)

  const [loadBulkUsuario, setLoadBulkUsuario] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
  
  useEffect(() => {
    usuarioService.getEspera(setRecords)
    usuarioService.getEspera(setRecordsFiltered)
  }, [])

  const routeChange = () =>{ 
    let path = `/usuarios`; 
    history.push(path);
  }

  const handleSearch = e => {
    let value = e.target.value.toLowerCase();
    setSearch(value);
    let filtered
    if (value === "")
      filtered = records;
    else
      filtered = records.filter(x => `${x.nombres}`.toLowerCase().includes(value) || `${x.apellidos}`.toLowerCase().includes(value))
    setRecordsFiltered(filtered)
  }

  const onAprobacion = (id) => {
    usuarioService.aprobarConsentimiento(id, setRecords, setRecordsFiltered, setNotify)
  }

  const onRechazo = (data, resetForm) => {
    //usuarioService.rechazarC(id, setRecords, setRecordsFiltered, setNotify)
    console.log('Hola')
    resetForm()
  }
  
  



  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLIconButton sx={{ color: '#727272'}}><ArrowBackIcon fontSize = "large" onClick={() => history.push('/usuarios')} /></TLIconButton>
      <TLPageTitle sx={{ margin: 2 }}>{t("PendienteAprobacion")}</TLPageTitle>
      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
          <TLSearchBar fullWidth label={t("BuscarParticipante")} onChange={handleSearch}/>
        </Grid>
      </Grid>
      
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={recordsFiltered ? recordsFiltered : []}
          columns={ColumnsAprobacion(update, setUpdate, onAprobacion, aprobacionUsuario, setAprobacionUsuario, onRechazo, rechazoUsuario, setRechazoUsuario, i18n.language)}
          disableSelectionOnClick
          />
      </Grid>
      <TLNotification 
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    </Grid>
  );
}

export default Aprobacion;