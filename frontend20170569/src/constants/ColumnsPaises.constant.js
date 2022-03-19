//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLPaisForm from '../components/organisms/TLPaisForm.organism';
import TLConfirmDeletePais from '../components/organisms/TLConfirmDeletePais.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const ColumnsPaises = (createPais, setUpdate, update, addOrEdit, setCreatePais, deletePais, setTrash, trash, onDelete, setDeletePais) => [
  { field: "nombre", headerName: "PAÍS", flex: 0.8 /*, valueGetter: (params) =>  `${params.value}`*/},
  {
    field: "opciones",
    headerName: "ACCIÓN",
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={createPais} update={() => setUpdate(!update)} title="Editar país" button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLPaisForm
              update={update}
              recordForEdit={cellValues.row}
              addOrEdit={addOrEdit}
              setCreatePais={setCreatePais}
            />
          </TLDialog>
          <TLDialog onOk={deletePais} trash={() => setTrash(!trash)} title="Eliminar país" button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeletePais 
              trash={trash}
              pais={cellValues.row}
              onDelete={onDelete}
              setDeletePais={setDeletePais}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];