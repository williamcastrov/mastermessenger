import React from 'react';
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css';
//import 'react-toastify/dist/ReactToastify.css';
import './scss/estilos.css';


import Main from "./Main";

function Index(){
    return(
        <Main />
    )
}

export default Index;

if (document.getElementById('gim')) {
    ReactDOM.render(<Index />, document.getElementById('gim'));
}
