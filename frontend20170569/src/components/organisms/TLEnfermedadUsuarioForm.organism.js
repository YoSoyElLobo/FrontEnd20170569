import React, { useState , useEffect } from 'react';
import { useContext } from 'react';
//Components
import { UserContext } from "../../context/UserContext";
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

import { useTranslation } from 'react-i18next';

const initialValues = {
  idUsuarioEnfermedad: 0,
  usuario: {
    idUsuario: 0
  },
  enfermedad: {
    idEnfermedad: 0, 
    nombreEspanol: '' ,
    nombreIngles: '' 

  },
  fechaDiagnostico: new Date(),
  estado: true  
}

const TLEnfermedadUsuarioForm = ({addOrEdit, recordForEdit, setCreateEnfermedad, enfermedades, update}) => {
    const {t, i18n} = useTranslation();
  const {user, setUser} = useContext(UserContext);
  const validate = () => {
    values.usuario.idUsuario = user.idUsuario
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

  const handleSelectionEnfermedad = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idEnfermedad: value,
        nombreEspanol: enfermedades.filter(x => x.idEnfermedad === value)[0].nombreEspanol,
        nombreIngles: enfermedades.filter(x => x.idEnfermedad === value)[0].nombreIngles
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
    setCreateEnfermedad(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
    <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Enfermedad")}*</TLLabel>
        </Grid>
        {recordForEdit == null && 
        <Grid item xs={6}>
          <TLSelection 
            name="enfermedad"
            label={t("Enfermedad")}
            menuItems={enfermedades}
            value={values.enfermedad.idEnfermedad}
            onChange={handleSelectionEnfermedad}
            error={errors.enfermedad}
          />
        </Grid>}
        {recordForEdit !== null && 
        <Grid item xs={6}>
          <TLTextField 
            name="enfermedad"
            label={t("Enfermedad")}
            value={i18n.language === 'es' ? values.enfermedad.nombreEspanol: values.enfermedad.nombreIngles}
            readOnly
            error={errors.enfermedad}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>}
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