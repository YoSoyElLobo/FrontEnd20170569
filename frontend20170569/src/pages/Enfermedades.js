import React from "react";
import { useState, useEffect } from "react";
//Components
import TLPageTitle from "../components/atoms/TLPageTitle.atom";
import TLDataGrid from "../components/atoms/TLDataGrid.atom";
import TLButton from "../components/atoms/TLButton.atom";
import TLIconButton from "../components/atoms/TLIconButton.atom";
import TLNotification from '../components/molecules/TLNotification.molecule';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLEnfermedadForm from "../components/organisms/TLEnfermedadForm.organism";
//Constants
import { ColumnsEnfermedades } from '../constants/ColumnsEnfermedades.constant';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
/*//Service
import * as cicloService from '../../services/CicloService';*/

const Enfermedades = () => {

  const [records, setRecords] = useState(null);
  const [createEnfermedad, setCreateEnfermedad] = useState(null)
  const [deleteEnfermedad, setDeleteEnfermedad] = useState(null)
  const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
  const [update, setUpdate] = useState(false);
  const [trash, setTrash] = useState(false);
  

  const rows = [
    { id: 1, nombre: 'Hipertensión'},
    { id: 2, nombre: 'Osteoporosis'},
    { id: 3, nombre: 'Gastritis'},
    { id: 4, nombre: 'Diabetes'},
    { id: 5, nombre: 'Fibromialgia'},
    { id: 6, nombre: 'Hemofilia'},
    { id: 7, nombre: 'Meningitis'},
    { id: 8, nombre: 'Asma'},
    { id: 9, nombre: 'Ántrax'}, 
    { id: 9, nombre: 'Mononucleosis'}
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
      <TLPageTitle sx={{ margin: 2 }}>Gestión de enfermedades</TLPageTitle>
      <Grid container xs={12} justifyContent="flex-end" alignItems="center" spacing={2} sx={{pt: 4}}>
        <Grid item>
          <TLDialog title="Agregar enfermedad" onOk={createEnfermedad} update={() => setUpdate(!update)} button={<TLIconButton sx={{ color: '#727272', position: 'absolute', right: '10px'}}><AddIcon /></TLIconButton>}>
            <TLEnfermedadForm
              update={update}
              recordForEdit={null}
              addOrEdit={addOrEdit}
              setCreateEnfermedad={setCreateEnfermedad}
            />
        </TLDialog>
        </Grid>
      </Grid>
      <Grid xs={12} sx={{pt: 3}}>
        <TLDataGrid 
          rows={records ? records : []}
          columns={ColumnsEnfermedades(createEnfermedad, setUpdate, update, addOrEdit, setCreateEnfermedad, deleteEnfermedad, setTrash, trash, onDelete, setDeleteEnfermedad)}
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

export default Enfermedades;