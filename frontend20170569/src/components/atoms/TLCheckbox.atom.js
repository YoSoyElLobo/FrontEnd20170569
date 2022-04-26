import React from "react";
import Checkbox from "@mui/material/Checkbox";

const BCCheckbox = (props) => {
    
    return (
        <Checkbox {...props}>{props.label}</Checkbox>
    );
};


export default BCCheckbox;