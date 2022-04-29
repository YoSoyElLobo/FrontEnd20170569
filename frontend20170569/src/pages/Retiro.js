import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useContext } from 'react';
//Components
import { UserContext } from "../context/UserContext";
import {useForm, Form} from '../components/atoms/TLForm.atom';
import TLPageTitle from "../components/atoms/TLPageTitle.atom";

import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import GOOGLE_CLIENT_ID from '../constants/GoogleClientId.constant'

import TLButton from "../components/atoms/TLButton.atom";
import TLIconButton from "../components/atoms/TLIconButton.atom";
import TLLabel from "../components/atoms/TLLabel.atom";
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

import * as usuarioService from '../services/UsuarioService'




import { useTranslation } from "react-i18next";

const Retiro = () => {
  const {user, setUser} = useContext(UserContext);

  const onLogoutSuccess = () => 
  {
    setUser({});
    history.push('/login')
  }

  const onLogoutFailure = (response) => 
  {
    alert('Failed to log out')
  }

  const {signOut} = useGoogleLogout({
      clientId: GOOGLE_CLIENT_ID,
      onLogoutSuccess,
      onLogoutFailure,
  })

  const initialValues = {
    idUsuario: user.idUsuario,
    motivoRechazo: '',
    
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

  const history = useHistory();
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
    
  }, [])

  const onClick = () => {
    usuarioService.retiro(values, setNotify)
    signOut()
  }

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
      <TLPageTitle sx={{ margin: 2 }}>{t("RetiroSistema")}</TLPageTitle>
    </Grid>
    <Grid width={'80%'} m="auto" sx={{pt: 5, pb: 3}}>
      <Typography align = 'justify' sx = {{fontWeight: 'bold', fontSize: 'medium'}}>
        {t("MensajeRetiro")}
      </Typography>
      
      <Form>
        <Grid container justifyContent="flex-start" alignItems="center" sx={{pt: 1.5, pb: 1.5}}>
          <Grid item xs={12}>
            <TLTextField 
              name="motivoRechazo"
              label={t("IngreseMotivo")}
              value={values.motivoRechazo}
              onChange={handleInputChange}
              error={errors.motivoRechazo}
              inputProps={{ maxLength: 100 }}
              minRows = {5}
              multiline = {true}
              fullWidth
            />
          </Grid>
        </Grid>
      </Form>
      <Grid container alignItems="center" direction = "row-reverse">
        <TLButton label={t('GUARDAR')} variant="contained" sx = {{fontWeight: 'bold'}} onClick = {onClick}/>
      </Grid>
      
    </Grid>
    </>
  );
}

export default Retiro;