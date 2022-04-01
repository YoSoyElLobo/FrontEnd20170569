import React, { useState , useEffect } from 'react';
//Components
import {useForm, Form} from '../atoms/TLForm.atom';
import TLLabel from '../atoms/TLLabel.atom';
import TLTextField from '../atoms/TLTextField.atom';
//Mui
import Grid from '@mui/material/Grid';

import {t} from 'i18next';

const initialValues = {
  idFarmaco: 0,
  nombreEspanol: '',
  nombreIngles: ''
}

const TLFarmacoForm = ({addOrEdit, recordForEdit, setCreateFarmaco, update}) => {

  const validate = () => {
    let temp = {}
    temp.nombreEspanol = values.nombreEspanol && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(values.nombreEspanol) ? "" : "Este campo es obligatorio y debe ser alfabético"
    temp.nombreIngles = values.nombreIngles && (/[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]/).test(values.nombreIngles) ? "" : "Este campo es obligatorio y debe ser alfabético"
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
    setCreateFarmaco(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t('NombreEspanol')}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="nombreEspanol"
            label={t('NombreEspanol')}
            value={values.nombreEspanol}
            onChange={handleInputChange}
            error={errors.nombreEspanol}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t('NombreIngles')}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="nombreIngles"
            label={t('NombreIngles')}
            value={values.nombreIngles}
            onChange={handleInputChange}
            error={errors.nombreIngles}
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


export default TLFarmacoForm;