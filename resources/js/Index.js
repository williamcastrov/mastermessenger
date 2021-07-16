import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import 'semantic-ui-css/semantic.min.css';
//import 'react-toastify/dist/ReactToastify.css';
import './scss/estilos.css';
import firebase from "./server/firebase";
import "firebase/auth";

import Main from "./Main";
import usuariosServices from "./services/Usuarios";

function Index(){
    const [user, setUser] = useState(false);
    const [tipousuario, setTipoUsuario] = useState(0);
    const [metadata, setMetadata] = useState("");
    const [componente, setComponente ] = useState("0");
    const [idUsu, setIdUsu ] = useState(0);
    const [nombreUsuario, setNombreUsuario ] = useState("");

    firebase.auth().onAuthStateChanged(currentUser => {
        console.log(currentUser ? "Estamos Logueados" : "No estamos logueados")
        if (currentUser) {
            setMetadata(currentUser.metadata.a);
            console.log("CURRENT USER : ", currentUser.metadata.a);
            setUser(true);
            
            async function fetchDataUsuarios() {
              const res = await usuariosServices.leerUsuario(currentUser.metadata.a);
              setTipoUsuario(res.data[0].tipo_usu);
              setComponente(res.data[0].dashboard_usu);
              setIdUsu(res.data[0].id_usu);
              setNombreUsuario(res.data[0].nombre_usu);
              //console.log("DATOS COMPONENTE USUARIO : ",res.data[0]);
            }
            fetchDataUsuarios();
        } else {
            setUser(false);
        }
    });
    
    return(
        <Main metadata={metadata} componente={componente} tipousuario={tipousuario} 
              user={user}         idUsu={idUsu}           nombreUsuario={nombreUsuario}
         />
    )
}

export default Index;

if (document.getElementById('gim')) {
    ReactDOM.render(<Index />, document.getElementById('gim'));
}
