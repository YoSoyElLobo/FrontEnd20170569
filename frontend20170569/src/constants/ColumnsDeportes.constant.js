//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLDeporteForm from '../components/organisms/TLDeporteForm.organism';
import TLConfirmDeleteDeporte from '../components/organisms/TLConfirmDeleteDeporte.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { t } from 'i18next';

export const ColumnsDeportes = (createDeporte, setUpdate, update, addOrEdit, setCreateDeporte, deleteDeporte, setTrash, trash, onDelete, setDeleteDeporte, language) => [
  { field: language === 'es' ? "nombreEspanol" : "nombreIngles" , headerName: language === 'es' ? t("NOMBREESPANOL") : t("NOMBREINGLES"), flex: 0.4 }, 
  { field: language === 'es' ? "nombreIngles" : "nombreEspanol" , headerName: language === 'es' ? t("NOMBREINGLES") : t("NOMBREESPANOL"), flex: 0.4 },
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
            <TLDeporteForm
              update={update}
              recordForEdit={cellValues.row}
              addOrEdit={addOrEdit}
              setCreateDeporte={setCreateDeporte}
            />
          </TLDialog>
          <TLDialog onOk={deleteDeporte} trash={() => setTrash(!trash)} title={t("EliminarDeporte")} button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteDeporte 
              trash={trash}
              deporte={cellValues.row}
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