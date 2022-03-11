import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid';
import { esES as coreEsES} from '@mui/material/locale';

const theme = createTheme (
  {
    typography: {
      fontFamily: "'Roboto', 'Roboto';",
      button: {
        textTransform: "none"
      },
    //   h4: {
    //     fontSize: 36,
    //   },
    //   h5: {
    //     fontSize: 24,
    //   },
       body1: {
         fontSize: 14,
       },
    //   body2: {
    //     fontSize: 16,
    //   },
    //   button: {
    //     textTransform: "none",
    //     fontSize: 16,
    //   },
    },   
    palette: {
      primary: {
        main: "#00467E",
        dark: "#03045E",
      },
      white: "#FFFFFF",
      black: "#000000",
      bloqueo: "#9e9e9e",
      chatHeader: "#EDEDED",
      chatSearch: "#F6F6F6",
      chatHover: "#FAFAFA",
      chatActive: "#F5F5F5"
    },
    shape: {
      borderRadius: 5,
    },
    weight: {
      regulr: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }    
  },
  esES,
  coreEsES
);

export default theme;