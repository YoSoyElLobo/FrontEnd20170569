import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
//Components

import TLSelection from '../components/atoms/TLSelection.atom';

import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLLabel from "../components/atoms/TLLabel.atom";
import TLDialog from "../components/organisms/TLDialog.organism";
import TLIconButton from "../components/atoms/TLIconButton.atom";
import TLFileUpload from "../components/organisms/TLFileUploadValues.organism"

import TLNotification from '../components/molecules/TLNotification.molecule';
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Constants
import { ColumnsParticipantesEstudio } from '../constants/ColumnsParticipantesEstudio.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
//Service
import * as usuarioService from '../services/UsuarioService';
import * as rolService from '../services/RolService';
import * as estudioService from '../services/EstudioService'
import * as usuarioEstudioService from '../services/UsuarioEstudioService';

import { useTranslation } from "react-i18next";

const ParticipantesEstudio = () => {

  const history = useHistory(); 
  const {t, i18n} = useTranslation();
  const { idEstudio } = useParams();

  const [estudio, setEstudio] = useState(null);
  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");
  
  const [selection, setSelection] = useState(0);
  

  const [updateParticipante, setUpdateParticipante] = useState(null)
  const [deleteParticipante, setDeleteParticipante] = useState(null)
  const [loadBulkParticipante, setLoadBulkParticipante] = useState(null)

  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
  
  
  useEffect(() => {
    estudioService.getEstudioById(idEstudio, setEstudio)
  }, [])

  useEffect(() => {
    if(estudio && estudio.listUsuarioEstudio){
      setRecords(estudio.listUsuarioEstudio)
      setRecordsFiltered(estudio.listUsuarioEstudio)
    }
  }, [estudio])

  const edit = (data, resetForm) => {
    //data.estudio.idEstudio = idEstudio;
    console.log(data)
    usuarioEstudioService.updateUsuarioEstudio(data, idEstudio, setEstudio, setNotify);
    resetForm()
  }

  const onDelete = (data, setEstudio, setNotify) => {
    console.log('delete')
  }

 
  const handleSearch = e => {
    let value = e.target.value.toLowerCase();
    setSearch(value);
    let filtered
    if (value === "")
      filtered = records;
    else
      filtered = records.filter(x =>  `${x.numeroDocumento}`.toLowerCase().includes(value) || `${x.idUsuario}`.toLowerCase().includes(value))
    setRecordsFiltered(filtered)
  }

  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLIconButton sx={{ color: '#727272'}}><ArrowBackIcon fontSize = "large" onClick={() => history.push(`/ver-estudio/${idEstudio}`)} /></TLIconButton>
      <TLPageTitle sx={{ margin: 2 }}>{t("Participantes")}</TLPageTitle>
      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
          <TLSearchBar fullWidth label={t("BuscarParticipante")} onChange={handleSearch}/>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLButton label={t('ANADIRPARTICIPANTE')} variant='contained' sx = {{fontWeight: 'bold', width: '120px'}} onClick ={() => history.push('/aprobacion')}/>
            </Grid>
            <Grid item>
              <TLDialog title={t('ImportarCodigos')} onOk={loadBulkParticipante} button={<TLButton label={t('IMPORTARCODIGOS')} variant="contained" sx = {{fontWeight: 'bold', width: '120px'}} /> }>
                <TLLabel>{t('DescargueFormato')} <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/tesis20170569.appspot.com/o/PlantillaUsuario.xlsx?alt=media&token=9c0ed9a7-ed91-4f86-a17e-b51dcc10d840">{t('aqui')}</a> </TLLabel>
                <TLFileUpload setSave={setLoadBulkParticipante} service={usuarioEstudioService.loadBulkParticipante} accept={'.xlsx'} maxFiles={1} setValues={setEstudio} idEstudio={idEstudio}/>
              </TLDialog>
            </Grid>
            
          </Grid>
        </Grid>
      </Grid>
      
      <Grid xs={12} sx={{pt: 3}}>
      <TLDataGrid 
          rows={recordsFiltered ? recordsFiltered : []}
          columns={ColumnsParticipantesEstudio(updateParticipante, setUpdate, update, edit, setUpdateParticipante, deleteParticipante, setTrash, trash, onDelete, setDeleteParticipante, i18n.language)}
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


export default ParticipantesEstudio;