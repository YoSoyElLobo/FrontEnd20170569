import React from "react";
import { useState, useEffect } from "react";
//Components

import TLSelection from '../components/atoms/TLSelection.atom';

import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLIconButton from "../components/atoms/TLIconButton.atom";
import TLLabel from "../components/atoms/TLLabel.atom";
import TLNotification from '../components/molecules/TLNotification.molecule';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
import TLFileUpload from "../components/organisms/TLFileUploadValues.organism";
import TLUsuarioForm from '../components/organisms/TLUsuarioForm.organism';

//Constants
import { ColumnsUsuarios } from '../constants/ColumnsUsuarios.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
//Service
import * as usuarioService from '../services/UsuarioService';
import * as rolService from '../services/RolService';

import { useTranslation } from "react-i18next";

const Usuarios = () => {

  const {t, i18n} = useTranslation();

  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");
  
  const [selection, setSelection] = useState(0);
  const [roles, setRoles] = useState(null);

  const [createUsuario, setCreateUsuario] = useState(null)
  const [deleteUsuario, setDeleteUsuario] = useState(null)
  const [loadBulkUsuario, setLoadBulkUsuario] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
  
  useEffect(() => {
    usuarioService.getUsuario(setRecords)
    usuarioService.getUsuario(setRecordsFiltered)
    rolService.getRol(setRoles)
  }, [])

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
  
  /*const handleSelection = e => {
    let value = e.target.value;
    setSelection(value)
    let filtered
    if (value === 0)
      filtered = records;
    else
      filtered = records.filter(x => x.rol.idRol === value)
    //Filtro de search
    if (search !== "")
      filtered = filtered.filter(x => `${x.nombres} ${x.apellidos} `.toLowerCase().includes(search))
    setRecordsFiltered(filtered)
  }*/

  const addOrEdit = (data, resetForm) => {
    if (data.idUsuario === 0)
      usuarioService.insertUsuario(data, setRecords, setRecordsFiltered, setNotify);
    else
      usuarioService.updateUsuario(data, setRecords, setRecordsFiltered, setNotify);
    resetForm()
  }

  const onDelete = (id) => {
    usuarioService.deleteUsuario(id, setRecords, setRecordsFiltered, setNotify);
    setSelection(0)
    setSearch("")
  }
  


  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLPageTitle sx={{ margin: 2 }}>{t("GestionUsuarios")}</TLPageTitle>
      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
          <TLSearchBar fullWidth label={t("BuscarUsuario")} onChange={handleSearch}/>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLDialog title={t('AgregarUsuario')} onOk={createUsuario} update={() => setUpdate(!update)} button={<TLIconButton sx={{ color: '#727272'}}><AddIcon fontSize = "large" /></TLIconButton>}>
                <TLUsuarioForm
                  update={update}
                  recordForEdit={null}
                  addOrEdit={addOrEdit}
                  setCreateUsuario={setCreateUsuario}
                  roles = {roles}
                />
              </TLDialog>
            </Grid>
            <Grid item>
              <TLDialog title={t('ImportarUsuarios')} onOk={loadBulkUsuario} button={<TLButton label={t('IMPORTAR')} variant="contained" sx = {{fontWeight: 'bold'}} /> }>
              <TLLabel>{t('DescargueFormato')} <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/tesis20170569.appspot.com/o/PlantillaUsuario.xlsx?alt=media&token=9c0ed9a7-ed91-4f86-a17e-b51dcc10d840">{t('aqui')}</a> </TLLabel>
                <TLFileUpload setSave={setLoadBulkUsuario} service={usuarioService.loadBulkUsuario} accept={'.xlsx'} maxFiles={1} setValues={setRecords} setValuesFiltered={setRecordsFiltered}/>
              </TLDialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={recordsFiltered ? recordsFiltered : []}
          columns={ColumnsUsuarios(createUsuario, setUpdate, update, addOrEdit, setCreateUsuario, deleteUsuario, setTrash, trash, onDelete, setDeleteUsuario, roles, i18n.language)}
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

export default Usuarios;