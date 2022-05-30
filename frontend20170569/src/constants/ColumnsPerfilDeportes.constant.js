
import { t } from 'i18next';

import moment from 'moment'

      
export const ColumnsPerfilDeportes = (language) => [
  { field: "nombre" , headerName: t("NOMBRE") , flex: 0.3, valueGetter: (params) =>  `${language === 'es' ? params.row.deporte.nombreEspanol : params.row.deporte.nombreIngles}`}, 
  { field: "frecuencia" , headerAlign: 'center', align: 'center', headerName: t("FRECUENCIA") , flex: 0.3, valueGetter: (params) =>  `${language === 'es' ? params.row.frecuencia.nombreEspanol : params.row.frecuencia.nombreIngles}`}, 
  { field: "fechaInicio" , headerAlign: 'center', align: 'center', headerName: t("FECHAINICIO"), flex: 0.4, valueGetter: (params) => moment(params.row.fechaInicio).format("DD/MM/yyyy") },
];