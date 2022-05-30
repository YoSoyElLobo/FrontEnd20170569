
import { t } from 'i18next';



      
export const ColumnsPerfilAlimentos = (language) => [
  { field: "nombre" , headerName: t("NOMBRE") , flex: 0.4, valueGetter: (params) =>  `${language === 'es' ? params.row.alimento.nombreEspanol : params.row.alimento.nombreIngles}`}, 
  { field: "cantidad" , headerAlign: 'center', align: 'center',  headerName: t("CANTIDADSEMANALDECONSUMO") , flex: 0.6, valueGetter: (params) =>  `${params.row.cantidad} ${t('veces')}`}, 
  
];