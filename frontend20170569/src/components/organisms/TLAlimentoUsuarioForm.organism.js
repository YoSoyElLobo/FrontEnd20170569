import React, { useState , useEffect } from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

//Components
import { UserContext } from "../../context/UserContext";
import {useForm, Form} from '../atoms/TLForm.atom';
import TLLabel from '../atoms/TLLabel.atom';
import TLTextField from '../atoms/TLTextField.atom';
import TLAutocomplete from '../molecules/TLAutocomplete.molecule';

//Mui
import Grid from '@mui/material/Grid';

const initialValues = {
  idUsuarioAlimento: 0,
  usuario: {
    idUsuario: 0
  },
  alimento: {
    idAlimento: 0, 
    nombreEspanol: '' ,
    nombreIngles: '' 

  },
  cantidad: ' '
}

const TLAlimentoUsuarioForm = ({addOrEdit, recordForEdit, setCreateAlimento, alimentos, update}) => {

  const {t, i18n} = useTranslation();
  const {user, setUser} = useContext(UserContext);

  const validate = () => {
    values.usuario.idUsuario = user.idUsuario
    let temp = {}
    console.log(values)

    temp.alimento = values.alimento.idAlimento !== 0 ? "" : "Este campo es obligatorio"
    temp.cantidad = values.cantidad && (/^[0-9\b]+$/).test(values.cantidad.toString()) ? "": "Este campo es obligatorio y debe ser numérico"
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

  const handleSelectionAlimento = (event, value) => {
    setValues({
      ...values,
      ['alimento']: value 
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
    setCreateAlimento(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Alimento")}*</TLLabel>
        </Grid>
        {recordForEdit == null && 
        <Grid item xs={6}>
          <TLAutocomplete
            name="alimento"
            label={t("Alimento")}
            options={alimentos}
            value={values.alimento}
            isOptionEqualToValue={(option, value) => `${option.nombreEspanol}` === `${value.nombreEspanol}` ||  `${option.nombreIngles}` === `${value.nombreIngles}`}
            onChange={handleSelectionAlimento}
            error={errors.alimento}
          />
        </Grid>}
        {recordForEdit !== null && 
        <Grid item xs={6}>
          <TLTextField 
            name="alimento"
            label={t("Alimento")}
            value={i18n.language === 'es' ? values.alimento.nombreEspanol: values.alimento.nombreIngles}
            readOnly
            error={errors.alimento}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
        }
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("CantidadSemanalDeConsumo")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLTextField 
            name="cantidad"
            label={t("CantidadSemanalDeConsumo")}
            type = "number"
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