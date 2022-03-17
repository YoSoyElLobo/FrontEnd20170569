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
import TLDeporteForm from "../components/organisms/TLDeporteForm.organism";
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
import TLFileUpload from "../components/organisms/TLFileUploadValues.organism";
//Constants
import { ColumnsDeportes } from '../constants/ColumnsDeportes.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';

import * as deporteService from '../services/DeporteService';

const Deportes = () => {

  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");

  const [createDeporte, setCreateDeporte] = useState(null)
  const [deleteDeporte, setDeleteDeporte] = useState(null)
  const [loadBulkUsers, setLoadBulkUsers] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
   

  useEffect(() => {
    deporteService.getDeporte(setRecords);
    deporteService.getDeporte(setRecordsFiltered);
  }, [])

  const addOrEdit = (data, resetForm) => {
    if (data.idDeporte === 0)
      deporteService.insertDeporte(data, setRecords, setRecordsFiltered, setNotify);
    else
      deporteService.updateDeporte(data, setRecords, setRecordsFiltered, setNotify);
    resetForm()
  }

  const onDelete = (idDeporte) => {
    deporteService.deleteDeporte(idDeporte, setRecords, setRecordsFiltered, setNotify);
  }

  const handleSearch = e => {
    let value = e.target.value.toLowerCase();
    setSearch(value);
    let filtered
    if (value === "")
      filtered = records;
    else
      filtered = records.filter(x => `${x.nombre}`.toLowerCase().includes(value))
    setRecordsFiltered(filtered)
  }

  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLPageTitle sx={{ margin: 2 }}>Gestión de deportes</TLPageTitle>
      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
          <TLSearchBar fullWidth label={'Buscar deporte'} onChange={handleSearch}/>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLDialog title="Agregar deporte" onOk={createDeporte} update={() => setUpdate(!update)} button={<TLIconButton sx={{ color: '#727272'}}><AddIcon fontSize = "large" /></TLIconButton>}>
                <TLDeporteForm
                  update={update}
                  recordForEdit={null}
                  addOrEdit={addOrEdit}
                  setCreateDeporte={setCreateDeporte}
                />
              </TLDialog>
            </Grid>
            <Grid item>
              <TLDialog title="Importar deportes" onOk={loadBulkUsers} button={<TLButton label='IMPORTAR' variant="contained" sx = {{fontWeight: 'bold'}} /> }>
                <TLLabel>Descargue el formato <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/tesis20170569.appspot.com/o/Items%20Report%20(10).xlsx?alt=media&token=fecd2af4-a104-4789-8ca7-5abaadc47d94">aquí</a> </TLLabel>
                <TLFileUpload setSave={setLoadBulkUsers} service={deporteService.loadBulkDeporte} accept={'.xlsx'} maxFiles={1} setValues={setRecords} setValuesFiltered={setRecordsFiltered}/>
              </TLDialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={recordsFiltered ? recordsFiltered : []}
          columns={ColumnsDeportes(createDeporte, setUpdate, update, addOrEdit, setCreateDeporte, deleteDeporte, setTrash, trash, onDelete, setDeleteDeporte)}
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

export default Deportes;