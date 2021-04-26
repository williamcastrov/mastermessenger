import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "./server/firebase";
import "firebase/auth";
import "./app.scss";

// Componentes Menu Bar
import AppNavbar from "./layouts/AppNavbar";
import theme from "./theme";

// Componentes de Logueo
import Auth from "./pages/Auth";

// Componentes Modulo Parametros Genrales
import TiposPedidos from "./pages/Parameters/TiposPedidos";

function Main(props) {
    const [user, setUser] = useState(false);
    const [componente, setComponente] = useState("1");
    const [metadata, setMetadata] = useState("");
    const [listarUsuarios, setListUsuarios] = useState([]);

    firebase.auth().onAuthStateChanged(currentUser => {
        console.log(currentUser ? "Estamos Logueados" : "No estamos logueados")
        if (currentUser) {
            setMetadata(currentUser.metadata.a);
            //console.log("CURRENT USER : ", metadata);
            setUser(true);
        } else {
            setUser(false);
        }
    });

    return (
        <>
            {
            !user ? <Auth />
            :
            <Router>
                <ThemeProvider theme={theme} >
                    <AppNavbar />
                    <Switch>
                        <Route path="/parametros/tipospedidos" component={TiposPedidos}/>
                    </Switch>
                </ThemeProvider>
            </Router>
            }
        </>

    );
}

export default Main;