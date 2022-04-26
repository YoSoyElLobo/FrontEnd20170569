//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLFarmacoUsuarioForm from '../components/organisms/TLFarmacoUsuarioForm.organism';
import TLConfirmDeleteFarmaco from '../components/organisms/TLConfirmDeleteFarmaco.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { t } from 'i18next';

import moment from 'moment'

      
export const ColumnsUsuarioFarmacos = (createFarmaco, setUpdate, update, addOrEdit, setCreateFarmaco, deleteFarmaco, setTrash, trash, onDelete, setDeleteFarmaco, farmacos, frecuencias, language) => [
  { field: "nombre" , headerName: t("NOMBRE") , flex: 0.2, valueGetter: (params) =>  `${language === 'es' ? params.row.farmaco.nombreEspanol : params.row.farmaco.nombreIngles}`}, 
  { field: "dosis" , headerName: t("DOSIS") , flex: 0.2, valueGetter: (params) =>  `${params.row.dosis} mg`}, 
  { field: "frecuencia" , headerName: t("FRECUENCIA") , flex: 0.2, valueGetter: (params) =>  `${language === 'es' ? params.row.cantidad + ' ' + params.row.frecuencia.nombreEspanol : params.row.cantidad + ' ' + params.row.frecuencia.nombreIngles}`}, 
  { field: "fechaInicio" , headerName: t("FECHADIAGNOSTICO"), flex: 0.2, valueGetter: (params) => moment(params.row.fechaInicio).format("DD/MM/yyyy") },
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={createFarmaco} update={() => setUpdate(!update)} title={t("EditarFarmaco")} button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLFarmacoUsuarioForm
              addOrEdit={addOrEdit}
              update={update}
              recordForEdit={cellValues.row}
              setCreateFarmaco={setCreateFarmaco}
              farmacos = {farmacos}
              frecuencias = {frecuencias}
            />
          </TLDialog>
          <TLDialog onOk={deleteFarmaco} trash={() => setTrash(!trash)} title={t("EliminarFarmaco")} button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteFarmaco 
              trash={trash}
              farmaco={cellValues.row.farmaco}
              onDelete={onDelete}
              setDeleteFarmaco={setDeleteFarmaco}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];