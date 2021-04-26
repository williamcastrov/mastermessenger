import React, { useState, useEffect } from "react";
import firebase from "../../../../server/firebase";
import "firebase/auth";
import BarSession from "./BarSession";
import BarSessionUno from "./BarSessionUno";
import BarSessionDos from "./BarSessionDos";

//import usuariosServices from "../../../../services/Usuarios";

export default function SelectMenuBar(props) {
  //const {  tipousuario } = props;
  let tipousuario = 10;
  //console.log("TIPO DE USUARIO : ", tipousuario);

  const [selectedForm, setSelectedForm] = useState(0);
  //const [listarUsuarios, setListUsuarios] = useState([]);

  const handlerForm = () => {
   //setSelectedForm(tipo_usu)
    switch (tipousuario) {
      case 10:
        return <BarSession />;
      case 11:
        return <BarSessionUno/>
      case 12:
        return <BarSessionDos/>
      default:
        return <BarSession />;
    }
  };
/*
  useEffect(() => {
    alert("ENTRE")
    async function fetchDataUsuarios() {
      const res = await usuariosServices.leerUsuario(metadata);
      setListUsuarios(res.data);
      console.log("DATOS MENU SELECT USUARIO : ",res.data)
    }
    fetchDataUsuarios();
  }, [])    
*/
  return (
    <div>
      <div>
        {handlerForm()}
      </div>
    </div>
  );
}
