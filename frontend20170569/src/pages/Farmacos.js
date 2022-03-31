import React from "react";
import { useState, useEffect } from "react";
//Components
import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLIconButton from "../components/atoms/TLIconButton.atom";
import TLLabel from "../components/atoms/TLLabel.atom";
import TLNotification from '../components/molecules/TLNotification.molecule';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLFarmacoForm from "../components/organisms/TLFarmacoForm.organism";
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
import TLFileUpload from "../components/organisms/TLFileUploadValues.organism";
//Constants
import { ColumnsFarmacos } from '../constants/ColumnsFarmacos.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';

import * as farmacoService from '../services/FarmacoService';
import { useTranslation } from "react-i18next";

const Farmacos = () => {

  const {t, i18n} = useTranslation();

  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");

  const [createFarmaco, setCreateFarmaco] = useState(null)
  const [deleteFarmaco, setDeleteFarmaco] = useState(null)
  const [loadBulkUsers, setLoadBulkUsers] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
  

  const rows = [
    { id: 1, nombre: 'Quazepam'},
    { id: 2, nombre: 'Quetiapina'},
    { id: 3, nombre: 'Pantoprazol'},
    { id: 4, nombre: 'Quinapril'},
    { id: 5, nombre: 'Quinidina'},
    { id: 6, nombre: 'Quinina'},
    { id: 7, nombre: 'Paracetamol'},
    { id: 8, nombre: 'Penicilamina'},
    { id: 9, nombre: 'Pentobarbital'}
  ];

  

  useEffect(() => {
    farmacoService.getFarmaco(setRecords);
    farmacoService.getFarmaco(setRecordsFiltered);
  }, [])

  const addOrEdit = (data, resetForm) => {
    if (data.idFarmaco === 0)
      farmacoService.insertFarmaco(data, setRecords, setRecordsFiltered, setNotify);
    else
      farmacoService.updateFarmaco(data, setRecords, setRecordsFiltered, setNotify);
    resetForm()
  }

  const onDelete = (idFarmaco) => {
    farmacoService.deleteFarmaco(idFarmaco, setRecords, setRecordsFiltered, setNotify);
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
      <TLPageTitle sx={{ margin: 2 }}>{t("GestionFarmacos")}</TLPageTitle>
      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
          <TLSearchBar fullWidth label={t("BuscarFarmaco")} onChange={handleSearch}/>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLDialog title={t('AgregarFarmaco')} onOk={createFarmaco} update={() => setUpdate(!update)} button={<TLIconButton sx={{ color: '#727272'}}><AddIcon fontSize = "large" /></TLIconButton>}>
                <TLFarmacoForm
                  update={update}
                  recordForEdit={null}
                  addOrEdit={addOrEdit}
                  setCreateFarmaco={setCreateFarmaco}
                />
              </TLDialog>
            </Grid>
            <Grid item>
              <TLDialog title={t('ImportarEnfermedades')} onOk={loadBulkUsers} button={<TLButton label={t('IMPORTAR')} variant="contained" sx = {{fontWeight: 'bold'}} /> }>
              <TLLabel>{t('DescargueFormato')} <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/tesis20170569.appspot.com/o/PlantillaGeneral.xlsx?alt=media&token=24618019-ba48-4cbb-bae9-b388caf158a0">{t('aqui')}</a> </TLLabel>
                <TLFileUpload setSave={setLoadBulkUsers} service={farmacoService.loadBulkFarmaco} accept={'.xlsx'} maxFiles={1} setValues={setRecords} setValuesFiltered={setRecordsFiltered}/>
              </TLDialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={recordsFiltered ? recordsFiltered : []}
          columns={ColumnsFarmacos(createFarmaco, setUpdate, update, addOrEdit, setCreateFarmaco, deleteFarmaco, setTrash, trash, onDelete, setDeleteFarmaco, i18n.language)}
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

export default Farmacos;