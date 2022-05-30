
import { t } from 'i18next';

import moment from 'moment'

      
export const ColumnsPerfilFarmacos = (language) => [
  { field: "nombre" , headerName: t("NOMBRE") , flex: 0.25, valueGetter: (params) =>  `${language === 'es' ? params.row.farmaco.nombreEspanol : params.row.farmaco.nombreIngles}`}, 
  { field: "dosis" , headerAlign: 'center', align: 'center', headerName: t("DOSIS") , flex: 0.25, valueGetter: (params) =>  `${params.row.dosis} mg`}, 
  { field: "frecuencia" , headerAlign: 'center', align: 'center', headerName: t("FRECUENCIA") , flex: 0.25, valueGetter: (params) =>  `${language === 'es' ? params.row.cantidad + ' ' + params.row.frecuencia.nombreEspanol : params.row.cantidad + ' ' + params.row.frecuencia.nombreIngles}`}, 
  { field: "fechaInicio" , headerAlign: 'center', align: 'center', headerName: t("FECHADIAGNOSTICO"), flex: 0.25, valueGetter: (params) => moment(params.row.fechaInicio).format("DD/MM/yyyy") },
];