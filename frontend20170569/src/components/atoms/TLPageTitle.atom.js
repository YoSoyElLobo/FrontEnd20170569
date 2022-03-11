import React from "react";
import { Typography } from "@mui/material";

const TLPageTitle = (props) => {

    return (
        <Typography sx={{ color: 'primary.main', fontWeight: '700', fontSize: '2.25rem'}}>{props.children}</Typography>
    );
};


export default TLPageTitle;