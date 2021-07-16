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
import mensajerosServices from "../../../services/Interlocutores/Mensajeros";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Parameters/Empresa";
//import especialidadesServices from "../../../services/Interlocutores/Especialidades";

//Componentes Gestion de Contactos
//import MenuContactos from "../MenuContactos";

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

function Mensajeros() {
  const styles = useStyles();
  const [listarMensajeros, setlistarMensajeros] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEspecialidades, setListarEspecialidades] = useState([]);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss');
  const [actualiza, setActualiza] = useState(false);
  const [mensajerosSeleccionado, setMensajerosSeleccionado] = useState({
    id_men: "",
    codigo_tipo_men: 1,
    nit_men: "",
    digitochequeo_men: 0,
    estado_men: "",
    primer_nombre_men: "",
    segundo_nombre_men: "",
    primer_apellido_men: "",
    segundo_apellido_men: "",
    ciudad_men: "",
    direccion_men: "",
    telefono_men: "",
    email_men: "",
    empresa_men: "",
    fecha_creacion_men: fechaactual,
    fecha_modificacion_men: fechaactual,
    horainicia_men: horaactual,
    horafinal_men: horaactual
  })

  useEffect(() => {
    async function fetchDataMensajeros() {
      const res = await mensajerosServices.listmensajeros();
      setlistarMensajeros(res.data);
      console.log(res.data)
      setActualiza(false);
    }
    fetchDataMensajeros();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

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

    setMensajerosSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarMensajero = (mensajero, caso) => {
    setMensajerosSeleccionado(mensajero);
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

  const grabarMensajero = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!mensajerosSeleccionado.codigo_tipo_men) {
      alert("1")
      errors.codigo_tipo_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.nit_men) {
      alert("2")
      errors.nit_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.estado_men) {
      alert("3")
      errors.estado_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.primer_nombre_men) {
      alert("4")
      errors.primer_nombre_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.segundo_nombre_men) {
      alert("5")
      errors.segundo_nombre_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.primer_apellido_men) {
      alert("6")
      errors.primer_apellido_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.segundo_apellido_men) {
      errors.segundo_apellido_men = true;
      alert("7")
      formOk = false;
    }

    if (!mensajerosSeleccionado.ciudad_men) {
      alert("8")
      errors.ciudad_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.direccion_men) {
      alert("9")
      errors.direccion_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.telefono_men) {
      errors.telefono_men = true;
      alert("10")
      formOk = false;
    }

    if (!mensajerosSeleccionado.email_men) {
      alert("11")
      errors.email_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.empresa_men) {
      errors.empresa_men = true;
      alert("12")
      formOk = false;
    }

    if (!mensajerosSeleccionado.fecha_creacion_men) {
      alert("13")
      errors.fecha_creacion_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.fecha_modificacion_men) {
      alert("14")
      errors.fecha_modificacion_men = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(mensajerosSeleccionado);
      const res = await mensajerosServices.save(mensajerosSeleccionado);

      if (res.success) {
        swal("Mensajero", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
      } else {
        swal("Mensajero", "Error Creando el Mensajero!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Mensajero", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      console.log(mensajerosSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarMensajero = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!mensajerosSeleccionado.codigo_tipo_men) {
      errors.codigo_tipo_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.nit_men) {
      errors.nit_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.estado_men) {
      errors.estado_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.primer_nombre_men) {
      errors.primer_nombre_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.segundo_nombre_men) {
      errors.segundo_nombre_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.primer_apellido_men) {
      errors.primer_apellido_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.segundo_apellido_men) {
      errors.segundo_apellido_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.ciudad_men) {
      errors.ciudad_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.direccion_men) {
      errors.direccion_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.telefono_men) {
      errors.telefono_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.email_men) {
      errors.email_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.empresa_men) {
      errors.empresa_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.fecha_creacion_men) {
      errors.fecha_creacion_men = true;
      formOk = false;
    }

    if (!mensajerosSeleccionado.fecha_modificacion_men) {
      errors.fecha_modificacion_men = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await mensajerosServices.update(mensajerosSeleccionado);

      if (res.success) {
        swal("Mensajero", "Creado forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete mensajerosSeleccionado.codigo_tipo_men;
        delete mensajerosSeleccionado.nit_men;
        delete mensajerosSeleccionado.estado_men;
        delete mensajerosSeleccionado.primer_nombre_men;
        delete mensajerosSeleccionado.segundo_nombre_men;
        delete mensajerosSeleccionado.primer_apellido_men;
        delete mensajerosSeleccionado.segundo_apellido_men;
        delete mensajerosSeleccionado.ciudad_men;
        delete mensajerosSeleccionado.direccion_men;
        delete mensajerosSeleccionado.telefono_men;
        delete mensajerosSeleccionado.email_men;
        delete mensajerosSeleccionado.empresa_men;
        delete mensajerosSeleccionado.fecha_creacion_men;
        delete mensajerosSeleccionado.fecha_modificacion_men;
        delete mensajerosSeleccionado.especialidad_men;
      } else {
        swal("Mensajero", "Error Actualizando el Mensajero!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Mensajero", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarMensajero = async () => {

    const res = await mensajerosServices.delete(mensajerosSeleccionado.id_men);

    if (res.success) {
      swal("Mensajero", "Borrado de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Mensajero", "Error Borrando el Mensajero!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }

  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      field: 'nit_men',
      title: 'Nit',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'digitochequeo_men',
      title: 'DC'
    },
    {
      field: 'nombre_est',
      title: 'Estado'
    },
    {
      field: 'primer_nombre_men',
      title: 'Primero Nombre',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'segundo_nombre_men',
      title: 'Segundo Nombre',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'primer_apellido_men',
      title: 'Primer Apelllido',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'segundo_apellido_men',
      title: 'Segundo Apellido',
      cellStyle: { minWidth: 100 }
    },
    {
      field: 'nombre_ciu',
      title: 'Ciudad'
    },
    {
      field: 'direccion_men',
      title: 'Dirección',
      cellStyle: { minWidth: 175 }
    },
    {
      field: 'telefono_men',
      title: 'Teléfono',
      cellStyle: { minWidth: 130 }
    },
    {
      field: 'email_men',
      title: 'Email',
      width: '400'
    }
  ]

  const mensajeroInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Agregar Nuevo Mensajero</Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="codigo_tipo_men" label="Tipo Interlocutor" defaultValue="1" disabled="true"
          fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="nit_men" label="Nit del Interlocutor" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"  >Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_men"
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
        <Grid item xs={12} md={6}> <TextField name="primer_nombre_men" label="Primero Nombre" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="segundo_nombre_men" label="Segundo Nombre" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="primer_apellido_men" label="Primer Apellido" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="segundo_apellido_men" label="Segundo Apellido" onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_men"
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
        <Grid item xs={12} md={12}>
          <TextField name="direccion_men" label="Direccion" onChange={handleChange} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="email_men" label="Email" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad" >Empresa</InputLabel>
            <Select
              labelId="selecEmpresa"
              name="empresa_men"
              id="idselectEmpresa"
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField name="telefono_men" label="Telefono" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_creacion_men"
            defaultValue={Moment(mensajerosSeleccionado.fechaactual).format('YYYY-MM-DD')} label="Fecha de Creación"
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_modificacion_men"
            defaultValue={Moment(mensajerosSeleccionado.fechaactual).format('YYYY-MM-DD')} label="Fecha Modificación"
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="datetime-local" InputLabelProps={{ shrink: true }} name="horainicia_men"
            defaultValue={Moment(mensajerosSeleccionado.horaactual).format('YYYY-MM-DD HH:mm:ss')} label="Fecha-Hora Disponibilidad"
            fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="datetime-local" InputLabelProps={{ shrink: true }} name="horafinal_men"
            defaultValue={Moment(mensajerosSeleccionado.horaactual).format('YYYY-MM-DD HH:mm:ss')} label="Fecha-Hora Final"
            fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => grabarMensajero()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const mensajeroEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block">Actualizar Mensajero</Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} md={6}> <TextField name="codigo_tipo_men" label="Tipo Interlocutor" defaultValue="1" disabled="true"
          fullWidth onChange={handleChange} value={mensajerosSeleccionado && mensajerosSeleccionado.codigo_tipo_men} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="nit_men" label="Nit del Interlocutor" fullWidth
          onChange={handleChange} value={mensajerosSeleccionado && mensajerosSeleccionado.nit_men} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado"  >Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_men"
              id="idselectEstado"
              fullWidth
              onChange={handleChange} value={mensajerosSeleccionado && mensajerosSeleccionado.estado_men}
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
        <Grid item xs={12} md={6}> <TextField name="primer_nombre_men" label="Primero Nombre" fullWidth
          onChange={handleChange} value={mensajerosSeleccionado && mensajerosSeleccionado.primer_nombre_men} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="segundo_nombre_men" label="Segundo Nombre" fullWidth
          onChange={handleChange} value={mensajerosSeleccionado && mensajerosSeleccionado.segundo_nombre_men} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="primer_apellido_men" label="Primer Apellido" fullWidth
          onChange={handleChange} value={mensajerosSeleccionado && mensajerosSeleccionado.primer_apellido_men} />
        </Grid>
        <Grid item xs={12} md={6}> <TextField name="segundo_apellido_men" label="Segundo Apellido" fullWidth
          onChange={handleChange} value={mensajerosSeleccionado && mensajerosSeleccionado.segundo_apellido_men} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad"  >Ciudad</InputLabel>
            <Select
              labelId="selecCiudad"
              name="ciudad_men"
              id="idselectCiudad"
              fullWidth
              onChange={handleChange}
              onChange={handleChange} value={mensajerosSeleccionado && mensajerosSeleccionado.ciudad_men}
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
        <Grid item xs={12} md={12}>
          <TextField name="direccion_men" label="Direccion" fullWidth onChange={handleChange}
            value={mensajerosSeleccionado && mensajerosSeleccionado.direccion_men} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="email_men" label="Email" fullWidth onChange={handleChange}
            value={mensajerosSeleccionado && mensajerosSeleccionado.email_men} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudad" >Empresa</InputLabel>
            <Select
              labelId="selecEmpresa"
              name="empresa_men"
              id="idselectEmpresa"
              fullWidth
              onChange={handleChange}
              onChange={handleChange} value={mensajerosSeleccionado && mensajerosSeleccionado.empresa_men}
            >
              <MenuItem value=""> <em>None</em> </MenuItem>
              {
                listarEmpresas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_emp}>{itemselect.nombre_emp}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField name="telefono_men" label="Telefono" fullWidth onChange={handleChange}
            value={mensajerosSeleccionado && mensajerosSeleccionado.telefono_men}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_creacion_men" fullWidth onChange={handleChange} 
            defaultValue={Moment(mensajerosSeleccionado.fecha_creacion_men).format('YYYY-MM-DD')} label="Fecha de Creación" />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField type="date" InputLabelProps={{ shrink: true }} name="fecha_modificacion_men" fullWidth onChange={handleChange}
            defaultValue={Moment(mensajerosSeleccionado.fecha_modificacion_men).format('YYYY-MM-DD')} label="Fecha Modificación" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField InputLabelProps={{ shrink: true }} name="horainicia_men" fullWidth onChange={handleChange}
            defaultValue={Moment(mensajerosSeleccionado.horainicia_men).format('YYYY-MM-DD HH:mm:ss')} label="Fecha-Hora Disponibilidad"/>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField InputLabelProps={{ shrink: true }} name="horafinal_men" fullWidth onChange={handleChange} 
            defaultValue={Moment(mensajerosSeleccionado.horafinal_men).format('YYYY-MM-DD HH:mm:ss')} label="Fecha-Hora Final"/>
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarMensajero()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const mensajeroEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Mensajero <b>{mensajerosSeleccionado && mensajerosSeleccionado.primer_nombre_men}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarMensajero()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={() => abrirCerrarModalInsertar()} >Agregar Mensajero</Button>
      <MaterialTable
        columns={columnas}
        data={listarMensajeros}
        title="MAESTRA DE MENSAJEROS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Mensajero',
            onClick: (event, rowData) => seleccionarMensajero(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Mensajero',
            onClick: (event, rowData) => seleccionarMensajero(rowData, "Eliminar")
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
        detailPanel={[
          {
            tooltip: 'Datos de Fechas',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#9e9e9e',
                  }}
                >
                  <Button variant="contained">Fecha de Creación : {rowData.fecha_creacion_men}</Button> {}
                  <Button variant="contained">Fecha de Modificación  : {rowData.fecha_modificacion_men}</Button> {}
                </div>
              )
            },
          },
        ]}
      />
      {}

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {mensajeroInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {mensajeroEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {mensajeroEliminar}
      </Modal>
    </div>
  );
}

export default Mensajeros;

