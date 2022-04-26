//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLEnfermedadUsuarioForm from '../components/organisms/TLEnfermedadUsuarioForm.organism';
import TLConfirmDeleteEnfermedad from '../components/organisms/TLConfirmDeleteEnfermedad.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { t } from 'i18next';

import moment from 'moment'

      
export const ColumnsUsuarioEnfermedades = (createEnfermedad, setUpdate, update, addOrEdit, setCreateEnfermedad, deleteEnfermedad, setTrash, trash, onDelete, setDeleteEnfermedad, enfermedades, language) => [
  { field: "nombre" , headerName: t("NOMBRE") , flex: 0.3, valueGetter: (params) =>  `${language === 'es' ? params.row.enfermedad.nombreEspanol : params.row.enfermedad.nombreIngles}`}, 
  { field: "fechaDiagnostico" , headerName: t("FECHADIAGNOSTICO"), flex: 0.2, valueGetter: (params) => moment(params.row.fechaDiagnostico).format("DD/MM/yyyy") },
  { field: "estado" , headerName: t("ESTADO"), flex: 0.2, valueGetter:  (params) =>  params.row.estado ? t("Activo") : t("Inactivo")},
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={createEnfermedad} update={() => setUpdate(!update)} title={t("EditarEnfermedad")} button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLEnfermedadUsuarioForm
              addOrEdit={addOrEdit}
              update={update}
              recordForEdit={cellValues.row}
              setCreateEnfermedad={setCreateEnfermedad}
              enfermedades = {enfermedades}
            />
          </TLDialog>
          <TLDialog onOk={deleteEnfermedad} trash={() => setTrash(!trash)} title={t("EliminarEnfermedad")} button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteEnfermedad 
              trash={trash}
              enfermedad={cellValues.row.enfermedad}
              onDelete={onDelete}
              setDeleteEnfermedad={setDeleteEnfermedad}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];