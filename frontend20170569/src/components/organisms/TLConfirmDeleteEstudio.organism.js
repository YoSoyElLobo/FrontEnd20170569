import React, { useEffect } from 'react';
//Components
import TLIconButton from '../atoms/TLIconButton.atom';
//Mui
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useTranslation } from 'react-i18next';

const TLConfirmDeleteEstudio = ({trash, estudio, onDelete, setDeleteEstudio}) => {

  const {t, i18n} = useTranslation();

  const handleDelete = () => {
    onDelete(estudio.idEstudio)
    return true
  }

  useEffect(() => {
    setDeleteEstudio(() => () => handleDelete())
  }, [trash])

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <TLIconButton disableRipple sx={{ color: 'primary.main'}}>
            <DeleteForeverIcon sx={{ fontSize: 70 }} />
          </TLIconButton>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{pt: 1}}>
        <Grid item>
          <Typography align="center" sx={{ color: 'black', fontSize: '1.5rem'}}>{t("ConfirmEliminarEstudio")}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{pt: 1}}>
        <Grid item>
          <Typography sx={{ color: 'black', fontSize: '1rem'}}>{`${t("Nombre")}: ${i18n.language === 'es' ? estudio.nombreEspanol: estudio.nombreIngles} `}</Typography>
          <Typography sx={{ color: 'black', fontSize: '1rem'}}>{`${t("Investigador")}: ${estudio.investigador.nombres} ${estudio.investigador.apellidos}`}</Typography>          
        </Grid>
      </Grid>
    </>
  )
}

export default TLConfirmDeleteEstudio;