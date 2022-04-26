//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLAprobacionConsentimiento from '../components/organisms/TLAprobacionConsentimiento.organism';
import TLRechazoConsentimiento from '../components/organisms/TLRechazoConsentimiento.organism';
import TLConfirmDeleteUsuario from '../components/organisms/TLConfirmDeleteUsuario.organism';
//Mui
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { t } from 'i18next';

export const ColumnsAprobacion = (update, setUpdate, onAprobacion, aprobacionUsuario, setAprobacionUsuario, onRechazo, rechazoUsuario, setRechazoUsuario, language) => [
  { field: "nombreCompleto" , headerName: t("NOMBRE"), flex: 0.3 , valueGetter: (params) =>  `${params.row.nombres + ' ' + params.row.apellidos}`}, 
  { field: "numeroDocumento" , headerName: t("NUMERODOCUMENTO"), flex: 0.3}, 
  { field: "verDocumento" ,
    headerName: t("VERDOCUMENTO"),
    flex: 0.2, 
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLIconButton sx={{ color: '#444444'}}>
              <RemoveRedEyeIcon />
          </TLIconButton>
        </Grid>
      );
    },
    sortable: false,
    filterable: false
  },
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={aprobacionUsuario} update={() => setUpdate(!update)} title={t("AprobarConsentimientoInformado")} button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <CheckIcon />
            </TLIconButton>}>
            <TLAprobacionConsentimiento
              update={update}
              usuario={cellValues.row}
              onAprobacion={onAprobacion}
              setAprobacionUsuario={setAprobacionUsuario}
            />
          </TLDialog>
          <TLDialog onOk={rechazoUsuario} update={() => setUpdate(!update)} title={t("RechazarConsentimientoInformado")} button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <ClearIcon />
            </TLIconButton>}>
            <TLRechazoConsentimiento
              update={update}
              usuario={cellValues.row}
              onRechazo={onRechazo}
              setRechazoUsuario={setRechazoUsuario}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];