import React, { useState } from "react";
import TLConfirmationDialogRaw from "../molecules/TLConfirmationDialogRaw.molecule";

const TLDialog = ( {disabledOk = false,...props} ) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    if(props.onOk){
      if(await props.onOk())
        setOpen(false);
    }
    else{
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseOver = () => {
    if (props.update){
      props.update()
    }
  };

  return (
  	<>
		  {React.cloneElement(props.button, {onClick: handleOpen})}
      <TLConfirmationDialogRaw
        disabledOk = {disabledOk}
        keepMounted
        open={open}
        onSuccess={handleOk}
        onClose={handleClose}
        onMouseOver={handleMouseOver}
				{...props}
      >
        {props.children}
      </TLConfirmationDialogRaw>
    </>
  );
}

export default TLDialog;