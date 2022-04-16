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
  nombres: '',
  apellidos: '',
  correoElectronico: '',
  sexo: 'M',
  numeroDocumento: '',
  telefono: '',
  fechaNacimiento: new Date(),
  rol: {
    idRol: 0, 
    nombreEspanol: '' ,
    nombreIngles: '' 

  }
}

const TLUsuarioForm = ({addOrEdit, recordForEdit, setCreateUsuario, roles, update}) => {

  const validate = () => {
    let temp = {}
    console.log(values)
    temp.nombres = values.nombres && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(values.nombres) ? "" : "Este campo es obligatorio y debe ser alfabético"
    temp.apellidos = values.apellidos && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(values.apellidos) ? "" : "Este campo es obligatorio y debe ser alfabético"
    temp.correoElectronico = values.correoElectronico && (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(values.correoElectronico) ? "" : "Correo electrónico no válido"
    temp.numeroDocumento = values.numeroDocumento && (/^[0-9\b]+$/).test(values.numeroDocumento.toString()) ? "": "Este campo es obligatorio y debe ser numérico"
    temp.telefono = values.telefono && (/^[0-9\b]+$/).test(values.telefono.toString()) ? "": "Este campo es obligatorio y debe ser numérico"
    temp.rol = values.rol.idRol !== 0 ? "" : "Este campo es obligatorio"
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

  const handleUpdateFecha = () => {
    console.log('cambiado')
  }

  const handleSelection = e => {
    console.log(roles)
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
    setCreateUsuario(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Nombres")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="nombres"
            label={t("Nombres")}
            value={values.nombres}
            onChange={handleInputChange}
            error={errors.nombres}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Apellidos")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="apellidos"
            label={t("Apellidos")}
            value={values.apellidos}
            onChange={handleInputChange}
            error={errors.apellidos}
            inputProps={{ maxLength: 50 }}
            fullWidth
          />
        </Grid>
      </Grid>
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
            <FormControlLabel value="F" control={<Radio />} label="Female" />
            <FormControlLabel value="M" control={<Radio />} label="Male" />
          </RadioGroup>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("NumeroDocumento")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="numeroDocumento"
            label={t("NumeroDocumento")}
            value={values.numeroDocumento}
            onChange={handleInputChange}
            error={errors.numeroDocumento}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
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
          <TLLabel>{t("Rol")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLSelection 
            name="rol"
            label={t("Rol")}
            menuItems={roles}
            value={values.rol.idRol}
            onChange={handleSelection}
            error={errors.rol}
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


export default TLUsuarioForm;