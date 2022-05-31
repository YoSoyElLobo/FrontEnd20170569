import React from "react";
import { useState, useEffect } from "react";
import { useContext } from 'react';
//Components
import { UserContext } from "../context/UserContext";
import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLIconButton from "../components/atoms/TLIconButton.atom";
import TLLabel from "../components/atoms/TLLabel.atom";
import TLNotification from '../components/molecules/TLNotification.molecule';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLTextField from "../components/atoms/TLTextField.atom";

import TLDatosGeneralesUsuarioForm from "../components/organisms/TLDatosGeneralesUsuarioForm.organism";
import TLEnfermedadUsuarioForm from "../components/organisms/TLEnfermedadUsuarioForm.organism";
import TLFarmacoUsuarioForm from "../components/organisms/TLFarmacoUsuarioForm.organism";
import TLDeporteUsuarioForm from "../components/organisms/TLDeporteUsuarioForm.organism"
import TLAlimentoUsuarioForm from "../components/organisms/TLAlimentoUsuarioForm.organism";


//Constants

import { ColumnsUsuarioEnfermedades } from '../constants/ColumnsUsuarioEnfermedades.constant';
import { ColumnsUsuarioFarmacos } from '../constants/ColumnsUsuarioFarmacos.constant';
import { ColumnsUsuarioDeportes } from '../constants/ColumnsUsuarioDeportes.constant';
import { ColumnsUsuarioAlimentos } from '../constants/ColumnsUsuarioAlimentos.constant';

//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import Typography  from '@mui/material/Typography';

import * as usuarioService from '../services/UsuarioService'
import * as enfermedadService from '../services/EnfermedadService';
import * as farmacoService from '../services/FarmacoService';
import * as deporteService from '../services/DeporteService';
import * as alimentoService from '../services/AlimentoService';
import * as frecuenciaService from '../services/FrecuenciaService';

import * as usuarioFarmacoService from '../services/UsuarioFarmacoService';
import * as usuarioDeporteService from '../services/UsuarioDeporteService';
import * as usuarioAlimentoService from '../services/UsuarioAlimentoService';
import * as usuarioEnfermedadService from '../services/UsuarioEnfermedadService';


import { useTranslation } from "react-i18next";
import moment from 'moment'


const Perfil = () => {

  const {user, setUser} = useContext(UserContext);
  const {t, i18n} = useTranslation();

  const [usuario, setUsuario] = useState(null)
  const [sexo, setSexo] = useState(null)

  const [enfermedades, setEnfermedades] = useState(null);
  const [farmacos, setFarmacos] = useState(null);
  const [deportes, setDeportes] = useState(null);
  const [alimentos, setAlimentos] = useState(null);
  const [frecuencias, setFrecuencias] = useState(null);






  const [createPerfil, setCreatePerfil] = useState(null)
  const [deletePerfil, setDeletePerfil] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
   

  useEffect(() => {
    usuarioService.getUsuarioById(user.idUsuario, setUsuario)
    enfermedadService.getEnfermedad(setEnfermedades);
    farmacoService.getFarmaco(setFarmacos);
    deporteService.getDeporte(setDeportes);
    alimentoService.getAlimento(setAlimentos);
    frecuenciaService.getFrecuencia(setFrecuencias);
    
  }, [])

  useEffect(() => {
    if (usuario && usuario.sexo === 'M')
      setSexo(t("Masculino"))
    else
      setSexo(t("Femenino"))
  }, [usuario])

  const editDatosGenerales = (data, resetForm) => {
    usuarioService.updateDatosGenerales(data, setUsuario, setNotify)
    resetForm()
  }

  const addOrEditEnfermedad = (data, resetForm) => {
    if (data.idUsuarioEnfermedad === 0)
      usuarioEnfermedadService.insertUsuarioEnfermedad(data, setUsuario, setNotify)  
    else
      usuarioEnfermedadService.updateUsuarioEnfermedad(data, setUsuario, setNotify)
    resetForm()
  }

  const onDeleteEnfermedad = (data) => {
    usuarioEnfermedadService.deleteUsuarioEnfermedad(data, setUsuario, setNotify);
  }

  const addOrEditFarmaco = (data, resetForm) => {
    if (data.idUsuarioFarmaco === 0)
      usuarioFarmacoService.insertUsuarioFarmaco(data, setUsuario, setNotify)  
    else
    usuarioFarmacoService.updateUsuarioFarmaco(data, setUsuario, setNotify)
    resetForm()
  }

  const onDeleteFarmaco = (data) => {
    usuarioFarmacoService.deleteUsuarioFarmaco(data, setUsuario, setNotify);
  }

  const addOrEditDeporte = (data, resetForm) => {
    if (data.idUsuarioDeporte === 0)
      usuarioDeporteService.insertUsuarioDeporte(data, setUsuario, setNotify)  
    else
      usuarioDeporteService.updateUsuarioDeporte(data, setUsuario, setNotify)
    resetForm()
  }

  const onDeleteDeporte = (data) => {
    usuarioDeporteService.deleteUsuarioDeporte(data, setUsuario, setNotify)
  }

  const addOrEditAlimento = (data, resetForm) => {
    if (data.idUsuarioAlimento === 0)
      usuarioAlimentoService.insertUsuarioAlimento(data, setUsuario, setNotify)  
    else
      usuarioAlimentoService.updateUsuarioAlimento(data, setUsuario, setNotify)
    resetForm()
  }

  const onDeleteAlimento = (data) => {
    usuarioAlimentoService.deleteUsuarioAlimento(data, setUsuario, setNotify)
  }


  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5, pb: 5}}>
      <TLPageTitle sx={{ margin: 2 }}>{t("MiPerfil")}</TLPageTitle>
      
      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
          <Typography sx={{ flexGrow: 1, fontSize:'1.75rem', fontWeight:'bold', color: 'primary.main'}}>{t("DatosGenerales")}</Typography>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLDialog title={t('EditarDatosGenerales')} onOk={createPerfil} update={() => setUpdate(!update)} button={<TLButton label={t('EDITAR')} variant="contained" sx = {{fontWeight: 'bold'}} />}>
                <TLDatosGeneralesUsuarioForm
                  addOrEdit={editDatosGenerales}
                  update={update}
                  recordForEdit={usuario}
                  setCreateUsuario ={setCreatePerfil}
                />
              </TLDialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={2} sx={{pt: 2}}>
        <Grid item xs={5}>
          <TLLabel fontWeight ='bold' size='small'>{t("NOMBRES")}</TLLabel>
          <TLTextField 
            name="nombres"
            value={usuario ? usuario.nombres: ""}
            inputProps={{ maxLength: 100, readOnly:true }}
            sx = {{borderColor: '#00467E', backgroundColor:'#FFFFFF'}}
            variant = 'outlined'
            fullWidth
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
         <TLLabel fontWeight ='bold' size='small'>{t("APELLIDOS")}</TLLabel>
          <TLTextField 
            name="apellidos"
            value={usuario ? usuario.apellidos: ""}
            inputProps={{ maxLength: 100, readOnly:true }}
            sx = {{borderColor: '#00467E', backgroundColor:'#FFFFFF'}}
            variant = 'outlined'
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={2} sx={{pt: 2}}>
        <Grid item xs={5}>
          <TLLabel fontWeight ='bold' size='small'>{t("CORREOELECTRONICO")}</TLLabel>
          <TLTextField 
            name="correoElectronico"
            value={usuario ? usuario.correoElectronico: ""}
            inputProps={{ maxLength: 100, readOnly:true }}
            sx = {{borderColor: '#00467E', backgroundColor:'#FFFFFF'}}
            variant = 'outlined'
            fullWidth
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={5}>
          <TLLabel fontWeight ='bold' size='small'>{t("PAIS")}</TLLabel>
          <TLTextField 
            name="pais"
            value={usuario ? i18n.language ? usuario.nacionalidad.nombreEspanol : usuario.nacionalidad.nombreIngles: ""}
            inputProps={{ maxLength: 100, readOnly:true }}
            sx = {{borderColor: '#00467E', backgroundColor:'#FFFFFF'}}
            variant = 'outlined'
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center" spacing={2} sx={{pt: 2}}>
        <Grid item xs={3.5}>
          <TLLabel fontWeight ='bold' size='small'>{t("SEXO")}</TLLabel>
          <TLTextField 
            name="genero"
            value={sexo}
            inputProps={{ maxLength: 100, readOnly:true }}
            sx = {{borderColor: '#00467E', backgroundColor:'#FFFFFF'}}
            variant = 'outlined'
            fullWidth
          />
        </Grid>
        <Grid item xs={0.75}></Grid>
        <Grid item xs={3.5}>
          <TLLabel fontWeight ='bold' size='small'>{t("NUMERODOCUMENTO")}</TLLabel>
          <TLTextField 
            name="numeroDocumento"
            value={usuario ? usuario.numeroDocumento: ""}
            inputProps={{ maxLength: 100, readOnly:true }}
            sx = {{borderColor: '#00467E', backgroundColor:'#FFFFFF'}}
            variant = 'outlined'
            fullWidth
          />
        </Grid>
        <Grid item xs={0.75}></Grid>
        <Grid item xs={3.5}>
          <TLLabel fontWeight ='bold' size='small'>{t("TELEFONO")}</TLLabel>
          <TLTextField 
            name="telefono"
            value={usuario ? usuario.telefono: ""}
            inputProps={{ maxLength: 100, readOnly:true }}
            sx = {{borderColor: '#00467E', backgroundColor:'#FFFFFF'}}
            variant = 'outlined'
            fullWidth
          />
        </Grid>       
      </Grid>

      <Grid container alignItems="center" spacing={2} sx={{pt: 2}}>
        <Grid item xs={3.5}>
          <TLLabel fontWeight ='bold' size='small'>{t("FECHANACIMIENTO")}</TLLabel>
          <TLTextField 
            name="fechaNacimiento"
            value={usuario ? moment(usuario.fechaNacimiento).format("DD/MM/yyyy") : ""}
            inputProps={{ maxLength: 100, readOnly:true }}
            sx = {{borderColor: '#00467E', backgroundColor:'#FFFFFF'}}
            variant = 'outlined'
            fullWidth
          />
        </Grid>
        <Grid item xs={0.75}></Grid>
        <Grid item xs={3.5}>
          <TLLabel fontWeight ='bold' size='small'>{t("PESO(KG)")}</TLLabel>
          <TLTextField 
            name="peso"
            value={usuario && usuario.listPeso && usuario.listPeso.length > 0 ? usuario.listPeso[usuario.listPeso.length-1].cantidad: ""}
            inputProps={{ maxLength: 100, readOnly:true }}
            sx = {{borderColor: '#00467E', backgroundColor:'#FFFFFF'}}
            variant = 'outlined'
            fullWidth
          />
        </Grid>
        <Grid item xs={0.75}></Grid>
        <Grid item xs={3.5}>
          <TLLabel fontWeight ='bold' size='small'>{t("TALLA(CM)")}</TLLabel>
          <TLTextField 
            name="talla"
            value={usuario &&  usuario.listTalla && usuario.listTalla.length > 0 ? usuario.listTalla[usuario.listTalla.length-1].cantidad: ""}
            inputProps={{ maxLength: 100, readOnly:true }}
            sx = {{borderColor: '#00467E', backgroundColor:'#FFFFFF'}}
            variant = 'outlined'
            fullWidth
          />
        </Grid>      
      </Grid>

      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>       
        <Grid item xs={5}>
            <Typography sx={{ flexGrow: 1, fontSize:'1.75rem', fontWeight:'bold', color: 'primary.main'}}>{t("Enfermedades")}</Typography>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLDialog title={t('AgregarEnfermedad')} onOk={createPerfil} update={() => setUpdate(!update)} button={<TLIconButton sx={{ color: '#727272'}}><AddIcon fontSize = "large" /></TLIconButton>}>
                <TLEnfermedadUsuarioForm
                  addOrEdit={addOrEditEnfermedad}
                  update={update}
                  recordForEdit={null}
                  setCreateEnfermedad={setCreatePerfil}
                  enfermedades = {enfermedades}
                />
              </TLDialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={usuario ? usuario.listUsuarioEnfermedad : []}
          columns={ColumnsUsuarioEnfermedades(createPerfil, setUpdate, update, addOrEditEnfermedad, setCreatePerfil, deletePerfil, setTrash, trash, onDeleteEnfermedad, setDeletePerfil, enfermedades, i18n.language)}
          disableSelectionOnClick
          />
      </Grid>


      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={9}>
            <Typography sx={{ flexGrow: 1, fontSize:'1.75rem', fontWeight:'bold', color: 'primary.main'}}>{t("TratamientosFarmacologicos")}</Typography>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLDialog title={t('AgregarTratamiento')} onOk={createPerfil} update={() => setUpdate(!update)} button={<TLIconButton sx={{ color: '#727272'}}><AddIcon fontSize = "large" /></TLIconButton>}>
                <TLFarmacoUsuarioForm
                  addOrEdit={addOrEditFarmaco}
                  update={update}
                  recordForEdit={null}
                  setCreateFarmaco={setCreatePerfil}
                  farmacos  = {farmacos}
                  frecuencias = {frecuencias}
                />
              </TLDialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={usuario ? usuario.listUsuarioFarmaco : []}
          columns={ColumnsUsuarioFarmacos(createPerfil, setUpdate, update, addOrEditFarmaco, setCreatePerfil, deletePerfil, setTrash, trash, onDeleteFarmaco, setDeletePerfil, farmacos, frecuencias, i18n.language)}
          disableSelectionOnClick
          />
      </Grid>

      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
            <Typography sx={{ flexGrow: 1, fontSize:'1.75rem', fontWeight:'bold', color: 'primary.main'}}>{t("RutinasFisicas")}</Typography>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLDialog title={t('AgregarRutina')} onOk={createPerfil} update={() => setUpdate(!update)} button={<TLIconButton sx={{ color: '#727272'}}><AddIcon fontSize = "large" /></TLIconButton>}>
                <TLDeporteUsuarioForm
                  addOrEdit={addOrEditDeporte}
                  update={update}
                  recordForEdit={null}
                  setCreateDeporte={setCreatePerfil}
                  deportes  = {deportes}
                  frecuencias = {frecuencias}
                />
              </TLDialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={usuario ? usuario.listUsuarioDeporte : []}
          columns={ColumnsUsuarioDeportes(createPerfil, setUpdate, update, addOrEditDeporte, setCreatePerfil, deletePerfil, setTrash, trash, onDeleteDeporte, setDeletePerfil, deportes, frecuencias, i18n.language)}
          disableSelectionOnClick
          />
      </Grid>

      <Grid container alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item xs={5}>
            <Typography sx={{ flexGrow: 1, fontSize:'1.75rem', fontWeight:'bold', color: 'primary.main'}}>{t("Dieta")}</Typography>
        </Grid>
        <Grid item xs>
          <Grid container alignItems="center" direction = "row-reverse" spacing={2}>
            <Grid item>
              <TLDialog title={t('AgregarAlimento')} onOk={createPerfil} update={() => setUpdate(!update)} button={<TLIconButton sx={{ color: '#727272'}}><AddIcon fontSize = "large" /></TLIconButton>}>
                <TLAlimentoUsuarioForm
                  addOrEdit={addOrEditAlimento}
                  update={update}
                  recordForEdit={null}
                  setCreateAlimento={setCreatePerfil}
                  alimentos  = {alimentos}
                />
              </TLDialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={usuario ? usuario.listUsuarioAlimento : []}
          columns={ColumnsUsuarioAlimentos(createPerfil, setUpdate, update, addOrEditAlimento, setCreatePerfil, deletePerfil, setTrash, trash, onDeleteAlimento, setDeletePerfil, alimentos, i18n.language)}
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

export default Perfil;