import React from "react";
import { Button } from "semantic-ui-react";
import {Typography, makeStyles } from "@material-ui/core";

import "./AuthOptions.scss";
const useStyles = makeStyles((theme) => ({
  typography: {
    fontSize: 20,
    color   : "#000"
  }
}));


function AuthOptionsAdmon(props) {
  const styles = useStyles();
  const { setSelectedForm } = props;

  return (
    <div className="auth-options">
      <Typography  align="center" className={ styles.typography } variant="button" display="block" >
        Registrarse, Iniciar Sesión, Recuperar Contraseña en Just In Time
      </Typography>
      <br/>
      <Button className="register" onClick={() => setSelectedForm("registro")}>
        Registrarse
      </Button>
      <Button className="login" onClick={() => setSelectedForm("login")}>
        Iniciar sesión
      </Button>
      <Button className="register" onClick={() => setSelectedForm("recuperarcontraseña")}>
        Recuperar Contraseña
      </Button>
    </div>
  );
}

export default AuthOptionsAdmon;