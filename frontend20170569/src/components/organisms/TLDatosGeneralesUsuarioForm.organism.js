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
  idUsuario: 0,
  correoElectronico: '',
  sexo: 'M',
  telefono: '',
  fechaNacimiento: new Date(),
  peso: '',
  talla: ''
}

const TLDatosGeneralesUsuarioForm = ({addOrEdit, recordForEdit, setCreateUsuario, update}) => {

  const validate = () => {
    let temp = {}
    console.log(values)
    
    temp.correoElectronico = values.correoElectronico && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(values.correoElectronico) ? "" : "Correo electrónico no válido"
    temp.telefono = values.telefono && (/^[0-9\b]+$/).test(values.telefono.toString()) ? "": "Este campo es obligatorio y debe ser numérico"
    temp.peso = values.peso && (/^[0-9\b]+$/).test(values.peso.toString()) ? "": "Este campo es obligatorio y debe ser numérico"
    temp.talla = values.talla && (/^[0-9\b]+$/).test(values.talla.toString()) ? "": "Este campo es obligatorio y debe ser numérico"
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

 
  useEffect(() => {
    if (recordForEdit !== null){
      recordForEdit.listPeso.length > 0 ? recordForEdit.peso = recordForEdit.listPeso[recordForEdit.listPeso.length-1].cantidad : recordForEdit.peso = ''
      recordForEdit.listTalla.length > 0 ? recordForEdit.talla = recordForEdit.listTalla[recordForEdit.listTalla.length-1].cantidad : recordForEdit.talla = ''
      setValues({
        ...recordForEdit
      });
    }
  }, [])

  useEffect(() => {
    setCreateUsuario(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
      
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("CorreoElectronico")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="correoElectronico"
            label={t("CorreoElectronico")}
            value={values.correoElectronico}
            onChange={handleInputChange}
            error={errors.correoElectronico}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
      </Grid>
      
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Sexo")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            name="sexo"
            //defaultValue={"M"}
            value = {values.sexo}
            onChange={handleInputChange}
            row
          >
            <FormControlLabel value="F" control={<Radio />} label={t("Femenino")} />
            <FormControlLabel value="M" control={<Radio />} label={t("Masculino")} />
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Telefono")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="telefono"
            label={t("Telefono")}
            type = "number"
            value={values.telefono}
            onChange={handleInputChange}
            error={errors.telefono}
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
            name="fechaNacimiento"
            label={t("FechaNacimiento")}
            value={values.fechaNacimiento}
            onChange={date => handleInputChange({ target: { value: date, name: 'fechaNacimiento' } })}
            error={errors.fechaNacimiento}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Peso")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="peso"
            label={t("Peso")}
            type = "number"
            value={values.peso}
            onChange={handleInputChange}
            error={errors.peso}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Talla")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="talla"
            label={t("Talla")}
            type = "number"
            value={values.talla}
            onChange={handleInputChange}
            error={errors.talla}
            inputProps={{ maxLength: 100 }}
            fullWidth
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


export default TLDatosGeneralesUsuarioForm;