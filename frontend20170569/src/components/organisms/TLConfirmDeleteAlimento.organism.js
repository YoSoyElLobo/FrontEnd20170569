import React, { useEffect } from 'react';
//Components
import TLIconButton from '../atoms/TLIconButton.atom';
//Mui
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const TLConfirmDeleteAlimento = ({trash, alimento, onDelete, setDeleteAlimento}) => {

  const handleDelete = () => {
    onDelete(alimento.idAlimento)
    return true
  }

  useEffect(() => {
    setDeleteAlimento(() => () => handleDelete())
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
          <Typography align="center" sx={{ color: 'black', fontSize: '1.5rem'}}>¿Está seguro que desea eliminar este alimento?</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" sx={{pt: 1}}>
        <Grid item>
          <Typography sx={{ color: 'black', fontSize: '1rem'}}>{`${alimento.nombre}`}</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default TLConfirmDeleteAlimento;