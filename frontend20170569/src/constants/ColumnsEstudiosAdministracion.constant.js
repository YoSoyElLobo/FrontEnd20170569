//Components
import TLIconButton from '../components/atoms/TLIconButton.atom';
import TLDialog from '../components/organisms/TLDialog.organism';
import TLConfirmDeleteEstudio from '../components/organisms/TLConfirmDeleteEstudio.organism';
//Mui
import Grid from '@mui/material/Grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


import { t } from 'i18next';

export const ColumnsEstudiosAdministracion = (deleteEstudio, setTrash, trash, onDelete, setDeleteEstudio, history, language) => [
  { field: "idEstudio" , headerName: t("ID"), flex: 0.1}, 
  { field: "nombre", headerName: t("NOMBRE"), flex: 0.25, valueGetter: (params) => language === 'es' ? params.row.nombreEspanol : params.nombreIngles},
  { field: "investigador" , headerName: t("INVESTIGADOR"), flex: 0.25, valueGetter: (params) =>  `${params.row.investigador.nombres + ' ' + params.row.investigador.apellidos}`},
  { field: "estado", headerName: t("ESTADO"), flex: 0.1, valueGetter: (params) => params.row.enCurso ? t("EnCurso") : t("Finalizado")}, 
  {
    field: "opciones",
    headerName: t("ACCION"),
    flex: 0.25,
    headerAlign: 'center', 
    align: 'center',
    renderCell: (cellValues) => {
      return (
        <Grid>
          <TLIconButton sx={{ color: '#444444'}}><RemoveRedEyeIcon onClick={() => history.push(`/ver-estudio/${cellValues.row.idEstudio}`)} /></TLIconButton>
          <TLIconButton sx={{ color: '#00467E'}}><EditIcon onClick={() => {history.push(`/editar-estudio/${cellValues.row.idEstudio}`)}} /></TLIconButton> 
          <TLDialog onOk={deleteEstudio} trash={() => setTrash(!trash)} title={t("EliminarEstudio")} button={
            <TLIconButton sx={{ color: '#C63637'}}>
              <DeleteForeverIcon />
            </TLIconButton>}>
            <TLConfirmDeleteEstudio
              trash={trash}
              estudio={cellValues.row}
              onDelete={onDelete}
              setDeleteEstudio={setDeleteEstudio}
            />
          </TLDialog>
          

        </Grid>
      );
    },
    sortable: false,
    filterable: false
  }
];