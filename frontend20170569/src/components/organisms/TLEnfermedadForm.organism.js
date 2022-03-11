import React, { useState , useEffect } from 'react';
//Components
import {useForm, Form} from '../atoms/TLForm.atom';
import TLLabel from '../atoms/TLLabel.atom';
import TLTextField from '../atoms/TLTextField.atom';
//Mui
import Grid from '@mui/material/Grid';

const initialValues = {
  idEnfermedad: 0,
  nombre: ''
}

const TLEnfermedadForm = ({addOrEdit, recordForEdit, setCreateEnfermedad, update}) => {

  const validate = () => {
    let temp = {}
    temp.nombre = values.nombre && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(values.nombre) ? "" : "Este campo es obligatorio y debe ser alfabético"
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
          <TLLabel>Nombre*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="nombre"
            label='Nombre'
            value={values.nombre}
            onChange={handleInputChange}
            error={errors.nombre}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" sx={{pt: 1.5}}>
        <Grid item>
          <TLLabel>*Campos obligatorio</TLLabel>
        </Grid>
      </Grid>
    </Form>
  );
};


export default TLEnfermedadForm;