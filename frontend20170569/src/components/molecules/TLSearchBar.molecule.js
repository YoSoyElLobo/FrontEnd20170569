import React from "react";
import { InputAdornment } from '@mui/material';
import TLTextField from "../atoms/TLTextField.atom";
import SearchIcon from '@mui/icons-material/Search';

const BCSearchBar = (props) => {

    return (
        <TLTextField 
            InputProps= {{
              endAdornment: (
                <InputAdornment position="end">
                    <SearchIcon sx={{ color: 'primary.main'}} />
                </InputAdornment>)
            }}
            {...props}
        />
    );
};

export default BCSearchBar;