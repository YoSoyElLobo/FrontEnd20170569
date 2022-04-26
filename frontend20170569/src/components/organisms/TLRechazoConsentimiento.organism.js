import React, { useState , useEffect } from 'react';
//Components
import {useForm, Form} from '../atoms/TLForm.atom';
import TLLabel from '../atoms/TLLabel.atom';
import TLTextField from '../atoms/TLTextField.atom';
import TLTextArea from '../atoms/TLTextArea.atom';
import TLIconButton from '../atoms/TLIconButton.atom';


//Mui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';

import {t} from 'i18next';

const initialValues = {
  idUsuario: 0,
  motivoRechazo: 0
}

const TLRechazoConsentimiento = ({onRechazo, usuario, setRechazoUsuario, update}) => {

  const validate = () => {
    let temp = {}

    temp.motivoRechazo = values.motivoRechazo ? "" : "Este campo es obligatorio y debe ser alfabético"
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
      onRechazo(values, resetForm)
      return true
    }
    else
      return false
  }

  
  useEffect(() => {
    setValues({
      ...usuario
    });    
  }, [])

  useEffect(() => {
    setRechazoUsuario(() => () => handleUpdate())
  }, [update])
  
  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <TLIconButton disableRipple sx={{ color: 'primary.main'}}>
            <ClearIcon sx={{ fontSize: 70 }} />
          </TLIconButton>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{pt: 1}}>
        <Grid item>
          <Typography align="center" sx={{ color: 'black', fontSize: '1.5rem'}}>{t("ConfirmAprobarUsuario")}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{pt: 1}}>
        <Grid item>
        <Typography sx={{ color: 'black', fontSize: '1rem'}}>{`${usuario.nombres} ${usuario.apellidos}`}</Typography>
        </Grid>
      </Grid>
      <Form>
        <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
          <Grid item xs={4}>
            <TLLabel>{t("MotivoRechazo")}*</TLLabel>
          </Grid>
          <Grid item xs={8}>
            <TLTextArea
              minRows={3}
              name="motivoRechazo"
              label={t("MotivoRechazo")}
              value={values.motivoRechazo}
              onChange={handleInputChange}
              error={errors.motivoRechazo}
              style={{width:"90%", border: "1px solid #9ba09f", borderRadius: "6px",
                padding:"20px", fontFamily: 'Montserrat',
                fontSize:"16px"
              }}
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
    </>
  );
};


export default TLRechazoConsentimiento;