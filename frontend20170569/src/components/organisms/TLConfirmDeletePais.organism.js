import React, { useEffect } from 'react';
//Components
import TLIconButton from '../atoms/TLIconButton.atom';
//Mui
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TLConfirmDeletePais = ({trash, pais, onDelete, setDeletePais}) => {

  const handleDelete = () => {
    onDelete(pais.idPais)
    return true
  }

  useEffect(() => {
    setDeletePais(() => () => handleDelete())
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
          <Typography align="center" sx={{ color: 'black', fontSize: '1.5rem'}}>¿Está seguro que desea eliminar este fármaco?</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{pt: 1}}>
        <Grid item>
          <Typography sx={{ color: 'black', fontSize: '1rem'}}>{`${pais.nombre}`}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default TLConfirmDeletePais;