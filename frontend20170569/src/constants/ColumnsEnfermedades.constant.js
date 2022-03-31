//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLEnfermedadForm from '../components/organisms/TLEnfermedadForm.organism';
import TLConfirmDeleteEnfermedad from '../components/organisms/TLConfirmDeleteEnfermedad.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { t } from 'i18next';



      
export const ColumnsEnfermedades = (createEnfermedad, setUpdate, update, addOrEdit, setCreateEnfermedad, deleteEnfermedad, setTrash, trash, onDelete, setDeleteEnfermedad, language, translator) => [
  { field: "nombre", headerName: t("ENFERMEDAD"), flex: 0.8, valueGetter: (params) =>  `${language === 'es' ? params.row.nombreEspanol : params.row.nombreIngles}`},
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
            <TLEnfermedadForm
              update={update}
              recordForEdit={cellValues.row}
              addOrEdit={addOrEdit}
              setCreateEnfermedad={setCreateEnfermedad}
            />
          </TLDialog>
          <TLDialog onOk={deleteEnfermedad} trash={() => setTrash(!trash)} title={t("EliminarEnfermedad")} button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteEnfermedad 
              trash={trash}
              enfermedad={cellValues.row}
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