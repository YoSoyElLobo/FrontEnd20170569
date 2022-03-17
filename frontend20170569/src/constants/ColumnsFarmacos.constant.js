//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLFarmacoForm from '../components/organisms/TLFarmacoForm.organism';
import TLConfirmDeleteFarmaco from '../components/organisms/TLConfirmDeleteFarmaco.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const ColumnsFarmacos = (createFarmaco, setUpdate, update, addOrEdit, setCreateFarmaco, deleteFarmaco, setTrash, trash, onDelete, setDeleteFarmaco) => [
  { field: "nombre", headerName: "FÁRMACO", flex: 0.8 /*, valueGetter: (params) =>  `${params.value}`*/},
  {
    field: "opciones",
    headerName: "ACCIÓN",
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={createFarmaco} update={() => setUpdate(!update)} title="Editar farmaco" button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLFarmacoForm
              update={update}
              recordForEdit={cellValues.row}
              addOrEdit={addOrEdit}
              setCreateFarmaco={setCreateFarmaco}
            />
          </TLDialog>
          <TLDialog onOk={deleteFarmaco} trash={() => setTrash(!trash)} title="Eliminar farmaco" button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteFarmaco 
              trash={trash}
              farmaco={cellValues.row}
              onDelete={onDelete}
              setDeleteFarmaco={setDeleteFarmaco}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];