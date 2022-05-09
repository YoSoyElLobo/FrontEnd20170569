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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



const initialValues = {
  idUsuarioFarmaco: 0,
  usuario: {
    idUsuario: 0
  },
  farmaco: {
    idFarmaco: 0, 
    nombreEspanol: '' ,
    nombreIngles: '' 
  },
  dosis: '',
  cantidad: '',
  frecuencia: {
    idFrecuencia: 0,
    nombreEspanol: '',
    nombreIngles: ''
  },  
  fechaInicio: new Date()  
}

const TLFarmacoUsuarioForm = ({addOrEdit, recordForEdit, setCreateFarmaco, farmacos, frecuencias, update}) => {

  const {t, i18n} = useTranslation();
  const {user, setUser} = useContext(UserContext);
  const validate = () => {
    values.usuario.idUsuario = user.idUsuario
    let temp = {}
    console.log(values)

    temp.farmaco = values.farmaco.idFarmaco !== 0 ? "" : "Este campo es obligatorio"
    temp.dosis = values.dosis && (/^[0-9\b]+$/).test(values.dosis.toString()) ? "": "Este campo es obligatorio y debe ser numérico"
    temp.cantidad = values.cantidad && (/^[0-9\b]+$/).test(values.cantidad.toString()) ? "": "Este campo es obligatorio y debe ser numérico"
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

  const handleSelectionFarmaco = (event, value) => {
    console.log(value)
    setValues({
      ...values,
      ['farmaco']: value 
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
    setCreateFarmaco(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Farmaco")}*</TLLabel>
        </Grid>
        {recordForEdit == null && 
        <Grid item xs={6}>
          <TLAutocomplete
            name="farmaco"
            label={t("Farmaco")}
            options={farmacos}
            value={values.farmaco}
            isOptionEqualToValue={(option, value) => `${option.nombreEspanol}` === `${value.nombreEspanol}` ||  `${option.nombreIngles}` === `${value.nombreIngles}`}
            onChange={handleSelectionFarmaco}
            error={errors.farmaco}
          />
        </Grid>}
        {recordForEdit !== null && 
        <Grid item xs={6}>
          <TLTextField 
            name="farmaco"
            label={t("Farmaco")}
            value={i18n.language === 'es' ? values.farmaco.nombreEspanol: values.farmaco.nombreIngles}
            readOnly
            error={errors.farmaco}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
        }
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Dosis")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="dosis"
            label={t("Dosis")}
            type = "number"
            value={values.dosis}
            onChange={handleInputChange}
            error={errors.dosis}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("CantidadDeVeces")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="cantidad"
            label={t("CantidadDeVeces")}
            type = "number"
            value={values.cantidad}
            onChange={handleInputChange}
            error={errors.cantidad}
            inputProps={{ maxLength: 100 }}
            fullWidth
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


export default TLFarmacoUsuarioForm;