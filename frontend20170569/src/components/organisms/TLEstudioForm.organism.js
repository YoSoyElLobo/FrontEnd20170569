import React, { useState , useEffect, useContext} from 'react';
import { UserContext } from "../../context/UserContext";
//Components
import {useForm, Form} from '../atoms/TLForm.atom';
import TLLabel from '../atoms/TLLabel.atom';
import TLTextField from '../atoms/TLTextField.atom';
import TLButton from '../atoms/TLButton.atom'
import TLSelection from '../atoms/TLSelection.atom';
import TLDatePicker from '../molecules/TLDatePicker.molecule';

//Mui
import Grid from '@mui/material/Grid';


import {t} from 'i18next';

const initialValues = {
  idEstudio: 0,
  nombreEspanol: '',
  nombreIngles: '',
  descripcionEspañol: '',
  descripcionIngles: '',
  investigador: {
      idUsuario: 0, 
      nombres: '',
      apellidos: ''
  },
  fechaInicio: new Date(),
  fechaFin: new Date(),
  pais:{
      idPais: 0
  },
  latitud: '',
  longitud: '',
  bioma:{
      idBioma: 0,
      nombreEspanol: '',
      nombreIngles: ''
  },
  fuente: '',
  material:{
      idMaterial: 0,
      nombreEspanol: '',
      nombreIngles: ''
  },
  ncbiSampleClassification: '',
  metodoSecuenciacion: '',
  resultados: ''
}

const TLEstudioForm = ({addOrEdit, recordForEdit, setCreateEstudio, update, usuarios, paises, biomas, materiales}) => {

  const {user, setUser} = useContext(UserContext);
  const validate = () => {
    let temp = {}
    console.log(values)
    temp.nombreEspanol = values.nombreEspanol ? "" : t("CampoObligatorio")
    temp.nombreIngles = values.nombreIngles ? "" : t("CampoObligatorio")
    temp.descripcionEspanol = values.descripcionEspanol ? "" : t("CampoObligatorio")
    temp.descripcionIngles = values.descripcionIngles ? "" : t("CampoObligatorio")
    temp.investigador = values.investigador.idUsuario !== 0 ? "" : t("CampoObligatorio")
    temp.pais = values.pais.idPais !== 0 ? "" : t("CampoObligatorio")
    temp.bioma = values.bioma.idBioma !== 0 ? "" : t("CampoObligatorio")
    temp.fuente = values.fuente ? "" : t("CampoObligatorio")
    temp.material = values.bioma.idBioma !== 0 ? "" : t("CampoObligatorio")
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

  const handleSelectionInvestigador = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idUsuario: value,
        nombres: usuarios.filter(x => x.idUsuario === value)[0].nombres,
        apellidos: usuarios.filter(x => x.idUsuario === value)[0].apellidos
      }
    });
  }

  const handleSelectionPais = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idPais: value,
        nombreEspanol: paises.filter(x => x.idPais === value)[0].nombreEspanol,
        nombreIngles: paises.filter(x => x.idPais === value)[0].nombreIngles
      }
    });
  }

  const handleSelectionBioma = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idBioma: value,
        nombreEspanol: biomas.filter(x => x.idBioma === value)[0].nombreEspanol,
        nombreIngles: biomas.filter(x => x.idBioma === value)[0].nombreIngles
      }
    });
  }

  const handleSelectionMaterial = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idMaterial: value,
        nombreEspanol: materiales.filter(x => x.idMaterial === value)[0].nombreEspanol,
        nombreIngles: materiales.filter(x => x.idMaterial === value)[0].nombreIngles
      }
    });
  }

  useEffect(() => {
    console.log(recordForEdit)
    if (recordForEdit !== null){
      setValues({
        ...recordForEdit
      });
    }
  }, [])

  useEffect(() => {
    setCreateEstudio(() => () => handleUpdate())
  }, [update])
  
  return (
    <>
    <Form>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("NombreEspanol")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
          <TLTextField 
            name="nombreEspanol"
            label={t("NombreEspanol")}
            value={values.nombreEspanol}
            onChange={handleInputChange}
            error={errors.nombreEspanol}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("NombreIngles")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
          <TLTextField 
            name="nombreIngles"
            label={t("NombreIngles")}
            value={values.nombreIngles}
            onChange={handleInputChange}
            error={errors.nombreIngles}
            inputProps={{ maxLength: 50 }}
            fullWidth
          />
        </Grid>
      </Grid>
      
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("DescripcionEspanol")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
        <TLTextField
          minRows={3}
          name="descripcionEspanol"
          label={t("DescripcionEspanol")}
          value={values.descripcionEspanol}
          onChange={handleInputChange}
          error={errors.descripcionEspanol}
          fullWidth
          multiline = {true}
        />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("DescripcionIngles")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
        <TLTextField
          minRows={3}
          name="descripcionIngles"
          label={t("DescripcionIngles")}
          value={values.descripcionIngles}
          onChange={handleInputChange}
          error={errors.descripcionIngles}
          fullWidth
          multiline = {true}
        />
        </Grid>
      </Grid>

      {user.rol.idRol === 1 && <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("Investigador")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
          <TLSelection 
            name="investigador"
            label={t("Investigador")}
            menuItems={usuarios}
            value={values.investigador.idUsuario}
            onChange={handleSelectionInvestigador}
            error={errors.investigador}
          />
        </Grid>
      </Grid>}
         
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("FechaInicio")}</TLLabel>
        </Grid>
        <Grid item xs={8}>
          <TLDatePicker
            name="fechaInicio"
            label={t("FechaInicio")}
            value={values.fechaInicio}
            onChange={date => handleInputChange({ target: { value: date, name: 'fechaInicio' } })}
            error={errors.fechaInicio}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("FechaFin")}</TLLabel>
        </Grid>
        <Grid item xs={8}>
          <TLDatePicker
            name="fechaFin"
            label={t("FechaFin")}
            value={values.fechaFin}
            onChange={date => handleInputChange({ target: { value: date, name: 'fechaFin' } })}
            error={errors.fechaFin}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("Pais")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
          <TLSelection 
            name="pais"
            label={t("Pais")}
            menuItems={paises}
            value={values.pais.idPais}
            onChange={handleSelectionPais}
            error={errors.pais}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("Latitud")}</TLLabel>
        </Grid>
        <Grid item xs={8}>
        <TLTextField
          name="latitud"
          label={t("Latitud")}
          value={values.latitud}
          onChange={handleInputChange}
          error={errors.latitud}
          fullWidth
        />
        </Grid>
      </Grid>
      
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("Longitud")}</TLLabel>
        </Grid>
        <Grid item xs={8}>
        <TLTextField
          name="longitud"
          label={t("Longitud")}
          value={values.longitud}
          onChange={handleInputChange}
          error={errors.longitud}
          fullWidth
        />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("Bioma")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
          <TLSelection 
            name="bioma"
            label={t("Bioma")}
            menuItems={biomas}
            value={values.bioma.idBioma}
            onChange={handleSelectionBioma}
            error={errors.bioma}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("Fuente")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
          <TLTextField
            name="fuente"
            label={t("Fuente")}
            value={values.fuente}
            onChange={handleInputChange}
            error={errors.fuente}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("Material")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
          <TLSelection 
            name="material"
            label={t("Material")}
            menuItems={materiales}
            value={values.material.idMaterial}
            onChange={handleSelectionMaterial}
            error={errors.material}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("NCBISampleClassification")}</TLLabel>
        </Grid>
        <Grid item xs={8}>
        <TLTextField
          name="ncbiSampleClassification"
          label={t("NCBISampleClassification")}
          value={values.ncbiSampleClassification}
          onChange={handleInputChange}
          error={errors.ncbiSampleClassification}
          fullWidth
        />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("MetodoSecuenciacion")}</TLLabel>
        </Grid>
        <Grid item xs={8}>
        <TLTextField
          name="metodoSecuenciacion"
          label={t("MetodoSecuenciacion")}
          value={values.metodoSecuenciacion}
          onChange={handleInputChange}
          error={errors.metodoSecuenciacion}
          fullWidth
        />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={4}>
          <TLLabel>{t("Resultados")}</TLLabel>
        </Grid>
        <Grid item xs={8}>
        <TLTextField
          name="resultados"
          label={t("Resultados")}
          value={values.resultados}
          onChange={handleInputChange}
          error={errors.resultados}
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

    <Grid container justifyContent="flex-end" alignItems="center" spacing={2} sx={{pt: 2}}>
      <Grid item>
        <TLButton label={t('GUARDAR')} variant="contained" sx = {{fontWeight: 'bold'}} onClick={handleUpdate}/>
      </Grid>
    </Grid>
  </>
      );
};


export default TLEstudioForm;