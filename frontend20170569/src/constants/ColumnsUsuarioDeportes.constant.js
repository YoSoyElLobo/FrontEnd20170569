//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLDeporteUsuarioForm from '../components/organisms/TLDeporteUsuarioForm.organism';
import TLConfirmDeleteDeporte from '../components/organisms/TLConfirmDeleteDeporte.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { t } from 'i18next';

import moment from 'moment'

      
export const ColumnsUsuarioDeportes = (createDeporte, setUpdate, update, addOrEdit, setCreateDeporte, deleteDeporte, setTrash, trash, onDelete, setDeleteDeporte, deportes, frecuencias, language) => [
  { field: "nombre" , headerName: t("NOMBRE") , flex: 0.4, valueGetter: (params) =>  `${language === 'es' ? params.row.deporte.nombreEspanol : params.row.deporte.nombreIngles}`}, 
  { field: "frecuencia" , headerName: t("FRECUENCIA") , flex: 0.3, valueGetter: (params) =>  `${language === 'es' ? params.row.frecuencia.nombreEspanol : params.row.frecuencia.nombreIngles}`}, 
  { field: "fechaInicio" , headerName: t("FECHAINICIO"), flex: 0.2, valueGetter: (params) => moment(params.row.fechaInicio).format("DD/MM/yyyy") },
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={createDeporte} update={() => setUpdate(!update)} title={t("EditarDeporte")} button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLDeporteUsuarioForm
              addOrEdit={addOrEdit}
              update={update}
              recordForEdit={cellValues.row}
              setCreateDeporte={setCreateDeporte}
              deportes = {deportes}
              frecuencias = {frecuencias}
            />
          </TLDialog>
          <TLDialog onOk={deleteDeporte} trash={() => setTrash(!trash)} title={t("EliminarDeporte")} button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteDeporte 
              trash={trash}
              deporte={cellValues.row.deporte}
              onDelete={onDelete}
              setDeleteDeporte={setDeleteDeporte}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];