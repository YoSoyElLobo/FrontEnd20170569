import React from "react";
import { TextField } from "@mui/material";

const BCTextField = (props) => {

    return (
        <TextField variant='filled' {...props} {...(props.error && {error:true, helperText: props.error})} />
    );
};


export default BCTextField;