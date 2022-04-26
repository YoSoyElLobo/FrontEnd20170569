//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLConfirmDeleteUsuario from '../components/organisms/TLConfirmDeleteUsuario.organism';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


import { t } from 'i18next';

export const ColumnsEstudiosAdministracion = (createUsuario, setUpdate, update, addOrEdit, setCreateUsuario, deleteUsuario, setTrash, trash, onDelete, setDeleteUsuario, roles, history, language) => [
  { field: "idEstudio" , headerName: t("ID"), flex: 0.1}, 
  { field: "investigador" , headerName: t("INVESTIGADOR"), flex: 0.4, valueGetter: (params) =>  `${params.row.investigador.nombres + ' ' + params.row.investigador.apellidos}`},
  { field: "estado", headerName: t("ESTADO"), flex: 0.2, valueGetter: (params) => params.row.enCurso ? t("EnCurso") : t("Finalizado")}, 
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.3,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLIconButton sx={{ color: '#444444'}}><RemoveRedEyeIcon onClick={() => history.push('/crear-estudio')} /></TLIconButton>
          <TLIconButton sx={{ color: '#00467E'}}><EditIcon onClick={() => history.push('/crear-estudio')} /></TLIconButton> 
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