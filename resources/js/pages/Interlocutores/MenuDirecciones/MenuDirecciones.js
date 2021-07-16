import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';

// Floating Button
import { Container, Button, Link, lightColors, darkColors } from 'react-floating-action-button'

import DireccionRecogida from "../DireccionRecogida";
import DireccionEntrega from "../DireccionEntrega";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 250,
  },
  floatingbutton : {
      margin: 55,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
  }
}));

export default function MenuDirecciones(props) {
  const { cliente } = props;
  //console.log("CLIENTE : ", cliente)

  const styles = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const fecha = new Date();
  
  const [modalDireccionRecogida, setModalDireccionRecogida] = useState(false);
  const [modalDireccionEntrega, setModalDireccionEntrega] = useState(false);
 
  const abrirCerrarModalDireccionRecogida = () => {
    setModalDireccionRecogida(!modalDireccionRecogida);
  }

  const abrirCerrarModalDireccionEntrega = () => {
    setModalDireccionEntrega(!modalDireccionEntrega);
  }
  
  const asignarRecogida = (
    <div>
      <DireccionRecogida cliente={cliente} />
    </div>
  )

  const asignarEntrega = (
    <div>
      <DireccionEntrega cliente={cliente} />
    </div>
  )
  
  return (
    <div>   
      <Modal
        open={modalDireccionRecogida}
        onClose={abrirCerrarModalDireccionRecogida}
      >
        {asignarRecogida}
      </Modal>

      <Modal
        open={modalDireccionEntrega}
        onClose={abrirCerrarModalDireccionEntrega}
      >
        {asignarEntrega}
      </Modal>

      <Container className={styles.floatingbutton} >
        <Button
          tooltip="Direcciones entrega"
          rotate={true}
          styles={{ backgroundColor: darkColors.orange, color: lightColors.white }}
          onClick={() => setModalDireccionEntrega(true)} ><BusinessIcon />
        </Button>
        <Button
          tooltip="Direcciones recogida"
          rotate={true}
          styles={{ backgroundColor: darkColors.cyan, color: lightColors.white }}
          onClick={() => setModalDireccionRecogida(true)} ><HomeIcon/>
        </Button>
        <Button
          tooltip="Gestionar Direcciones!"
          rotate={true}
          styles={{ backgroundColor: darkColors.lightBlue, color: lightColors.white }}  
          onClick={() => alert('Seleccione Información relaciona con los Direcciones!')} ><ZoomOutMapIcon /></Button>
      </Container>
    </div>

  );
}
