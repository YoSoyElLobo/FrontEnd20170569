import React from "react";
import Button from '@mui/material/Button';

const TLButton = (props) => {

  return (
    <Button {...props}>{props.label}</Button>
  );
};


export default TLButton;