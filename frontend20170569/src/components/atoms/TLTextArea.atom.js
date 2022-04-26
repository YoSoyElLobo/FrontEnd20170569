import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const TLTextArea = (props) => {

    return (
      <TextareaAutosize variant='filled' {...props} {...(props.error && {error:true, helperText: props.error})} />
    );
}

export default TLTextArea;