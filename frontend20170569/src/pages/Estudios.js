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
//import TLEstudioForm from "../components/organisms/TLEstudioForm.organism";
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
//Constants
import { ColumnsEstudiosAdministracion } from '../constants/ColumnsEstudiosAdministracion.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';

import * as estudioService from '../services/EstudioService'

import { useTranslation } from "react-i18next";

const Estudios = () => {

  
  const history = useHistory(); 
  const {t, i18n} = useTranslation();

  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");

  const [createEstudio, setCreateEstudio] = useState(null)
  const [deleteEstudio, setDeleteEstudio] = useState(null)
  const [loadBulkUsers, setLoadBulkUsers] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
    

  useEffect(() => {
    estudioService.getEstudio(setRecords);
    estudioService.getEstudio(setRecordsFiltered);
  }, [])

  const addOrEdit = (data, resetForm) => {
    /*if (data.idEstudio === 0)
      estudioService.insertEstudio(data, setRecords, setRecordsFiltered, setNotify);
    else
      estudioService.updateEstudio(data, setRecords, setRecordsFiltered, setNotify);
    resetForm()*/
  }

  const onDelete = (idEstudio) => {
    estudioService.deleteEstudio(idEstudio, setRecords, setRecordsFiltered, setNotify);
  }

  const handleSearch = e => {
    let value = e.target.value.toLowerCase();
    setSearch(value);
    let filtered
    if (value === "")
      filtered = records;
    else
      filtered = records.filter(x => `${x.nombreEspanol}`.toLowerCase().includes(value) 
                                      || `${x.nombreIngles}`.toLowerCase().includes(value) 
                                      || `${x.investigador.nombres}`.toLowerCase().includes(value) 
                                      || `${x.investigador.apellidos}`.toLowerCase().includes(value))
    setRecordsFiltered(filtered)
  }

  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLPageTitle sx={{ margin: 2 }}>{t("GestionEstudios")}</TLPageTitle>
      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
          <TLSearchBar fullWidth label={t("BuscarEstudio")} onChange={handleSearch}/>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLIconButton sx={{ color: '#727272'}}><AddIcon fontSize = "large" onClick={() => history.push('/crear-estudio')} /></TLIconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={recordsFiltered ? recordsFiltered : []}
          columns={ColumnsEstudiosAdministracion(deleteEstudio, setTrash, trash, onDelete, setDeleteEstudio, history, i18n.language)}
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

export default Estudios;