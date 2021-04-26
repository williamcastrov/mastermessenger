import React, { useState } from "react";

import AuthOptions from "../../components/Auth/AuthOptions/AuthOptionsAdmon";
//import AuthOptions from "../../components/Auth/AuthOptions";
import Login from "../../components/Auth/Login";
import RegistrarUsuario from "../../components/Auth/RegistrarUsuario";
import RecuperarContraseña from "../../components/Auth/RecuperarContraseña";

import LogoAuth from "../../assets/img/logomm.png"; 
import BackgroundAuth from "../../assets/img/UserGuestMM5.jpg";

import "./Auth.scss";

export default function Auth() {
  const [selectedForm, setSelectedForm] = useState(null);

  const handlerForm = () => {
    switch (selectedForm) {
      case "login":
        return <Login setSelectedForm={setSelectedForm} />;
      case "registro":
        return < RegistrarUsuario setSelectedForm={setSelectedForm} />
      case "recuperarcontraseña":
        return < RecuperarContraseña setSelectedForm={setSelectedForm} />
      default:
        return <AuthOptions setSelectedForm={setSelectedForm} />;
    }
  };

  return (
    <div className="auth" style={{ backgroundImage: `url(${BackgroundAuth})` }}>
      <div />
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={LogoAuth} alt="MasterMessenger" />
        </div>
        {handlerForm()}
      </div>
    </div>
  );
}

