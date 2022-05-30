//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLConfirmAddParticipante from '../components/organisms/TLConfirmAddParticipante.organism';
import TLPerfilForm from '../components/organisms/TLPerfilForm.organism';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import { t } from 'i18next';
import moment from 'moment'

export const ColumnsAnadirParticipante = (createParticipante, setUpdate, update, add, setCreateParticipante, language) => [
  { field: "idUsuario" , headerName: t("ID"), flex: 0.1}, 
  { field: "numeroDocumento" , headerName: t("NUMERODOCUMENTO"), flex: 0.4}, 
  { field: "pais" , headerName: t("PAIS"), flex: 0.3, valueGetter: (params) => language === 'es' ? params.row.nacionalidad.nombreEspanol : params.row.nacionalidad.nombreIngles}, 
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={createParticipante} update={() => setUpdate(!update)} title={t("VerPerfil")} button={
            <TLIconButton sx={{ color: '#444444'}}>
              <RemoveRedEyeIcon />
            </TLIconButton>}>
            <TLPerfilForm
              update={update}
              recordForEdit={cellValues.row}
              setCreateParticipante={setCreateParticipante}
            />
          </TLDialog> 
          <TLDialog onOk={createParticipante} update={() => setUpdate(!update)} title={t("AnadirParticipante")} button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <AddIcon />
            </TLIconButton>}>
            <TLConfirmAddParticipante
              update={update}
              usuario={cellValues.row}
              add={add}
              setCreateParticipante={setCreateParticipante}
            />
          </TLDialog>
          
          {/*<TLDialog onOk={updateParticipante} update={() => setUpdate(!update)} title={t("EditarParticipante")} button={
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