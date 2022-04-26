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
  idUsuarioAlimento: 0,
  alimento: {
    idAlimento: 0, 
    nombreEspanol: '' ,
    nombreIngles: '' 

  },
  cantidad: ''
}

const TLAlimentoUsuarioForm = ({addOrEdit, recordForEdit, setCreateAlimento, alimentos, update}) => {

  const validate = () => {
    let temp = {}
    console.log(values)

    temp.alimento = values.alimento.idAlimento !== 0 ? "" : "Este campo es obligatorio"
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
    setCreateAlimento(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Alimento")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLSelection 
            name="alimento"
            label={t("Alimento")}
            menuItems={alimentos}
            value={values.alimento.idAlimento}
            onChange={handleSelection}
            error={errors.alimento}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("CantidadSemanalDeConsumo")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="cantidad"
            label={t("CantidadSemanalDeConsumo")}
            value={values.cantidad}
            onChange={handleInputChange}
            error={errors.cantidad}
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


export default TLAlimentoUsuarioForm;