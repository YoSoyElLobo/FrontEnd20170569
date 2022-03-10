import React from "react";
import Button from '@mui/material/Button';

const BCButton = (props) => {

    return (
        <Button {...props}>{props.label}</Button>
    );
};


export default BCButton;