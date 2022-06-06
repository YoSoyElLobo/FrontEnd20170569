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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

//Mui
import Grid from '@mui/material/Grid';

const operadores = [
  {id: '<=', idOperador: '<=', label: '≤'},
  {id: '=', idOperador: '=', label: '='},
  {id: '>=', idOperador: '>=', label: '≥'},
]


const initialValues = {
  idFiltro: 0, 
  tipo: {
    idTipo: 0,
    nombreEspanol: '',
    nombreIngles: '' 
  },
  objeto: {
    idObjeto: 0,
    nombreEspanol: '',
    nombreIngles: ''
  },
  operadorFecha: {
    idOperador: '<=',
    label: "≤"
  },
  operadorNumero:{
    idOperador: '<=',
    label: "≤"
  },
  numero: '',
  sexo: 'M',
  estado: undefined,
  fecha: new Date(),
  frecuencia:{
    idFrecuencia: 0,
    nombreEspanol: '',
    nombreIngles: ''
  }
}

const TLFiltrosForm = ({addOrEdit, recordForEdit, setCreateFiltro, tipos, update, enfermedades, farmacos, deportes, alimentos, paises, counter, frecuencias}) => {

  const {t, i18n} = useTranslation();
  const {user, setUser} = useContext(UserContext);


  const validate = () => {
    values.idFiltro = counter;
    /*values.usuario.idUsuario = user.idUsuario
    let temp = {}
    console.log(values)

    temp.farmaco = values.farmaco.idFarmaco !== 0 ? "" : "Este campo es obligatorio"
    temp.dosis = values.dosis && (/^[0-9\b]+$/).test(values.dosis.toString()) ? "": "Este campo es obligatorio y debe ser numérico"
    temp.cantidad = values.cantidad && (/^[0-9\b]+$/).test(values.cantidad.toString()) ? "": "Este campo es obligatorio y debe ser numérico"
    temp.frecuencia = values.frecuencia.idFrecuencia !== 0 ? "" : "Este campo es obligatorio"
    setErrors({
      ...temp
    })

    return Object.values(temp).every(x => x === "")*/
    return true
  }

  function getLabel(idTipo){
    switch (idTipo){
      case 1: return t("Enfermedad");
      case 2: return t("Farmaco");
      case 3: return t("Deporte");
      case 4: return t("GrupoAlimenticio");
      case 5: return t("Pais");
      case 6: return t("Sexo");
      case 7: return t("Edad");
      case 8: return t("Peso");
      case 9: return t("Talla");
    }
  }

  function getDateLabel(idTipo){
    switch (idTipo){
      case 1: case 2: return t("FechaDiagnostico");
    }
  }
  function getNumberLabel(idTipo){
    switch (idTipo){
      case 2: return t("Dosis");
      case 4: return t("CantidadSemanalDeConsumo")
      case 7: return t("Edad");
      case 8: return t("Peso");
      case 9: return t("Talla");      
    }
  }


  function getOptions(idTipo){
    switch (idTipo){
      case 1: return enfermedades;
      case 2: return farmacos;
      case 3: return deportes;
      case 4: return alimentos;
      case 5: return paises;
    }
  }

  const handleSelectionTipo = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idTipo: value,
        nombreEspanol: tipos.filter(x => x.idTipo === value)[0].nombreEspanol,
        nombreIngles: tipos.filter(x => x.idTipo === value)[0].nombreIngles
      }
    });
  }

  const handleSelectionOperador = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idOperador: value,
        label: operadores.filter(x => x.idOperador === value)[0].label,
      }
    });
  }

  const handleSelectionFrecuencia = e => {
    const {name, value} = e.target;
    setValues({
      ...values,
      [name]: {
        ...values[name],
        idFrecuencia: value,
        nombreEspanol: frecuencias.filter(x => x.idFrecuencia === value)[0].nombreEspanol,
        nombreIngles: frecuencias.filter(x => x.idFrecuencia === value)[0].nombreIngles,
      }
    });
  }

  const handleSelectionObjeto = (event, value) => {
    setValues({
      ...values,
      ['objeto']: value 
    });
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
    setCreateFiltro(() => () => handleUpdate())
  }, [update])
  
  return (
    <Form>
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Tipo")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLSelection 
            name="tipo"
            label={t("Tipo")}
            menuItems={tipos}
            value={values.tipo.idTipo}
            onChange={handleSelectionTipo}
            error={errors.tipo}
          />
        </Grid>
      </Grid>
      {[1,2,3,4,5].some(x=>x === values.tipo.idTipo) && 
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{getLabel(values.tipo.idTipo)}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLAutocomplete
            name="objeto"
            label={getLabel(values.tipo.idTipo)}
            options={getOptions(values.tipo.idTipo)}
            value={values.objeto}
            isOptionEqualToValue={(option, value) => `${option.nombreEspanol}` === `${value.nombreEspanol}` ||  `${option.nombreIngles}` === `${value.nombreIngles}`}
            onChange={handleSelectionObjeto}
            error={errors.objeto}
          />
        </Grid>
      </Grid>}

      {[1].some(x=>x === values.tipo.idTipo) &&
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Estado")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <RadioGroup
            name="estado"
            //defaultValue={"M"}
            value = {values.estado}
            onChange={handleInputChange}
            row>
            <FormControlLabel value={true} control={<Radio />} label={t("Activa")} />
            <FormControlLabel value={false} control={<Radio />} label={t("Inactiva")} />
          </RadioGroup>
        </Grid>
      </Grid>}

      {[2,4,7,8,9].some(x=>x === values.tipo.idTipo) && 
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{getNumberLabel(values.tipo.idTipo)}*</TLLabel>
        </Grid>
        <Grid item xs={2} sx={{pr: 1}}>
          <TLSelection
            name="operadorNumero"
            label={t("Operador")}
            menuItems={operadores}
            value={values.operadorNumero.idOperador}
            onChange={handleSelectionOperador}
            error={errors.operador}
          />
        </Grid>
        <Grid item xs={4}>
          <TLTextField 
            name="numero"
            label={getNumberLabel(values.tipo.idTipo)}
            type = "number"
            value={values.numero}
            onChange={handleInputChange}
            error={errors.numero}
            inputProps={{ maxLength: 100 }}
            fullWidth
          />
        </Grid>
      </Grid>}

      {[1,2].some(x=>x === values.tipo.idTipo) && 
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{getDateLabel(values.tipo.idTipo)}*</TLLabel>
        </Grid>
        <Grid item xs={2} sx={{pr: 1}}>
          <TLSelection
            name="operadorFecha"
            label={t("Operador")}
            menuItems={operadores}
            value={values.operadorFecha.idOperador}
            onChange={handleSelectionOperador}
            error={errors.operador}
          />
        </Grid>
        <Grid item xs={4}>
          <TLDatePicker
            name="fecha"
            label={getDateLabel(values.tipo.idTipo)}
            value={values.fecha}
            onChange={date => handleInputChange({ target: { value: date, name: 'fecha' } })}
            error={errors.fecha}
          />
        </Grid>
      </Grid>}

      {[6].some(x=>x === values.tipo.idTipo) &&
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Sexo")}*</TLLabel>
        </Grid>
        <Grid item xs={6} sx={{px: 1}}>
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
      </Grid>}

      {[3].some(x=>x === values.tipo.idTipo) && 
      <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
        <Grid item xs={6}>
          <TLLabel>{t("Frecuencia")}*</TLLabel>
        </Grid>
        <Grid item xs={6}>
          <TLSelection
            name="frecuencia"
            label={t("Frecuencia")}
            menuItems={frecuencias}
            value={values.frecuencia.idFrecuencia}
            onChange={handleSelectionFrecuencia}
            error={errors.frecuencia}
          />
        </Grid>
      </Grid>
      }
      
      <Grid container justifyContent="flex-end" alignItems="center" sx={{pt: 1.5}}>
        <Grid item>
          <TLLabel>*{t('CamposObligatorios')}</TLLabel>
        </Grid>
      </Grid>
    </Form>
  );
};


export default TLFiltrosForm;