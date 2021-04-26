import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    typography : {
        useNextVariants: true
    },
    palette : {
         primary : {
             main : '#80b918'
         },
         common:{
             white : 'white'
         },
         secondary:{
             main : '#2217f4'
         }
    },
    spacing : 10
});

export default theme;