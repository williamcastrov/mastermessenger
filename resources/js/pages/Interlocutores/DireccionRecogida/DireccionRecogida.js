import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import CachedIcon from '@material-ui/icons/Cached';
import swal from 'sweetalert';
import Moment from 'moment';

// Componentes de Conexion con el Backend
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import clientesServices from "../../../services/Interlocutores/Clientes";
import direccionrecogidaServices from "../../../services/Interlocutores/DireccionRecogida";

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
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
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
  typography: {
    fontSize: 16,
    color: "#ff3d00"
  },
  button: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: '#454257',
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  button2: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: red[700],
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
}));

function DireccionRecogida(props) {
  const { cliente } = props;
  console.log("CLIENTE : ",cliente)

  const styles = useStyles();
  const [listarDireccionRecogida, setListarDireccionRecogida] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [fechaHoy, setFechaHoy] = useState(new Date());
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const [actualiza, setActualiza] = useState(false);
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const [grabar, setGrabar] = React.useState(false);
  let estado = 1
  let blanco = "."

  const [recogidasSeleccionado, setRecogidasSeleccionado] = useState({
    id_drc: "",
    cliente_drc: cliente,
    nombre_drc: "",
    direccion_drc: "",
    ciudad_drc: "",
    estado_drc: "",
    observacion_drc: ""
  })

  useEffect(() => {
    async function fetchDataRecogidas() {
      const res = await direccionrecogidaServices.direccionrecogidaclientes(cliente);
      setListarDireccionRecogida(res.data);
      //console.log("DATOS CLIENTES : ",res.data)
      setActualiza(false);
    }
    fetchDataRecogidas();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstadosGenerales();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListarCiudades(res.data)
      //console.log(res.data);
    }
    fetchDataCiudades();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setRecogidasSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarRecogida = (recogida, caso) => {
    setRecogidasSeleccionado(recogida);
    (caso === "Editar") ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const grabarRecogida = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!recogidasSeleccionado.direccion_drc) {
      errors.direccion_drc = true;
      formOk = false;
    }

    if (!recogidasSeleccionado.ciudad_drc) {
      errors.ciudad_drc = true;
      formOk = false;
    }

    if (!recogidasSeleccionado.estado_drc) {
      errors.estado_drc = true;
      formOk = false;
    }

    if (!recogidasSeleccionado.observacion_drc) {
      errors.observacion_drc = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      {
        setRecogidasSeleccionado([{
          id_drc: "",
          cliente_drc: cliente,
          nombre_drc: recogidasSeleccionado.nombre_drc,
          direccion_drc: recogidasSeleccionado.direccion_drc,
          ciudad_drc: recogidasSeleccionado.ciudad_drc,
          estado_drc: recogidasSeleccionado.estado_drc,
          observacion_drc: recogidasSeleccionado.observacion_drc
        }]);
      }

    }
    else {
      swal("Dirección Recogida", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      abrirCerrarModalInsertar();
    }
    setGrabar(true);
  }

  useEffect(() => {
    async function grabarRecogida() {
      if (grabar) {
        console.log("DATOS RECOGIDA : ",recogidasSeleccionado[0]);
        
        const res = await direccionrecogidaServices.save(recogidasSeleccionado[0]);

        if (res.success) {
          swal("Dirección Recogida", "Creada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalInsertar();
          delete recogidasSeleccionado.cliente_drc;
          delete recogidasSeleccionado.direccion_drc;
          delete recogidasSeleccionado.ciudad_drc;
          delete recogidasSeleccionado.estado_drc;
          delete recogidasSeleccionado.observacion_drc;
        } else {
          swal("Dirección Recogida", "Error Creando Dirección Recogida!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalInsertar();
        }
        setActualiza(true);
      }
    }
    grabarRecogida();
  }, [grabar])

  const actualizarRecogida = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!recogidasSeleccionado.cliente_drc) {
      errors.cliente_drc = true;
      formOk = false;
    }

    if (!recogidasSeleccionado.direccion_drc) {
      errors.direccion_drc = true;
      formOk = false;
    }

    if (!recogidasSeleccionado.ciudad_drc) {
      errors.ciudad_drc = true;
      formOk = false;
    }

    if (!recogidasSeleccionado.estado_drc) {
      errors.estado_drc = true;
      formOk = false;
    }

    if (!recogidasSeleccionado.observacion_drc) {
      errors.observacion_drc = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await direccionrecogidaServices.update(recogidasSeleccionado);

      if (res.success) {
        swal("Dirección Recogida", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete recogidasSeleccionado.cliente_drc;
        delete recogidasSeleccionado.direccion_drc;
        delete recogidasSeleccionado.ciudad_drc;
        delete recogidasSeleccionado.estado_drc;
        delete recogidasSeleccionado.observacion_drc;
      } else {
        swal("Dirección Recogida", "Error Creando Dirección de Recogida, Revisar Información!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Dirección Recogida", "Debe Ingresar Todos los Datos, Revisar Inormación!", "warning", { button: "Aceptar" });
      console.log(recogidasSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarRecogida = async () => {

    const res = await direccionrecogidaServices.delete(recogidasSeleccionado.id_drc);

    if (res.success) {
      swal("Dirección Recogida", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Dirección Recogida", "Error Borrando Dirección Recogida!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'cliente_drc',
      title: 'Cliente'
    },
    {
      field: 'nombre_drc',
      title: 'Descripción'
    },
    {
      field: 'direccion_drc',
      title: 'Dirección',
    },
    {
      field: 'ciudad_drc',
      title: 'Ciudad',
    },
    {
      field: 'observacion_drc',
      title: 'Observación',
    }
  ]

  const recogidaInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Dirección Recogida
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField name="nombre_drc" label="Descripción" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="direccion_drc" label="Dirección" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_drc"
              id="idselectCiudad"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_drc"
              id="idselectEstado"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="observacion_drc" label="Observación" onChange={handleChange} fullWidth />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarRecogida()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const recogidaEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Dirección Recogida
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField name="nombre_drc" label="Descripción" fullWidth onChange={handleChange} 
                     value={recogidasSeleccionado&&recogidasSeleccionado.nombre_drc} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="direccion_drc" label="Dirección" fullWidth onChange={handleChange} 
                     value={recogidasSeleccionado&&recogidasSeleccionado.direccion_drc} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_drc"
              id="idselectCiudad"
              fullWidth
              onChange={handleChange}
              value={recogidasSeleccionado&&recogidasSeleccionado.ciudad_drc}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarCiudades.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ciu}>{itemselect.nombre_ciu}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_drc"
              id="idselectEstado"
              fullWidth
              onChange={handleChange}
              value={recogidasSeleccionado&&recogidasSeleccionado.estado_drc}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEstados.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_est}>{itemselect.nombre_est}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="observacion_drc" label="Observación" onChange={handleChange} fullWidth 
                     value={recogidasSeleccionado&&recogidasSeleccionado.observacion_drc} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarRecogida()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const recogidaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Dirección de Recogida <b>{recogidasSeleccionado && recogidasSeleccionado.nombre_drc}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarRecogida()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={() => abrirCerrarModalInsertar()} >Agregar Dirección de Recogida</Button>
      <MaterialTable
        columns={columnas}
        data={listarDireccionRecogida}
        title="GESTIONAR DIRECCIONES DE RECOGIDA"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Dirección de recogida',
            onClick: (event, rowData) => seleccionarRecogida(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Dirección de recogida',
            onClick: (event, rowData) => seleccionarRecogida(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: 12
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
      />
      {}

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {recogidaInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {recogidaEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {recogidaEliminar}
      </Modal>
    </div>
  );
}

export default DireccionRecogida;

