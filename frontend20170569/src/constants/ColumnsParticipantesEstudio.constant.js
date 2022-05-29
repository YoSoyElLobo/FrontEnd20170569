//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLParticipanteForm from '../components/organisms/TLParticipanteForm.organism';
import TLUsuarioForm from '../components/organisms/TLUsuarioForm.organism';
import TLConfirmDeleteUsuario from '../components/organisms/TLConfirmDeleteUsuario.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { t } from 'i18next';
import moment from 'moment'

export const ColumnsParticipantesEstudio = (updateParticipante, setUpdate, update, edit, setUpdateParticipante, deleteParticipante, setTrash, trash, onDelete, setDeleteparticipante, language) => [
  { field: "idUsuario" , headerName: t("ID"), flex: 0.1 , valueGetter: (params) =>  `${params.row.usuario.idUsuario}`}, 
  { field: "codigoMuestra" , headerName: t("CODIGOMUESTRA"), flex: 0.25, valueGetter: (params) => params.row.codigoMuestra ? `${params.row.codigoMuestra}` : t("NoDisponible")}, 
  { field: "fechaMuestreo" , headerName: t("FECHAMUESTREO"), flex: 0.25, valueGetter: (params) => params.row.fechaMuestreo ? moment(params.row.fechaMuestreo).format("DD/MM/yyyy") : t("NoDisponible")}, 
  { field: "estado" , headerName: t("ESTADO"), flex: 0.2, valueGetter: (params) => params.row.aceptado ? t("Aceptado") : t("Pendiente")}, 
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={updateParticipante} update={() => setUpdate(!update)} title={t("EditarParticipante")} button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLParticipanteForm
              update={update}
              recordForEdit={cellValues.row}
              edit={edit}
              setUpdateParticipante={setUpdateParticipante}
            />
          </TLDialog>
          {/*<TLDialog onOk={updateParticipante} update={() => setUpdate(!update)} title={t("VerPerfilParticipante")} button={
          <TLIconButton sx={{ color: '#4444'}}>

            <RemoveRedEyeIcon />
          </TLIconButton>}>
          <TLUsuarioForm
            update={update}
            recordForEdit={cellValues.row}
            addOrEdit={edit}
            setUpdateParticipante={updateParticipante}
          />
          </TLDialog>*/}
        </Grid>        
      );
    },
    sortable: false,
    filterable: false
  }
];