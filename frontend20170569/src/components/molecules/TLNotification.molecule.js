import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import TLAlert from '../atoms/TLAlert.atom';

const TLNotification = ( props ) => {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway')
      return;
    
    props.setNotify({
      ...props.notify,
      isOpen: false
    })
  }

  return (
    <>
      <Snackbar
        open={props.notify.isOpen}
        onClose={handleClose}
        {...props}
      >
        <TLAlert 
          severity={props.notify.type}
          onClose={handleClose}
          sx={{ width: '100%' }}
        >
          {props.notify.message}
        </TLAlert>
      </Snackbar>
    </>
  )
}
export default TLNotification;