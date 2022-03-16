import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import {useStyles} from '../../styles/atoms/DataGrid.style'

const TLDataGrid = (props) => {
    const classes = useStyles();

    return (
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                className={classes.root}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnMenu = {true}
                {...props}
            />
        </div>
    );
};

export default TLDataGrid;