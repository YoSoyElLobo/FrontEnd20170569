import React from "react";
import { useState, useEffect } from "react";
//Components
import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLNotification from '../components/molecules/TLNotification.molecule';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLEnfermedadForm from "../components/organisms/TLEnfermedadForm.organism";
//Constants
import { ColumnsFarmacos } from '../constants/ColumnsFarmacos.constant';
//Mui
import Grid from '@mui/material/Grid';
/*//Service
import * as cicloService from '../../services/CicloService';*/

const Farmacos = () => {

  const [records, setRecords] = useState(null);
  const [createFarmaco, setCreateFarmaco] = useState(null)
  const [deleteFarmaco, setDeleteFarmaco] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
  

  const rows = [
    { id: 1, nombre: 'Quazepam'},
    { id: 2, nombre: 'Quetiapina'},
    { id: 3, nombre: 'Pantoprazol'},
    { id: 4, nombre: 'Quinapril'},
    { id: 5, nombre: 'Quinidina'},
    { id: 6, nombre: 'Quinina'},
    { id: 7, nombre: 'Paracetamol'},
    { id: 8, nombre: 'Penicilamina'},
    { id: 9, nombre: 'Pentobarbital'}
  ];

  

  useEffect(() => {
    setRecords(rows);
  }, [])

  const addOrEdit = (data, resetForm) => {
    /*if (data.idCiclo === 0)
      cicloService.insertCiclo(data, records, setRecords, setNotify);
    else
      cicloService.updateCiclo(data, records, setRecords, setNotify);*/
    resetForm()
  }

  const onDelete = (id) => {
    //cicloService.deleteCiclo(id, records, setRecords, setNotify);
    console.log('Hola')
  }

  return (
    <Grid width={'80%'} m="auto" sx={{pt: 5}}>
      <TLPageTitle sx={{ margin: 2 }}>Gestión de fármacos</TLPageTitle>
      <Grid container xs={12} justifyContent="flex-end" alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item>
          <TLDialog title="Agregar enfermedad" onOk={createFarmaco} update={() => setUpdate(!update)} button={<TLButton label='Agregar ciclo' variant="contained"/>}>
            <TLEnfermedadForm
              update={update}
              recordForEdit={null}
              addOrEdit={addOrEdit}
              setCreateFarmaco={setCreateFarmaco}
            />
        </TLDialog>
        </Grid>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={records ? records : []}
          columns={ColumnsFarmacos(createFarmaco, setUpdate, update, addOrEdit, setCreateFarmaco, deleteFarmaco, setTrash, trash, onDelete, setDeleteFarmaco)}
          disableSelectionOnClick
          />
      </Grid>
      <TLNotification 
        notify={notify}
        setNotify={setNotify}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        />
    </Grid>
  );
}

export default Farmacos;