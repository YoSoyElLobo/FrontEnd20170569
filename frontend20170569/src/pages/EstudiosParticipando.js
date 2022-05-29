import React from "react";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
//Components
import { UserContext } from "../context/UserContext";
import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLIconButton from "../components/atoms/TLIconButton.atom";
import TLLabel from "../components/atoms/TLLabel.atom";
import TLNotification from '../components/molecules/TLNotification.molecule';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
//Constants
import { ColumnsEstudiosParticipante } from '../constants/ColumnsEstudiosParticipante.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';

import * as estudioService from '../services/EstudioService'

import { useTranslation } from "react-i18next";

const EstudiosParticipando = () => {

  
  const history = useHistory(); 
  const {t, i18n} = useTranslation();
  const { user, setUser } = useContext(UserContext)

  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");

  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
    

  useEffect(() => {
    estudioService.getEstudioByParticipante(user.idUsuario, setRecords);
    estudioService.getEstudioByParticipante(user.idUsuario, setRecordsFiltered);
  }, [])

  
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
      <TLPageTitle sx={{ margin: 2 }}>{t("Estudios")}</TLPageTitle>
      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
          <TLSearchBar fullWidth label={t("BuscarEstudio")} onChange={handleSearch}/>
        </Grid>
      </Grid>
      
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={recordsFiltered ? recordsFiltered : []}
          columns={ColumnsEstudiosParticipante(history, i18n.language, user)}
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

export default EstudiosParticipando;