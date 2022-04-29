//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLAlimentoUsuarioForm from '../components/organisms/TLAlimentoUsuarioForm.organism';
import TLConfirmDeleteUsuarioAlimento from '../components/organisms/TLConfirmDeleteUsuarioAlimento.organism';
//Mui
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { t } from 'i18next';

import moment from 'moment'

      
export const ColumnsUsuarioAlimentos = (createAlimento, setUpdate, update, addOrEdit, setCreateAlimento, deleteAlimento, setTrash, trash, onDelete, setDeleteAlimento, alimentos, language) => [
  { field: "nombre" , headerName: t("NOMBRE") , flex: 0.4, valueGetter: (params) =>  `${language === 'es' ? params.row.alimento.nombreEspanol : params.row.alimento.nombreIngles}`}, 
  { field: "cantidad" , headerName: t("CANTIDADSEMANALDECONSUMO") , flex: 0.4, valueGetter: (params) =>  `${params.row.cantidad} veces`}, 
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.2,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLDialog onOk={createAlimento} update={() => setUpdate(!update)} title={t("EditarAlimento")} button={
            <TLIconButton sx={{ color: '#00467E'}}>
              <EditIcon />
            </TLIconButton>}>
            <TLAlimentoUsuarioForm
              addOrEdit={addOrEdit}
              update={update}
              recordForEdit={cellValues.row}
              setCreateAlimento={setCreateAlimento}
              alimentos = {alimentos}
            />
          </TLDialog>
          <TLDialog onOk={deleteAlimento} trash={() => setTrash(!trash)} title={t("EliminarAlimento")} button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteUsuarioAlimento 
              trash={trash}
              usuarioAlimento={cellValues.row}
              onDelete={onDelete}
              setDeleteAlimento={setDeleteAlimento}
            />
          </TLDialog> 

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];