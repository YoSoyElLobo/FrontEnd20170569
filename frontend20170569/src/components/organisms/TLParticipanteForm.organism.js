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
  estudio: {
    idEstudio: 0, 
  },
  codigoMuestra: '',
  fechaMuestreo: '' 
}

const TLParticipanteForm = ({edit, recordForEdit, setUpdateParticipante, update}) => {

  const {t, i18n} = useTranslation();
  const {user, setUser} = useContext(UserContext);

  const validate = () => {
    
    let temp = {}
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
      edit(values, resetForm)
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
    setUpdateParticipante(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Id")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="idUsuario"
            label={t("Id")}
            value={values.usuario.idUsuario}
            onChange={handleInputChange}
            error={errors.idUsuario}
            inputProps={{ maxLength: 100 }}
            fullWidth
            readOnly
          />
        </Grid>
      </Grid>        
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("CodigoMuestra")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="codigoMuestra"
            label={t("CodigoMuestra")}
            value={values.codigoMuestra}
            onChange={handleInputChange}
            error={errors.codigoMuestra}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("FechaMuestreo")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLDatePicker
            name="fechaMuestreo"
            label={t("FechaMuestreo")}
            value={values.fechaMuestreo}
            onChange={date => handleInputChange({ target: { value: date, name: 'fechaMuestreo' } })}
            error={errors.fechaMuestreo}
          />
        </Grid>
      </Grid>
      
      
      {/*<Grid container justifyContent="flex-end" alignItems="center" sx={{pt: 1.5}}>
        <Grid item>
          <TLLabel>*{t('CamposObligatorios')}</TLLabel>
        </Grid>
  </Grid>*/}
    </Form>
  );
};


export default TLParticipanteForm;