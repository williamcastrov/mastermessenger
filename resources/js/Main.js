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
import Usuarios from "./pages/Usuarios/Usuarios";

// Componentes Modulo Parametros Genrales
import Paises from './pages/Parameters/Paises';
import Regiones from './pages/Parameters/Regiones';
import Departamentos from './pages/Parameters/Departamentos';
import Ciudades from './pages/Parameters/Ciudades';
import Unidades from './pages/Parameters/Unidades';

// Componentes Modulo Tiqueteras
import TiposTiqueteras from "./pages/Tiquetera/TiposTiqueteras";
import Tiqueteras from "./pages/Tiquetera/Tiqueteras";

// Componentes Modulo Pedidos
import TiposPedidos from "./pages/Pedidos/TiposPedidos";
import DescuentosVolumen from "./pages/Pedidos/DescuentosVolumen";
import Tarifas from "./pages/Pedidos/Tarifas";
import Zonas from "./pages/Pedidos/Zonas";
import Pedidos from "./pages/Pedidos/Pedidos";
import PorAsignar from "./pages/Pedidos/PorAsignar";
import PorTerminar from "./pages/Pedidos/Terminar";

// Componentes Modulo Mensajeros
import PedidosMensajero from "./pages/Mensajeros/PedidosMensajero";
import EstadoCtaMensajero from "./pages/Mensajeros/EstadoCtaMensajero";

//Componentes Modulo Interlocutores
import TipoInterlocutores from './pages/Interlocutores/Parameters/TipoInterlocutores';
import TiposCategorias from './pages/Interlocutores/Parameters/TiposCategorias';
import Clientes from './pages/Interlocutores/Clientes';
import Empleados from './pages/Interlocutores/Empleados';
import Mensajeros from './pages/Interlocutores/Mensajeros';

import Loading from './components/Loading';

/*
import Especialidades from './pages/Interlocutores/Parameters/Especialidades';
import Proveedores from './pages/Interlocutores/Proveedores';
import Contactos from './pages/Interlocutores/Contactos';
*/

function Main(props) {
    const { metadata, componente, tipousuario, user, idUsu, nombreUsuario } = props;

    return (
        <>
            {
                !user ? <Auth />
                    :
                    <Router>
                        <ThemeProvider theme={theme} >
                            <AppNavbar />
                            <Switch>
                                <Route path="/auth/usuarios" component={Usuarios} />

                                <Route path="/parametros/paises" component={Paises} />
                                <Route path="/parametros/regiones" component={Regiones} />
                                <Route path="/parametros/departamentos" component={Departamentos} />
                                <Route path="/parametros/ciudades" component={Ciudades} />
                                <Route path="/parametros/tiposusuarios" component={Unidades} />

                                <Route path="/components/loading" component={Loading} />

                                <Route path="/interlocutores/tipointerlocutores" component={TipoInterlocutores} />
                                <Route path="/interlocutores/tiposcategorias" component={TiposCategorias} />
                                <Route path="/interlocutores/clientes" component={Clientes} />
                                <Route path="/interlocutores/empleados" component={Empleados} />
                                <Route path="/interlocutores/mensajeros" component={Mensajeros} />

                                <Route path="/tiqueteras/tipostiqueteras" component={TiposTiqueteras} />
                                <Route path="/tiqueteras/tiqueteras" component={Tiqueteras} />

                                <Route path="/pedidos/tipospedidos" component={TiposPedidos} />
                                <Route path="/pedidos/descuentosvolumen" component={DescuentosVolumen} />
                                <Route path="/pedidos/tarifas" component={Tarifas} />
                                <Route path="/pedidos/zonas" component={Zonas} />
                                <Route path="/pedidos/pedidos" component={Pedidos} />
                                <Route path="/pedidos/asignarpedidos" component={PorAsignar} />
                                <Route path="/pedidos/terminarpedidos" component={PorTerminar} />

                                <Route path="/mensajeros/pedidosmensajero">
                                    <PedidosMensajero metadata={metadata} idUsu={idUsu} nombreUsuario={nombreUsuario} />
                                </Route>
                                <Route path="/mensajeros/estadoctamensajero">
                                    < EstadoCtaMensajero metadata={metadata} idUsu={idUsu} nombreUsuario={nombreUsuario} />
                                </Route>
                            </Switch>
                        </ThemeProvider>
                    </Router>
            }
        </>

    );
}

export default Main;

/*
 <Route path="/interlocutores/tipointerlocutores" component={TipoInterlocutores} />
                                <Route path="/interlocutores/especialidades" component={Especialidades} />
                                <Route path="/interlocutores/proveedores" component={Proveedores} />
                                <Route path="/interlocutores/clientes" component={Clientes} />
                                <Route path="/interlocutores/empleados" component={Empleados} />
                                <Route path="/interlocutores/contactos" component={Contactos} />

*/