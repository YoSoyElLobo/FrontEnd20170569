//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLConfirmDeleteUsuario from '../components/organisms/TLConfirmDeleteUsuario.organism';

//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import moment from 'moment';
import { t } from 'i18next';

export const ColumnsEstudiosInvestigador = (createUsuario, setUpdate, update, addOrEdit, setCreateUsuario, deleteUsuario, setTrash, trash, onDelete, setDeleteUsuario, roles, history, language) => [
  { field: "idEstudio" , headerName: t("ID"), flex: 0.1}, 
  { field: "fechaInicio" , headerName: t("FECHAINICIO"), flex: 0.35, headerAlign: 'center', align: 'center',valueGetter: (params) => moment(params.row.fechaInicio).format("DD/MM/yyyy") },
  { field: "fechaFin" , headerName: t("FECHAFIN"), flex: 0.35, headerAlign: 'center', align: 'center',valueGetter: (params) => moment(params.row.fechaFin).format("DD/MM/yyyy") },
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLIconButton sx={{ color: '#444444'}}><RemoveRedEyeIcon onClick={() => history.push('/crear-estudio')} /></TLIconButton>
        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];