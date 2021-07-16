import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import zonasServices from "../../../services/Pedidos/Zonas";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Parameters/Empresa";

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
    minWidth: 517,
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
}));

function Zonas() {
  const styles = useStyles();
  const [listZonas, setListZonas] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [zonasSeleccionado, setZonasSeleccionado] = useState({
    id_zon: "",
    nombre_zon: "",
    descripcion_zon: "",
    estado_zon: ""
  })

  useEffect(() => {
    async function fetchDataZonas() {
      const res = await zonasServices.listzonas();
      setListZonas(res.data);
      setActualiza(false);
    }
    fetchDataZonas();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setZonasSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarZonas = (zona, caso) => {
    setZonasSeleccionado(zona);
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

  const grabarZonas = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!zonasSeleccionado.nombre_zon) {
      errors.nombre_zon = true;
      formOk = false;
    }

    if (!zonasSeleccionado.descripcion_zon) {
      errors.descripcion_zon = true;
      formOk = false;
    }

    if (!zonasSeleccionado.estado_zon) {
      errors.estado_zon = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(zonasSeleccionado);
      const res = await zonasServices.save(zonasSeleccionado);

      if (res.success) {
        swal("Tipos de Zona", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete zonasSeleccionado.descripcion_zon;
        delete zonasSeleccionado.empresa_zon;
        delete zonasSeleccionado.estado_zon;
      } else {
        alert("");
        swal("Tipos de Zona", "Error Creando la Zona!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Tipos de Zona", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarZonas = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!zonasSeleccionado.nombre_zon) {
      errors.nombre_zon = true;
      formOk = false;
    }

    if (!zonasSeleccionado.descripcion_zon) {
      errors.descripcion_zon = true;
      formOk = false;
    }

    if (!zonasSeleccionado.estado_zon) {
      errors.estado_zon = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await zonasServices.update(zonasSeleccionado);

      if (res.success) {
        swal("Tipos de Zona", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete zonasSeleccionado.descripcion_zon;
        delete zonasSeleccionado.empresa_zon;
        delete zonasSeleccionado.estado_zon;
      } else {
        swal("Tipos de Zona", "Error Actualizando la Zona!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Tipos de Zona", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarzona = async () => {

    const res = await zonasServices.delete(zonasSeleccionado.id_zon);

    if (res.success) {
      swal("Tipos de Zona", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Tipos de Zona", "Creada de forma Correcta!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_zon'
    },
    {
      title: 'Nombre',
      field: 'nombre_zon'
    },
    {
      title: 'Descripción',
      field: 'descripcion_zon',
      cellStyle: { minWidth: 500 }
    },
    {
      title: 'Estado',
      field: 'estado_zon'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const zonaInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Zona
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Nombre" name="nombre_zon" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_zon" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_zon"
              id="idselectEstado"
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
      </Grid>
      <div align="right">
        <Button color="primary" onClick={() => grabarZonas()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const zonaEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Tipo de Servicio
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Nombre" name="nombre_zon" onChange={handleChange} 
                     value={zonasSeleccionado && zonasSeleccionado.nombre_zon} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_zon" onChange={handleChange} 
                     value={zonasSeleccionado && zonasSeleccionado.descripcion_zon} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_zon"
              id="idselectEstado"
              onChange={handleChange}
              value={zonasSeleccionado && zonasSeleccionado.estado_zon} 
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
      </Grid>
      <div align="right">
        <Button color="primary" onClick={() => actualizarZonas()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const zonaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Zona <b>{zonasSeleccionado && zonasSeleccionado.nombre_zon}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarzona()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={() => abrirCerrarModalInsertar()} >Agregar Zona</Button>
      <MaterialTable
        columns={columnas}
        data={listZonas}
        title="MAESTRA DE ZONAS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Zona',
            onClick: (event, rowData) => seleccionarZonas(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Zona',
            onClick: (event, rowData) => seleccionarZonas(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
      />{ }
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {zonaInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {zonaEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {zonaEliminar}
      </Modal>
    </div>
  );
}

export default Zonas;
