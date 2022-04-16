import React from 'react'

//MUI
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

//TextField
import TLTextField from '../atoms/TLTextField.atom';

const TLDatePicker = (props) => {
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          views={props.views}
          renderInput={(props) => <TLTextField fullWidth {...props} {...(props.error && {error:true, helperText: props.error})}/>}
          label="Seleccione la fecha: "
          value = {props.value}
          onChange = {props.onChange}
          minDate = {props.minDate}
          readOnly = {props.readOnly}
          inputFormat = {props.inputFormat ? props.inputFormat : "DD/MM/YYYY"}
          disabled = {props.disabled}
        />
      </LocalizationProvider>
    )
}



export default TLDatePicker;