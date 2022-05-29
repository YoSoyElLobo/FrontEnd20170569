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

export const ColumnsEstudiosParticipante = (history, language, user) => [
  { field: "idEstudio" , headerName: t("ID"), flex: 0.1, valueGetter: (params) => ('00'+params.row.idEstudio).slice(-2) }, 
  { field: "nombre", headerName: t("NOMBRE"), flex: 0.3, valueGetter: (params) => language === 'es' ? params.row.nombreEspanol : params.nombreIngles},
  { field: "fechaInicio" , headerName: t("FECHAINICIO"), flex: 0.15, headerAlign: 'center', align: 'center',valueGetter: (params) => moment(params.row.fechaInicio).format("DD/MM/yyyy") },
  { field: "fechaFin" , headerName: t("FECHAFIN"), flex: 0.15, headerAlign: 'center', align: 'center',valueGetter: (params) => moment(params.row.fechaFin).format("DD/MM/yyyy") },
  { field: "estado" , headerName: t("ESTADO"), flex: 0.15, headerAlign: 'center', align: 'center',valueGetter: (params) => params.row.listUsuarioEstudio.filter(x => x.usuario.idUsuario === user.idUsuario)[0].aceptado ? t("Aceptado") : t("Pendiente") },
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.15,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLIconButton sx={{ color: '#444444'}}><RemoveRedEyeIcon onClick={() => history.push(`/ver-estudio/${cellValues.row.idEstudio}`)} /></TLIconButton>
        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];