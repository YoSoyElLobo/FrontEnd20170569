import React from "react";
import { useState, useEffect } from "react";
//Components
import {useForm, Form} from '../components/atoms/TLForm.atom';
import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLIconButton from "../components/atoms/TLIconButton.atom";
import TLLabel from "../components/atoms/TLLabel.atom";
import TLSelection from "../components/atoms/TLSelection.atom";
import TLNotification from '../components/molecules/TLNotification.molecule';
import TLTextField from "../components/atoms/TLTextField.atom";
import TLDialog from '../components/organisms/TLDialog.organism';
import TLDeporteForm from "../components/organisms/TLDeporteForm.organism";
import TLSearchBar from '../components/molecules/TLSearchBar.molecule';
import TLFileUpload from "../components/organisms/TLFileUploadValues.organism";
//Constants
import { ColumnsDeportes } from '../constants/ColumnsDeportes.constant';
//Mui
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';

import * as paisService from '../services/PaisService';

import { useTranslation } from "react-i18next";

const Confidencialidad = () => {

  const initialValues = {
    idUsuario: 0,
    nombres: '',
    apellidos: '',
    pais: {
      idPais: 0, 
      nombreEspanol: '' ,
      nombreIngles: ''   
    }
  }

  const handleSelection = e => {
    console.log(paises)
    const {name, value} = e.target;
    console.log(name)
    console.log(paises.filter(x => x.idPais === value)[0].nombreEspanol)
    console.log(paises.filter(x => x.idPais === value)[0].nombreIngles)
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

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  }=useForm(initialValues);


  const {t, i18n} = useTranslation();

  const [paises, setPaises] = useState(null);
  const [recordsFiltered, setRecordsFiltered] = useState(null);
  const [search, setSearch] = useState("");

  const [createDeporte, setCreateDeporte] = useState(null)
  const [deleteDeporte, setDeleteDeporte] = useState(null)
  const [loadBulkUsers, setLoadBulkUsers] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
   

  useEffect(() => {
    paisService.getPais(setPaises);
  }, [])

  /*const addOrEdit = (data, resetForm) => {
    if (data.idDeporte === 0)
      deporteService.insertDeporte(data, setRecords, setRecordsFiltered, setNotify);
    else
      deporteService.updateDeporte(data, setRecords, setRecordsFiltered, setNotify);
    resetForm()
  }

  const onDelete = (idDeporte) => {
    deporteService.deleteDeporte(idDeporte, setRecords, setRecordsFiltered, setNotify);
  }

  const handleSearch = e => {
    let value = e.target.value.toLowerCase();
    setSearch(value);
    let filtered
    if (value === "")
      filtered = records;
    else
    filtered = records.filter(x => `${x.nombreEspanol}`.toLowerCase().includes(value) || `${x.nombreIngles}`.toLowerCase().includes(value))
    setRecordsFiltered(filtered)
  }*/

  return (
    <>
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLPageTitle sx={{ margin: 2 }}>{t("Confidencialidad")}</TLPageTitle>
    </Grid>
    <Grid width={'80%'} m="auto" sx={{pt: 5, pb: 3}}>
      <Typography align = 'justify' sx = {{fontWeight: 'bold'}}>
        {t("MensajeConfidencialidad")}
      </Typography>
      <Typography align = 'justify' sx = {{fontWeight: 'bold'}}>
      {t('DescargueFormato')} <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/tesis20170569.appspot.com/o/PlantillaUsuario.xlsx?alt=media&token=9c0ed9a7-ed91-4f86-a17e-b51dcc10d840">{t('aqui')}</a> 
      </Typography>
      <Form>
        <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
          <Grid item xs={4}>
            <TLLabel>{t("Nombres")}*</TLLabel>
          </Grid>
          <Grid item xs={8}>
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
        <Grid item xs={4}>
          <TLLabel>{t("Apellidos")}*</TLLabel>
        </Grid>
        <Grid item xs={8}>
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
        <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5}}>
          <Grid item xs={4}>
            <TLLabel>{t("NumeroDocumento")}*</TLLabel>
          </Grid>
          <Grid item xs={8}>
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
          <Grid item xs={4}>
            <TLLabel>{t("Pais")}*</TLLabel>
          </Grid>
          <Grid item xs={8}>
            <TLSelection 
              name="pais"
              label={t("Pais")}
              menuItems={paises}
              value={values.pais.idPais}
              onChange={handleSelection}
              error={errors.idPais}
            />
          </Grid>
        </Grid>

      </Grid>
      </Form>
      <TLFileUpload setSave={setLoadBulkUsers} service={paisService.loadBulkPais} accept={'.pdf'} maxFiles={1}/>
    </Grid>
    </>
  );
}

export default Confidencialidad;