import React from "react";

import Grid from "@mui/material/Grid";

const TLTabPanel = (props) => {

  return (
    <Grid width = {'100%'} 
      role="tabpanel"
      hidden={props.value !== props.index}      
    >
      {props.value === props.index && <Grid sx={{color: "inherit"}} {...props}>
          {props.children}
      </Grid>}
    </Grid>
  );
};


export default TLTabPanel;