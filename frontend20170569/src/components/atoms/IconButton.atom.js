import React from "react";
import IconButton from '@mui/material/IconButton';

const BCIconButton = (props) => {

    return (
        <IconButton {...props}>{props.children}</IconButton>
    );
    
};
export default BCIconButton;