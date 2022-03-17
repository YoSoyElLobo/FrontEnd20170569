//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLDeporteForm from '../components/organisms/TLDeporteForm.organism';
import TLConfirmDeleteDeporte from '../components/organisms/TLConfirmDeleteDeporte.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const ColumnsDeportes = (createDeporte, setUpdate, update, addOrEdit, setCreateDeporte, deleteDeporte, setTrash, trash, onDelete, setDeleteDeporte) => [
  { field: "nombre", headerName: "DEPORTE", flex: 0.8 /*, valueGetter: (params) =>  `${params.value}`*/},
  {
    field: "opciones",
    headerName: "ACCIÓN",
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={createDeporte} update={() => setUpdate(!update)} title="Editar deporte" button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLDeporteForm
              update={update}
              recordForEdit={cellValues.row}
              addOrEdit={addOrEdit}
              setCreateDeporte={setCreateDeporte}
            />
          </TLDialog>
          <TLDialog onOk={deleteDeporte} trash={() => setTrash(!trash)} title="Eliminar deporte" button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteDeporte 
              trash={trash}
              deporte={cellValues.row}
              onDelete={onDelete}
              setDeleteDeporte={setDeleteDeporte}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];