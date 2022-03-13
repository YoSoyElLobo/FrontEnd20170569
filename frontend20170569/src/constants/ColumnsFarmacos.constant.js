//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLEnfermedadForm from '../components/organisms/TLEnfermedadForm.organism';
import TLConfirmDeleteFarmaco from '../components/organisms/TLConfirmDeleteFarmaco.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const ColumnsFarmacos = (createFarmaco, setUpdate, update, addOrEdit, setCreateFarmaco, deleteFarmaco, setTrash, trash, onDelete, setDeleteFarmaco) => [
  { field: "descripcion", headerName: "FÁRMACO", flex: 1, valueGetter: (params) =>`${params.row.nombre}`},
  {
    field: "opciones",
    headerName: "ACCIÓN",
    flex: 0.4,
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={createFarmaco} update={() => setUpdate(!update)} title="Editar enfermedad" button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLEnfermedadForm
              update={update}
              recordForEdit={cellValues.row}
              addOrEdit={addOrEdit}
              setCreateFarmaco={setCreateFarmaco}
            />
          </TLDialog>
          <TLDialog onOk={deleteFarmaco} trash={() => setTrash(!trash)} title="Eliminar enfermedad" button={
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