//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLAlimentoForm from '../components/organisms/TLAlimentoForm.organism';
import TLConfirmDeleteAlimento from '../components/organisms/TLConfirmDeleteAlimento.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const ColumnsAlimentos = (createAlimento, setUpdate, update, addOrEdit, setCreateAlimento, deleteAlimento, setTrash, trash, onDelete, setDeleteAlimento) => [
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
          <TLDialog onOk={createAlimento} update={() => setUpdate(!update)} title="Editar alimento" button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLAlimentoForm
              update={update}
              recordForEdit={cellValues.row}
              addOrEdit={addOrEdit}
              setCreateAlimento={setCreateAlimento}
            />
          </TLDialog>
          <TLDialog onOk={deleteAlimento} trash={() => setTrash(!trash)} title="Eliminar alimento" button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteAlimento 
              trash={trash}
              alimento={cellValues.row}
              onDelete={onDelete}
              setDeleteAlimento={setDeleteAlimento}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];