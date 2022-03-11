import React from "react";
import IconButton from '@mui/material/IconButton';

const TLIconButton = (props) => {

  return (
    <IconButton {...props}>{props.children}</IconButton>
  );
    
};
export default TLIconButton;