import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Grid, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';
import Moment from 'moment';

// Componentes de Conexion con el Backend
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import clientesServices from "../../../services/Interlocutores/Clientes";
import direccionentregaServices from "../../../services/Interlocutores/DireccionEntrega";

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

function DireccionEntrega(props) {
  const { cliente } = props;
  //console.log("CLIENTE : ",cliente)

  const styles = useStyles();
  const [listarDireccionEntrega, setListarDireccionEntrega] = useState([]);
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

  const [entregasSeleccionado, setEntregasSeleccionado] = useState({
    id_den: "",
    cliente_den: cliente,
    nombre_den: "",
    direccion_den: "",
    ciudad_den: "",
    estado_den: "",
    observacion_den: ""
  })

  useEffect(() => {
    async function fetchDataEntregas() {
      const res = await direccionentregaServices.direccionentregaclientes(cliente);
      setListarDireccionEntrega(res.data);
      //console.log("DATOS CLIENTES : ",res.data)
      setActualiza(false);
    }
    fetchDataEntregas();
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

    setEntregasSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarEntrega = (entrega, caso) => {
    setEntregasSeleccionado(entrega);
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

  const grabarEntrega = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!entregasSeleccionado.direccion_den) {
      errors.direccion_den = true;
      formOk = false;
    }

    if (!entregasSeleccionado.ciudad_den) {
      errors.ciudad_den = true;
      formOk = false;
    }

    if (!entregasSeleccionado.estado_den) {
      errors.estado_den = true;
      formOk = false;
    }

    if (!entregasSeleccionado.observacion_den) {
      errors.observacion_den = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      {
        setEntregasSeleccionado([{
          id_den: "",
          cliente_den: cliente,
          nombre_den: entregasSeleccionado.nombre_den,
          direccion_den: entregasSeleccionado.direccion_den,
          ciudad_den: entregasSeleccionado.ciudad_den,
          estado_den: entregasSeleccionado.estado_den,
          observacion_den: entregasSeleccionado.observacion_den
        }]);
      }

    }
    else {
      swal("Dirección Entrega", "Debe Ingresar Todos los Datos, Revisar Información!", "warning", { button: "Aceptar" });
      abrirCerrarModalInsertar();
    }
    setGrabar(true);
  }

  useEffect(() => {
    async function grabarEntrega() {
      if (grabar) {
        //console.log("DATOS ENTREGA : ",entregasSeleccionado[0]);
        
        const res = await direccionentregaServices.save(entregasSeleccionado[0]);

        if (res.success) {
          swal("Dirección Entrega", "Creada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalInsertar();
          delete entregasSeleccionado.cliente_den;
          delete entregasSeleccionado.direccion_den;
          delete entregasSeleccionado.ciudad_den;
          delete entregasSeleccionado.estado_den;
          delete entregasSeleccionado.observacion_den;
        } else {
          swal("Dirección Entrega", "Error Creando Dirección Entrega!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalInsertar();
        }
        setActualiza(true);
      }
    }
    grabarEntrega();
  }, [grabar])

  const actualizarEntrega = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!entregasSeleccionado.cliente_den) {
      errors.cliente_den = true;
      formOk = false;
    }

    if (!entregasSeleccionado.direccion_den) {
      errors.direccion_den = true;
      formOk = false;
    }

    if (!entregasSeleccionado.ciudad_den) {
      errors.ciudad_den = true;
      formOk = false;
    }

    if (!entregasSeleccionado.estado_den) {
      errors.estado_den = true;
      formOk = false;
    }

    if (!entregasSeleccionado.observacion_den) {
      errors.observacion_den = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await direccionentregaServices.update(entregasSeleccionado);

      if (res.success) {
        swal("Dirección Entrega", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete entregasSeleccionado.cliente_den;
        delete entregasSeleccionado.direccion_den;
        delete entregasSeleccionado.ciudad_den;
        delete entregasSeleccionado.estado_den;
        delete entregasSeleccionado.observacion_den;
      } else {
        swal("Dirección Entrega", "Error Creando Dirección de Entrega, Revisar Información!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Dirección Entrega", "Debe Ingresar Todos los Datos, Revisar Inormación!", "warning", { button: "Aceptar" });
      console.log(entregasSeleccionado);
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarEntrega = async () => {

    const res = await direccionentregaServices.delete(entregasSeleccionado.id_den);

    if (res.success) {
      swal("Dirección Entrega", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Dirección Entrega", "Error Borrando Dirección Entrega!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'cliente_den',
      title: 'Cliente'
    },
    {
      field: 'nombre_den',
      title: 'Descripción'
    },
    {
      field: 'direccion_den',
      title: 'Dirección',
    },
    {
      field: 'ciudad_den',
      title: 'Ciudad',
    },
    {
      field: 'observacion_den',
      title: 'Observación',
    }
  ]

  const entregaInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Dirección Entrega
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField name="nombre_den" label="Descripción" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="direccion_den" label="Dirección" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_den"
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
              name="estado_den"
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
          <TextField name="observacion_den" label="Observación" onChange={handleChange} fullWidth />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarEntrega()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const entregaEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Dirección Entrega
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField name="nombre_den" label="Descripción" fullWidth onChange={handleChange} 
                     value={entregasSeleccionado&&entregasSeleccionado.nombre_den} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField name="direccion_den" label="Dirección" fullWidth onChange={handleChange} 
                     value={entregasSeleccionado&&entregasSeleccionado.direccion_den} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_den"
              id="idselectCiudad"
              fullWidth
              onChange={handleChange}
              value={entregasSeleccionado&&entregasSeleccionado.ciudad_den}
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
              name="estado_den"
              id="idselectEstado"
              fullWidth
              onChange={handleChange}
              value={entregasSeleccionado&&entregasSeleccionado.estado_den}
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
          <TextField name="observacion_den" label="Observación" onChange={handleChange} fullWidth 
                     value={entregasSeleccionado&&entregasSeleccionado.observacion_den} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarEntrega()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const entregaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Dirección de Entrega <b>{entregasSeleccionado && entregasSeleccionado.nombre_den}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarEntrega()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={() => abrirCerrarModalInsertar()} >Agregar Dirección de Entrega</Button>
      <MaterialTable
        columns={columnas}
        data={listarDireccionEntrega}
        title="GESTIONAR DIRECCIONES DE ENTREGA"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Dirección de Entrega',
            onClick: (event, rowData) => seleccionarEntrega(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Dirección de Entrega',
            onClick: (event, rowData) => seleccionarEntrega(rowData, "Eliminar")
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
        {entregaInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {entregaEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {entregaEliminar}
      </Modal>
    </div>
  );
}

export default DireccionEntrega;

