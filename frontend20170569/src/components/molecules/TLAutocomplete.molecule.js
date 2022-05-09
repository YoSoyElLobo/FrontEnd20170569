import React from 'react'
import { useTranslation } from 'react-i18next';


import TLTextField from "../atoms/TLTextField.atom";

import Autocomplete from "@mui/material/Autocomplete";
import FormHelperText from '@mui/material/FormHelperText';



const TLAutocomplete = ({ninguno=true, nombre=null ,...props}) => {
  
  const {t, i18n} = useTranslation();

  const [inputValue, setInputValue] = React.useState('');

  function getNameValue (option) {
    if(option.descripcion !== undefined)
      return option.descripcion
    else if(option.nombre !== undefined)
      return option.nombre
    else if(option.label !== undefined)
      return option.label 
    else if(i18n.language == 'es' && option.nombreEspanol !== undefined)
      return option.nombreEspanol
    else if(i18n.language == 'en' && option.nombreIngles !== undefined)
      return option.nombreIngles
    else if(option.nombres !== undefined && option.apellidos !== undefined)
      return option.nombres + ' ' +option.apellidos
  }

  return (
    <div>
      <Autocomplete
        variant="filled"
        sx={{color: "inherit"}}
        getOptionLabel = {(option) => getNameValue(option)}
        options={props.options}
        renderInput={(params) => <TLTextField {...params} label={props.label}/>}
        {...props}
      />
      {props.error && <FormHelperText sx={{color: "#d32f2f"}}>{props.error}</FormHelperText>}
    </div>
    );
}

export default TLAutocomplete;