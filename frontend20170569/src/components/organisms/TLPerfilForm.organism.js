import React, { useState , useEffect } from 'react';
import { useTranslation } from 'react-i18next';
//Components
import {useForm, Form} from '../atoms/TLForm.atom';
import TLLabel from '../atoms/TLLabel.atom';
import TLTextField from '../atoms/TLTextField.atom';
import TLSelection from '../atoms/TLSelection.atom';
import TLDatePicker from '../molecules/TLDatePicker.molecule';
import TLTabPanel from '../atoms/TLTabPanel.atom';
import TLDataGrid from '../atoms/TLDataGrid.atom';

//Mui
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { ColumnsPerfilEnfermedades } from '../../constants/ColumnsPerfilEnfermedades.constant';
import { ColumnsPerfilFarmacos} from '../../constants/ColumnsPerfilFarmacos.constant';
import { ColumnsPerfilDeportes} from '../../constants/ColumnsPerfilDeportes.constant';
import { ColumnsPerfilAlimentos } from '../../constants/ColumnsPerfilAlimentos.constant';



const TLPerfilForm = ({recordForEdit, setCreateParticipante, update}) => {

  const {t, i18n} =  useTranslation();
  const [peso, setPeso] = useState(0)
  const [talla, setTalla] = useState(0)
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
  }
  
  
  const handleUpdate = () => {
    return true    
  }

 
  useEffect(() => {
    
    if (recordForEdit !== null){
      console.log(recordForEdit)
      console.log(recordForEdit.listEnfermedades)
      setPeso(recordForEdit.listPeso.length > 0 ? recordForEdit.listPeso[recordForEdit.listPeso.length-1].cantidad : 0)
      setTalla(recordForEdit.listTalla.length > 0 ? recordForEdit.listTalla[recordForEdit.listTalla.length-1].cantidad : 0)
    }
  }, [])

  useEffect(() => {
    setCreateParticipante(() => () => handleUpdate())
  }, [update])
  
  return (
    <Grid container width={'100%'}>
      <Grid direction='row' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label={t('DatosGenerales')} />
          <Tab label={t('Enfermedades')}  />
          <Tab label={t('TratamientosFarmacologicos')} />
          <Tab label={t('RutinasFisicas')} />
          <Tab label={t('Dieta')} />
        </Tabs>
      </Grid>
      <Grid container width={'100%'}>      
        <TLTabPanel value = {value} index = {0}>
          <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
            <Grid item xs={6}>
              <TLLabel>{t("Pais")}</TLLabel>
            </Grid>
            <Grid item xs={6}>
              <TLTextField 
                label={t("Pais")}
                value={ i18n.language === 'es' ? recordForEdit.nacionalidad.nombreEspanol : recordForEdit.nacionalidad.nombreIngles}
                inputProps={{ maxLength: 100 }}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
            <Grid item xs={6}>
              <TLLabel>{t("Sexo")}</TLLabel>
            </Grid>
            <Grid item xs={6}>
              <TLTextField 
                label={t("Sexo")}
                value={recordForEdit.sexo === 'M' ? t("Masculino") : t("Femenino")}
                inputProps={{ maxLength: 100 }}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
            <Grid item xs={6}>
              <TLLabel>{t("FechaNacimiento")}*</TLLabel>
            </Grid>
            <Grid item xs={6}>
              <TLDatePicker
                label={t("FechaNacimiento")}
                value={recordForEdit.fechaNacimiento}
                readOnly
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
            <Grid item xs={6}>
              <TLLabel>{t("Edad")}</TLLabel>
            </Grid>
            <Grid item xs={6}>
              <TLTextField 
                label={t("Edad")}
                value={calcularEdad(recordForEdit.fechaNacimiento)}
                inputProps={{ maxLength: 100 }}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
            <Grid item xs={6}>
              <TLLabel>{t("Peso")}</TLLabel>
            </Grid>
            <Grid item xs={6}>
              <TLTextField 
                label={t("Peso")}
                value={peso}
                inputProps={{ maxLength: 100 }}
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
            <Grid item xs={6}>
              <TLLabel>{t("Talla")}</TLLabel>
            </Grid>
            <Grid item xs={6}>
              <TLTextField 
                label={t("Talla")}
                value={talla}
                inputProps={{ maxLength: 100 }}
                fullWidth
              />
            </Grid>
          </Grid>
        </TLTabPanel>
        <TLTabPanel value = {value} index = {1}>       
          <TLDataGrid 
            rows={recordForEdit && recordForEdit.listUsuarioEnfermedad ? recordForEdit.listUsuarioEnfermedad : []}
            columns={ColumnsPerfilEnfermedades(i18n.language)}
            disableSelectionOnClick
            />
        </TLTabPanel>
        <TLTabPanel value = {value} index = {2}>       
          <TLDataGrid 
            rows={recordForEdit && recordForEdit.listUsuarioFarmaco ? recordForEdit.listUsuarioFarmaco : []}
            columns={ColumnsPerfilFarmacos(i18n.language)}
            disableSelectionOnClick
            />
        </TLTabPanel>
        
        <TLTabPanel value = {value} index = {3}>       
          <TLDataGrid 
            rows={recordForEdit && recordForEdit.listUsuarioDeporte ? recordForEdit.listUsuarioDeporte : []}
            columns={ColumnsPerfilDeportes(i18n.language)}
            disableSelectionOnClick
            />
        </TLTabPanel>

        <TLTabPanel value = {value} index = {4}>       
          <TLDataGrid 
            rows={recordForEdit && recordForEdit.listUsuarioAlimento ? recordForEdit.listUsuarioAlimento : []}
            columns={ColumnsPerfilAlimentos(i18n.language)}
            disableSelectionOnClick
            />
        </TLTabPanel>
        
      </Grid>
    </Grid>
  );
};


export default TLPerfilForm;