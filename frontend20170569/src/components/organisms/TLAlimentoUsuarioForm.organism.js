import React, { useState , useEffect } from 'react';
import { useContext } from 'react';
//Components
import { UserContext } from "../../context/UserContext";
import {useForm, Form} from '../atoms/TLForm.atom';
import TLLabel from '../atoms/TLLabel.atom';
import TLTextField from '../atoms/TLTextField.atom';
import TLSelection from '../atoms/TLSelection.atom';

//Mui
import Grid from '@mui/material/Grid';

import {t} from 'i18next';

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

  const handleSelection = e => {

    const {name, value} = e.target;
    /*console.log(name)
    console.log(roles.filter(x => x.idRol === value)[0].nombreEspanol)
    console.log(roles.filter(x => x.idRol === value)[0].nombreIngles)*/
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idAlimento: value,
        nombreEspanol: alimentos.filter(x => x.idAlimento === value)[0].nombreEspanol,
        nombreIngles: alimentos.filter(x => x.idAlimento === value)[0].nombreIngles
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