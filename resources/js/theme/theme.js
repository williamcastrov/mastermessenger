import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography : {
        useNextVariants: true
    },
    palette : {
         primary : {
             main : '#dd9e2b'
         },
         common:{
             white : 'white'
         },
         secondary:{
             main : '#454257'
         }
    },
    spacing : 10
});

export default theme;