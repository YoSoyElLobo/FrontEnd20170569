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

function calcularEdad(fecha) {
  var hoy = new Date();
  var cumpleanos = new Date(fecha);
  var edad = hoy.getFullYear() - cumpleanos.getFullYear();
  var m = hoy.getMonth() - cumpleanos.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
      edad--;
  }
  return edad;
}

export const ColumnsAnadirParticipante = (createParticipante, setUpdate, update, add, setCreateParticipante, language) => [
  { field: "idUsuario" , headerName: t("IDDELPARTICIPANTE"), flex: 0.25}, 
  { field: "sexo" , headerName: t("SEXO"), flex: 0.2, valueGetter: (params) => params.row.sexo === 'M' ? t("Masculino") : t("Femenino")}, 
  { field: "edad", headerName: t("EDAD"), flex: 0.2, valueGetter: params => `${calcularEdad(params.row.fechaNacimiento)}`},
  { field: "pais" , headerName: t("PAIS"), flex: 0.2, valueGetter: (params) => language === 'es' ? params.row.nacionalidad.nombreEspanol : params.row.nacionalidad.nombreIngles}, 
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.15,
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
        </Grid>        
      );
    },
    sortable: false,
    filterable: false
  }
];