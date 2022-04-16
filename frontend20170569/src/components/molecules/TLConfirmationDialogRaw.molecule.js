import React from "react";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import TLButton from "../atoms/TLButton.atom";

const TLConfirmationDialogRaw = (props) => {
  const { onSuccess, onClose, open, onMouseOver, disabledOk=false} = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onSuccess();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: '80%' } , '& .MuiDialogContent-root': { overflowX: 'hidden' }}}
      open={open}
    >
      <DialogTitle sx={{ backgroundColor: 'primary.main', color: 'white'}}>{props.title}</DialogTitle>
      <DialogContent dividers>
        {props.children}
      </DialogContent>
      <DialogActions>
        <TLButton label="Cancelar" onClick={handleCancel}/>
        <TLButton label="Confirmar" variant="contained" onClick={handleOk} onMouseOver={onMouseOver} disabled={disabledOk}/>
      </DialogActions>
    </Dialog>
  );
}

export default TLConfirmationDialogRaw;