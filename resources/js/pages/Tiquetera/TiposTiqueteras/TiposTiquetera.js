import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import tipostiqueteraServices from "../../../services/Tiquetera/TiposTiquetera";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Parameters/Empresa";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
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
    minWidth: 315,
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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="%"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function TiposTiquetera() {
  const styles = useStyles();
  const [listTiposTiqueteras, setListTiposTiqueteras] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tiposTiqueterasSeleccionado, setTiposTiqueterasSeleccionado] = useState({
    id_ttk: "",
    nombre_ttk: "",
    descripcion_ttk: "",
    valor_ttk: "",
    empresa_ttk: "",
    estado_ttk: ""
  })

  useEffect(() => {
    async function fetchDataTiposTiqueteras() {
      const res = await tipostiqueteraServices.listtipostiquetera();
      setListTiposTiqueteras(res.data);
      setActualiza(false);
    }
    fetchDataTiposTiqueteras();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

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

    setTiposTiqueterasSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTiposTiqueteras = (tiposservicio, caso) => {
    setTiposTiqueterasSeleccionado(tiposservicio);
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

  const grabarTiposTiqueteras = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposTiqueterasSeleccionado.nombre_ttk) {
      errors.nombre_ttk = true;
      formOk = false;
    }

    if (!tiposTiqueterasSeleccionado.descripcion_ttk) {
      errors.descripcion_ttk = true;
      formOk = false;
    }

    if (!tiposTiqueterasSeleccionado.valor_ttk) {
      errors.valor_ttk = true;
      formOk = false;
    }

    if (!tiposTiqueterasSeleccionado.empresa_ttk) {
      errors.empresa_ttk = true;
      formOk = false;
    }

    if (!tiposTiqueterasSeleccionado.estado_ttk) {
      errors.estado_ttk = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tiposTiqueterasSeleccionado);
      const res = await tipostiqueteraServices.save(tiposTiqueterasSeleccionado);

      if (res.success) {
        swal("Tipos Tiqueteras", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiposTiqueterasSeleccionado.descripcion_ttk;
        delete tiposTiqueterasSeleccionado.empresa_ttk;
        delete tiposTiqueterasSeleccionado.estado_ttk;
      } else {
        alert("");
        swal("Tipos Tiqueteras", "Error Creando el Tipo de Tiquetera!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Tipos Tiqueteras", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarTiposTiqueteras = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposTiqueterasSeleccionado.nombre_ttk) {
      errors.nombre_ttk = true;
      formOk = false;
    }

    if (!tiposTiqueterasSeleccionado.descripcion_ttk) {
      errors.nombre_ttk = true;
      formOk = false;
    }

    if (!tiposTiqueterasSeleccionado.valor_ttk) {
      errors.valor_ttk = true;
      formOk = false;
    }

    if (!tiposTiqueterasSeleccionado.empresa_ttk) {
      errors.empresa_ttk = true;
      formOk = false;
    }

    if (!tiposTiqueterasSeleccionado.estado_ttk) {
      errors.estado_ttk = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await tipostiqueteraServices.update(tiposTiqueterasSeleccionado);

      if (res.success) {
        swal("Tipos Tiqueteras", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tiposTiqueterasSeleccionado.descripcion_ttk;
        delete tiposTiqueterasSeleccionado.empresa_ttk;
        delete tiposTiqueterasSeleccionado.estado_ttk;
      } else {
        swal("Tipos Tiqueteras", "Error Actualizando el Tipo de Tiquetera!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Tipos Tiqueteras", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarTiposTiqueteras = async () => {

    const res = await tipostiqueteraServices.delete(tiposTiqueterasSeleccionado.id_ttk);

    if (res.success) {
      swal("Tipos Tiqueteras", "Actualizadaode forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Tipos Tiqueteras", "Creada de forma Correcta!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_ttk',
      type: 'numeric'
    },
    {
      title: 'Nombre',
      field: 'nombre_ttk'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_ttk'
    },
    {
      title: 'Valor Descuento',
      field: 'valor_ttk'
    },
    {
      title: 'Código',
      field: 'empresa_ttk'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_ttk'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const tipostiqueterasInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Tipo de Tiquetera
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Nombre Tiquetera" name="nombre_ttk" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_ttk" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} name="valor_ttk" label="Valor Descuento" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_ttk"
              id="idselectEmpresa"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
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
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_ttk"
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
        <Button color="primary" onClick={() => grabarTiposTiqueteras()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tipostiqueterasEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Tipo de Tiquetera
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Nombre Tiquetera" name="nombre_ttk" onChange={handleChange}
            value={tiposTiqueterasSeleccionado && tiposTiqueterasSeleccionado.nombre_ttk} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_ttk" onChange={handleChange}
            value={tiposTiqueterasSeleccionado && tiposTiqueterasSeleccionado.descripcion_ttk} />
        </Grid>
        <Grid item xs={12} md={12}>  
          <TextField className={styles.inputMaterial} name="valor_ttk" label="Valor Descuento" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            value={tiposTiqueterasSeleccionado && tiposTiqueterasSeleccionado.valor_ttk}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_ttk"
              id="idselectEmpresa"
              onChange={handleChange}
              value={tiposTiqueterasSeleccionado && tiposTiqueterasSeleccionado.empresa_ttk}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
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
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_ttk"
              id="idselectEstado"
              onChange={handleChange}
              value={tiposTiqueterasSeleccionado && tiposTiqueterasSeleccionado.estado_ttk}
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
        <Button color="primary" onClick={() => actualizarTiposTiqueteras()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tipostiqueterasEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Tiquetera <b>{tiposTiqueterasSeleccionado && tiposTiqueterasSeleccionado.nombre_ttk}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarTiposTiqueteras()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={() => abrirCerrarModalInsertar()} >Agregar Tipo de Tiquetera</Button>
      <MaterialTable
        columns={columnas}
        data={listTiposTiqueteras}
        title="MAESTRA DE TIQUETERAS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipo de Tiquetera',
            onClick: (event, rowData) => seleccionarTiposTiqueteras(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tipo de Tiquetera',
            onClick: (event, rowData) => seleccionarTiposTiqueteras(rowData, "Eliminar")
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
        {tipostiqueterasInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {tipostiqueterasEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {tipostiqueterasEliminar}
      </Modal>
    </div>
  );
}

export default TiposTiquetera;
