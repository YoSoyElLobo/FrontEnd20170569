import React from "react";
import moment from "moment";
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
import TLFiltrosForm from "../components/organisms/TLFiltrosForm.organism";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Constants
import { ColumnsParticipantesEstudio } from '../constants/ColumnsParticipantesEstudio.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
//Service
import * as usuarioService from '../services/UsuarioService';
import * as rolService from '../services/RolService';
import * as estudioService from '../services/EstudioService'
import * as usuarioEstudioService from '../services/UsuarioEstudioService';
import * as enfermedadService from '../services/EnfermedadService';
import * as farmacoService from '../services/FarmacoService';
import * as deporteService from '../services/DeporteService';
import * as alimentoService from '../services/AlimentoService';
import * as paisService from '../services/PaisService';
import * as frecuenciaService from '../services/FrecuenciaService';
import * as filtrosService from '../services/FiltrosService';

import { useTranslation } from "react-i18next";

const tipos = [
  {id: 1, idTipo: 1, nombreEspanol: "Enfermedad", nombreIngles: "Disease"}, 
  {id: 2, idTipo: 2, nombreEspanol: "Fármaco", nombreIngles: "Drug"},
  {id: 3, idTipo: 3, nombreEspanol: "Deporte", nombreIngles: "Sport"},
  {id: 4, idTipo: 4, nombreEspanol: "Grupo alimenticio", nombreIngles: "Food group"}, 
  {id: 5, idTipo: 5, nombreEspanol: "Pais", nombreIngles: "Country"},   
  {id: 6, idTipo: 6, nombreEspanol: "Sexo", nombreIngles: "Sex"},      
  {id: 7, idTipo: 7, nombreEspanol: "Edad", nombreIngles: "Age"},     
  {id: 8, idTipo: 8, nombreEspanol: "Peso", nombreIngles: "Weight"},    
  {id: 9, idTipo: 9, nombreEspanol: "Talla", nombreIngles: "Height"},  
  {id: 10, idTipo: 10, nombreEspanol: "Código de muestra", nombreIngles: "Sample code"},
  {id: 11, idTipo: 11, nombreEspanol: "Fecha de muestreo", nombreIngles: "Sample date"}
]

const ParticipantesEstudio = () => {

  const history = useHistory(); 
  const {t, i18n} = useTranslation();
  const { idEstudio } = useParams();

  const [estudio, setEstudio] = useState(null);
  const [records, setRecords] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");

  const [enfermedades, setEnfermedades] = useState([])
  const [farmacos, setFarmacos] = useState([])
  const [deportes, setDeportes] = useState([])
  const [alimentos, setAlimentos] = useState([])
  const [paises, setPaises] = useState([])
  const [frecuencias, setFrecuencias] = useState([])
  
  const [filters, setFilters] = useState([])
  const [counter, setCounter] = useState(1)

  const [updateParticipante, setUpdateParticipante] = useState(null)
  const [deleteParticipante, setDeleteParticipante] = useState(null)
  const [loadBulkParticipante, setLoadBulkParticipante] = useState(null)
  const [createFiltro, setCreateFiltro] = useState(null)

  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
  
  
  useEffect(() => {
    estudioService.getEstudioById(idEstudio, setEstudio)
    enfermedadService.getEnfermedad(setEnfermedades)
    farmacoService.getFarmaco(setFarmacos)
    deporteService.getDeporte(setDeportes)
    alimentoService.getAlimento(setAlimentos)
    paisService.getPais(setPaises)
    frecuenciaService.getFrecuencia(setFrecuencias)
  }, [])

  useEffect(() => {
    if(estudio && estudio.listUsuarioEstudio){
      setRecords(estudio.listUsuarioEstudio)
    }
  }, [estudio])

  useEffect(() => {
    filtrosService.filterUsuariosEstudios(records, setRecordsFiltered, filters)
  }, [filters])

  useEffect(() => {
    filtrosService.filterUsuariosEstudios(records, setRecordsFiltered, filters)    
  }, [records])

  const addFiltro = (data, resetForm) => {
    setCounter(counter+1);
    setFilters([...filters, data])
    resetForm()
  }

  const handleDelete = (filterToDelete) => () => {
    //setFilters((filters) => filters.filter((filter) => getLabel(filter) !== getLabel(filterToDelete)));
    setFilters((filters) => filters.filter((filter) => filter.idFiltro !== filterToDelete.idFiltro));
  };


  function getLabel(filter){
    switch(filter.tipo.idTipo){
      case 1: case 2: case 3: case 4: case 5:
        return i18n.language === 'es'? `${filter.tipo.nombreEspanol}: ${filter.objeto.nombreEspanol}` : `${filter.tipo.nombreIngles}: ${filter.objeto.nombreIngles}`;    
      case 6: 
        return `${t("Sexo")}: ${filter.sexo === 'M' ? t("Masculino") : t("Femenino")}`
      case 7:
        return `${t("Edad")} ${filter.operadorNumero.label} ${filter.numero}`
      case 8:
        return `${t("Peso")} ${filter.operadorNumero.label} ${filter.numero}`
      case 9:
        return `${t("Talla")} ${filter.operadorNumero.label} ${filter.numero}`
      case 10:
        return `${t("CodigoMuestra")}: ${filter.texto}`
      case 11:
        return `${t("FechaMuestreo")} ${filter.operadorFecha.label} ${moment(filter.fecha).format('DD/MM/YYYY')}`
    }
  }

  const edit = (data, resetForm) => {
    //data.estudio.idEstudio = idEstudio;
    console.log(data)
    usuarioEstudioService.updateUsuarioEstudio(data, idEstudio, setEstudio, setNotify);
    resetForm()
  }

  const onDelete = (data) => {
    usuarioEstudioService.rechazarParticipacion(data.idUsuarioEstudio, idEstudio, setEstudio, setNotify)
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
      <TLPageTitle sx={{ margin: 2 }}>{t("ParticipantesEstudio")}</TLPageTitle>
      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={6}>
          {filters.map((filter) => {
            return (<Chip sx={{ px: 1, m: 1 }} label={getLabel(filter)} onDelete={handleDelete(filter)}/>            
          );
          })}
          <TLDialog title={t("AgregarFiltro")} onOk={createFiltro} update={() => setUpdate(!update)} button={<Chip icon= {<AddIcon/>} sx={{ margin: 2, color: "inhherit" }} label={t('AgregarFiltro')}/>}>
            <TLFiltrosForm
              update={update}
              recordForEdit={null}
              addOrEdit={addFiltro}
              setCreateFiltro={setCreateFiltro}
              tipos = {tipos}
              enfermedades = {enfermedades}
              farmacos = {farmacos}
              deportes = {deportes}
              alimentos = {alimentos}
              paises = {paises}
              counter = {counter}
              frecuencias = {frecuencias}
              />
          </TLDialog>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLButton label={t('ANADIRPARTICIPANTE')} variant='contained' sx = {{fontWeight: 'bold', width: '120px'}} onClick ={() => history.push(`/editar-estudio/${idEstudio}/participantes/anadir`)}/>
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