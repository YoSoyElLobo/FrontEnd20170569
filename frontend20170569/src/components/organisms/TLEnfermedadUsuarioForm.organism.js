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
  idUsuarioEnfermedad: 0,
  fechaDiagnostico: new Date(),
  estado: true,
  usuario: {
    idUsuario: 0
  },
  enfermedad: {
    idEnfermedad: 0, 
    nombreEspanol: '' ,
    nombreIngles: '' 

  }
}

const TLEnfermedadUsuarioForm = ({addOrEdit, recordForEdit, setCreateEnfermedad, enfermedades, update}) => {

  const validate = () => {
    let temp = {}
    console.log(values)

    temp.enfermedad = values.enfermedad.idEnfermedad !== 0 ? "" : "Este campo es obligatorio"
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
    setCreateEnfermedad(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
    <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Enfermedad")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLSelection 
            name="enfermedad"
            label={t("Enfermedad")}
            menuItems={enfermedades}
            value={values.enfermedad.idEnfermedad}
            onChange={handleSelection}
            error={errors.enfermedad}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("FechaDiagnostico")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLDatePicker
            name="fechaDiagnostico"
            label={t("FechaDiagnostico")}
            value={values.fechaDiagnostico}
            onChange={date => handleInputChange({ target: { value: date, name: 'fechaDiagnostico' } })}
            error={errors.fechaDiagnostico}
          />
        </Grid>
      </Grid>
      
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Estado")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            name="estado"
            //defaultValue={"M"}
            value = {values.estado}
            onChange={handleInputChange}
            row
          >
            <FormControlLabel value={true} control={<Radio />} label={t("Activa")} />
            <FormControlLabel value={false} control={<Radio />} label={t("Inactiva")} />
          </RadioGroup>
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


export default TLEnfermedadUsuarioForm;