//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLUsuarioForm from '../components/organisms/TLUsuarioForm.organism';
import TLConfirmDeleteUsuario from '../components/organisms/TLConfirmDeleteUsuario.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { t } from 'i18next';

export const ColumnsUsuarios = (createUsuario, setUpdate, update, addOrEdit, setCreateUsuario, deleteUsuario, setTrash, trash, onDelete, setDeleteUsuario, roles, language) => [
  { field: "nombreCompleto" , headerName: t("NOMBRE"), flex: 0.3 , valueGetter: (params) =>  `${params.row.nombres + ' ' + params.row.apellidos}`}, 
  { field: "numeroDocumento" , headerName: t("NUMERODOCUMENTO"), flex: 0.3}, 
  { field: "rol" , headerName: t("ROL"), flex: 0.2, valueGetter: (params) => `${language === 'es' ? params.row.rol.nombreEspanol : params.row.rol.nombreIngles}` }, 
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={createUsuario} update={() => setUpdate(!update)} title={t("EditarUsuario")} button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLUsuarioForm
              update={update}
              recordForEdit={cellValues.row}
              addOrEdit={addOrEdit}
              setCreateUsuario={setCreateUsuario}
              roles = {roles}
            />
          </TLDialog>
          <TLDialog onOk={deleteUsuario} trash={() => setTrash(!trash)} title={t("EliminarUsuario")} button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteUsuario 
              trash={trash}
              usuario={cellValues.row}
              onDelete={onDelete}
              setDeleteUsuario={setDeleteUsuario}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];