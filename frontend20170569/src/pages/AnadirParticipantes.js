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
import TLFiltrosForm from "../components/organisms/TLFiltrosForm.organism";

import TLNotification from '../components/molecules/TLNotification.molecule';
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//Constants
import { ColumnsAnadirParticipante } from '../constants/ColumnsAnadirParticipante.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import ListItem from "@mui/material/ListItem";
//Service
import * as usuarioService from '../services/UsuarioService';
import * as enfermedadService from '../services/EnfermedadService';
import * as farmacoService from '../services/FarmacoService';
import * as deporteService from '../services/DeporteService';
import * as alimentoService from '../services/AlimentoService';
import * as paisService from '../services/PaisService';
import * as estudioService from '../services/EstudioService'
import * as usuarioEstudioService from '../services/UsuarioEstudioService';
import * as frecuenciaService from '../services/FrecuenciaService';

import * as filtrosService from '../services/FiltrosService';


import { useTranslation } from "react-i18next";


const tipos = [
  {id: 1, idTipo: 1, nombreEspanol: "Enfermedad", nombreIngles: "Disease"}, //falta test combinado
  {id: 2, idTipo: 2, nombreEspanol: "Fármaco", nombreIngles: "Drug"},
  {id: 3, idTipo: 3, nombreEspanol: "Deporte", nombreIngles: "Sport"},
  {id: 4, idTipo: 4, nombreEspanol: "Grupo alimenticio", nombreIngles: "Food group"}, //falta test combinado
  {id: 5, idTipo: 5, nombreEspanol: "Pais", nombreIngles: "Country"},   //falta test combinado
  {id: 6, idTipo: 6, nombreEspanol: "Sexo", nombreIngles: "Sex"},       //falta test combinado
  {id: 7, idTipo: 7, nombreEspanol: "Edad", nombreIngles: "Age"},       //falta test combinado
  {id: 8, idTipo: 8, nombreEspanol: "Peso", nombreIngles: "Weight"},    //falta test combinado
  {id: 9, idTipo: 9, nombreEspanol: "Talla", nombreIngles: "Height"},  //falta test combinado
]

const AnadirParticipantes = () => {

  const history = useHistory(); 
  const {t, i18n} = useTranslation();
  const { idEstudio } = useParams();

  const [estudio, setEstudio] = useState(null);
  const [records, setRecords] = useState([]);
  const [recordsFiltered, setRecordsFiltered] = useState([]);
  const [enfermedades, setEnfermedades] = useState([])
  const [farmacos, setFarmacos] = useState([])
  const [deportes, setDeportes] = useState([])
  const [alimentos, setAlimentos] = useState([])
  const [paises, setPaises] = useState([])
  const [frecuencias, setFrecuencias] = useState([])

  const [filters, setFilters] = useState([])
  const [counter, setCounter] = useState(1)


  

  const [createFiltro, setCreateFiltro] = useState(null)

  const [createParticipante, setCreateParticipante] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);

  
  
  
  useEffect(() => {
    usuarioService.getPosiblesParticipantesByEstudio(idEstudio, setRecords)
    usuarioService.getPosiblesParticipantesByEstudio(idEstudio, setRecordsFiltered)
    estudioService.getEstudioById(idEstudio, setEstudio)    
    enfermedadService.getEnfermedad(setEnfermedades)
    farmacoService.getFarmaco(setFarmacos)
    deporteService.getDeporte(setDeportes)
    alimentoService.getAlimento(setAlimentos)
    paisService.getPais(setPaises)
    frecuenciaService.getFrecuencia(setFrecuencias)
  }, [])

  /*useEffect(() => {
    setRecordsFiltered(recordsFiltered.filter(o=> !estudio.listUsuarioEstudio.some(i=> i.usuario.idUsuario === o.idUsuario)))
  }, [estudio])*/

  useEffect(() => {
    filtrosService.filterUsuarios(records, setRecordsFiltered, filters)
  }, [filters])

  useEffect(() => {
    filtrosService.filterUsuarios(records, setRecordsFiltered, filters)
  }, [records])

  const add = (idUsuario) => {
    usuarioEstudioService.insertUsuarioEstudio(idUsuario, idEstudio, setRecords, setNotify);
  }

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
    }
  }

  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLIconButton sx={{ color: '#727272'}}><ArrowBackIcon fontSize = "large" onClick={() => history.push(`/editar-estudio/${idEstudio}/participantes`)} /></TLIconButton>
      <TLPageTitle sx={{ margin: 2 }}>{t("Participantes")}</TLPageTitle>
      <Grid container direction = "row" alignItems="center" spacing={2} sx={{pt: 4}}>
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
      
      <Grid xs={12} sx={{pt: 3}}>
      <TLDataGrid 
          rows={recordsFiltered ? recordsFiltered : []}
          columns={ColumnsAnadirParticipante(createParticipante, setUpdate, update, add, setCreateParticipante, i18n.language)}
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


export default AnadirParticipantes;