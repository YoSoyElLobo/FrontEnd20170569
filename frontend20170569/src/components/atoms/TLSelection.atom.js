import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

import { useTranslation } from 'react-i18next';

const TLSelection = ({ninguno=true, nombre=null ,...props}) => {

  const {t, i18n} = useTranslation();

  let name;

  function getNameValue ( item ) {
    if(item.descripcion !== undefined)
      return item.descripcion
    else if(item.nombre !== undefined)
      return item.nombre
    else if(item.label !== undefined)
      return item.label 
    else if(i18n.language === 'es' && item.nombreEspanol !== undefined)
      return item.nombreEspanol
    else if(i18n.language === 'en' && item.nombreIngles !== undefined)
      return item.nombreIngles
    else if(item.nombres !== undefined && item.apellidos !== undefined)
      return item.nombres + ' ' +item.apellidos
  }

  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel variant="filled" sx={{ color: "inherit" }} >{props.label}</InputLabel>
        <Select
          variant="filled"
          defaultValue={props.defaultValue}
          sx = {{ color: "inherit"}}
          {...props}
        >
          { ninguno ?
          <MenuItem key={0} value={0}>
            <em>{nombre ? nombre : "Todos"}</em>
          </MenuItem> : null}
          {props.menuItems && props.menuItems.map(item => (
            name = getNameValue(item),
            <MenuItem disabled={item.disabled} key={item.id} value={item.id} sx = {{ color: "inherit"}}>{name}</MenuItem>
          ))}
        </Select>
        {props.error && <FormHelperText sx={{color: "#d32f2f"}}>{props.error}</FormHelperText>}
      </FormControl>
    </div>
  );
};


export default TLSelection;