
import { t } from 'i18next';

import moment from 'moment'

      
export const ColumnsPerfilEnfermedades = (language) => [
  { field: "nombre" , headerName: t("NOMBRE") , flex: 0.3, valueGetter: (params) =>  `${language === 'es' ? params.row.enfermedad.nombreEspanol : params.row.enfermedad.nombreIngles}`}, 
  { field: "fechaDiagnostico", headerAlign: 'center', align: 'center', headerName: t("FECHADIAGNOSTICO"), flex: 0.5, valueGetter: (params) => moment(params.row.fechaDiagnostico).format("DD/MM/yyyy") },
  { field: "estado" , headerAlign: 'center', align: 'center', headerName: t("ESTADO"), flex: 0.2, valueGetter:  (params) =>  params.row.estado ? t("Activo") : t("Inactivo")},
];