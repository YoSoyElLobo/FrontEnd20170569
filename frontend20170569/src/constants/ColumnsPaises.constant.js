//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLPaisForm from '../components/organisms/TLPaisForm.organism';
import TLConfirmDeletePais from '../components/organisms/TLConfirmDeletePais.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { t } from 'i18next';

export const ColumnsPaises = (createPais, setUpdate, update, addOrEdit, setCreatePais, deletePais, setTrash, trash, onDelete, setDeletePais, language) => [
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
          <TLDialog onOk={createPais} update={() => setUpdate(!update)} title={t("EditarPais")} button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLPaisForm
              update={update}
              recordForEdit={cellValues.row}
              addOrEdit={addOrEdit}
              setCreatePais={setCreatePais}
            />
          </TLDialog>
          <TLDialog onOk={deletePais} trash={() => setTrash(!trash)} title={t("EliminarPais")} button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeletePais 
              trash={trash}
              pais={cellValues.row}
              onDelete={onDelete}
              setDeletePais={setDeletePais}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];