import React, { useState , useEffect } from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
//Components
import { UserContext } from "../../context/UserContext";
import {useForm, Form} from '../atoms/TLForm.atom';
import TLLabel from '../atoms/TLLabel.atom';
import TLTextField from '../atoms/TLTextField.atom';
import TLSelection from '../atoms/TLSelection.atom';
import TLDatePicker from '../molecules/TLDatePicker.molecule';
import TLAutocomplete from '../molecules/TLAutocomplete.molecule';
//Mui
import Grid from '@mui/material/Grid';

import {t} from 'i18next';

const initialValues = {
  idUsuarioDeporte: 0,
  deporte: {
    idDeporte: 0, 
    nombreEspanol: '' ,
    nombreIngles: '' 

  },
  frecuencia: {
    idFrecuencia: 0,
    nombreEspanol: '',
    nombreIngles: ''
  },  
  usuario: {
    idUsuario: 0
  },
  fechaInicio: new Date()
}

const TLDeporteUsuarioForm = ({addOrEdit, recordForEdit, setCreateDeporte, deportes, frecuencias, update}) => {

  const {t, i18n} = useTranslation();
  const {user, setUser} = useContext(UserContext);

  const validate = () => {
    values.usuario.idUsuario = user.idUsuario
    let temp = {}
    console.log(values)
    temp.deporte = values.deporte.idDeporte !== 0 ? "" : "Este campo es obligatorio"
    temp.frecuencia = values.frecuencia.idFrecuencia !== 0 ? "" : "Este campo es obligatorio"
    setErrors({
      ...temp
    })

    return Object.values(temp).every(x => x === "")
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  }=useForm(initialValues);

  const handleUpdate = () => {
    if(validate()){
      addOrEdit(values, resetForm)
      return true
    }
    else
      return false
  }

  const handleSelectionDeporte = (event, value) => {
    setValues({
      ...values,
      ['deporte']: value 
    });
  }

  const handleSelectionFrecuencia = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idFrecuencia: value,
        nombreEspanol: frecuencias.filter(x => x.idFrecuencia === value)[0].nombreEspanol,
        nombreIngles: frecuencias.filter(x => x.idFrecuencia === value)[0].nombreIngles
      }
    });
  }

  useEffect(() => {
    if (recordForEdit !== null){
      setValues({
        ...recordForEdit
      });
    }
  }, [])

  useEffect(() => {
    setCreateDeporte(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Deporte")}*</TLLabel>
        </Grid>
        {recordForEdit == null && 
        <Grid item xs={6}>
          <TLAutocomplete
            name="deporte"
            label={t("Deporte")}
            options={deportes}
            value={values.deporte}
            isOptionEqualToValue={(option, value) => `${option.nombreEspanol}` === `${value.nombreEspanol}` ||  `${option.nombreIngles}` === `${value.nombreIngles}`}
            onChange={handleSelectionDeporte}
            error={errors.deporte}
          />
        </Grid>}
        {recordForEdit !== null && 
        <Grid item xs={6}>
          <TLTextField 
            name="deporte"
            label={t("Deporte")}
            value={i18n.language === 'es' ? values.deporte.nombreEspanol: values.deporte.nombreIngles}
            readOnly
            error={errors.deporte}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
        }
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Frecuencia")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLSelection 
            name="frecuencia"
            label={t("Frecuencia")}
            menuItems={frecuencias}
            value={values.frecuencia.idFrecuencia}
            onChange={handleSelectionFrecuencia}
            error={errors.frecuencia}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("FechaInicio")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLDatePicker
            name="fechaInicio"
            label={t("FechaInicio")}
            value={values.fechaInicio}
            onChange={date => handleInputChange({ target: { value: date, name: 'fechaInicio' } })}
            error={errors.fechaInicio}
          />
        </Grid>
      </Grid>
      
      
      <Grid container justifyContent="flex-end" alignItems="center" sx={{pt: 1.5}}>
        <Grid item>
          <TLLabel>*{t('CamposObligatorios')}</TLLabel>
        </Grid>
      </Grid>
    </Form>
  );
};


export default TLDeporteUsuarioForm;