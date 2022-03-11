import React from "react";
import { Typography } from "@mui/material";

const TLLabel = (props) => {

    return (
        <Typography variant="body1" sx={{ marginLeft: props.marginLeft,  fontSize: props.fontSize && props.fontSize , color: props.color ? props.color : 'primary.main', fontWeight: props.fontWeight ? props.fontWeight : 'normal'}}>{props.children}</Typography>
    );
};


export default TLLabel;