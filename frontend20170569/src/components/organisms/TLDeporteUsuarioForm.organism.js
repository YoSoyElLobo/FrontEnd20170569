import React, { useState , useEffect } from 'react';
//Components
import {useForm, Form} from '../atoms/TLForm.atom';
import TLLabel from '../atoms/TLLabel.atom';
import TLTextField from '../atoms/TLTextField.atom';
import TLSelection from '../atoms/TLSelection.atom';
import TLDatePicker from '../molecules/TLDatePicker.molecule';

//Mui
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import {t} from 'i18next';

const initialValues = {
  idUsuarioDeporte: 0,
  frecuencia: {
    idFrecuencia: 0,
    nombreEspanol: '',
    nombreIngles: ''
  },  
  usuario: {
    idUsuario: 0
  },
  deporte: {
    idDeporte: 0, 
    nombreEspanol: '' ,
    nombreIngles: '' 

  },
  fechaInicio: new Date()
}

const TLDeporteUsuarioForm = ({addOrEdit, recordForEdit, setCreateDeporte, deportes, frecuencias, update}) => {

  const validate = () => {
    let temp = {}
    console.log(values)

    temp.deporte = values.deporte.idDeporte !== 0 ? "" : "Este campo es obligatorio"
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

  const handleSelection = e => {
    /*console.log(roles)
    const {name, value} = e.target;
    console.log(name)
    console.log(roles.filter(x => x.idRol === value)[0].nombreEspanol)
    console.log(roles.filter(x => x.idRol === value)[0].nombreIngles)
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idRol: value,
        nombreEspanol: roles.filter(x => x.idRol === value)[0].nombreEspanol,
        nombreIngles: roles.filter(x => x.idRol === value)[0].nombreIngles
      }
    });*/
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
        <Grid item xs={6}>
          <TLSelection 
            name="deporte"
            label={t("Deporte")}
            menuItems={deportes}
            value={values.deporte.idDeporte}
            onChange={handleSelection}
            error={errors.deporte}
          />
        </Grid>
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
            onChange={handleSelection}
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