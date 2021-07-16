import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import tiqueterasServices from "../../../services/Tiquetera/Tiquetera";
import tipostiqueterasServices from "../../../services/Tiquetera/TiposTiquetera";
import clientesServices from "../../../services/Interlocutores/Clientes";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Parameters/Empresa";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 500,
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
    minWidth: 415,
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
      prefix="$"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function Tiqueteras() {
  const styles = useStyles();
  const [listTiqueteras, setListTiqueteras] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarTiposTiqueteras, setListarTiposTiqueteras] = useState([]);
  const [listarClientes, setListarClientes] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tiqueterasSeleccionado, setTiqueterasSeleccionado] = useState({
      id_tik: "",
      nombre_tik: "",
      tipotiquetera_tik: "",
      cliente_tik: "",
      valor_tik: "",
      valorconsumo_tik: "",
      saldo_tik: 0,
      estado_tik: 0,
      observacion_tik: 0,
  })

  useEffect(() => {
    async function fetchDataTiqueteras() {
      const res = await tiqueterasServices.listtiquetera();
      setListTiqueteras(res.data);
      setActualiza(false);
    }
    fetchDataTiqueteras();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataTiposTiqueteras() {
      const res = await tipostiqueterasServices.listtipostiquetera();
      setListarTiposTiqueteras(res.data);
    }
    fetchDataTiposTiqueteras();
  }, [])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data);
    }
    fetchDataClientes();
  }, [])

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

    setTiqueterasSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTiqueteras = (tiqueteras, caso) => {
    setTiqueterasSeleccionado(tiqueteras);
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

  const grabarTiqueteras = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiqueterasSeleccionado.nombre_tik) {
      errors.nombre_tik = true;
      formOk = false;
    }

    if (!tiqueterasSeleccionado.tipotiquetera_tik) {
      errors.tipotiquetera_tik = true;
      formOk = false;
    }

    if (!tiqueterasSeleccionado.cliente_tik) {
      errors.cliente_tik = true;
      formOk = false;
    }

    if (!tiqueterasSeleccionado.valor_tik) {
      errors.valor_tik = true;
      formOk = false;
    }

    if (!tiqueterasSeleccionado.valorconsumo_tik) {
      errors.valorconsumo_tik = true;
      formOk = false;
    }

    if (!tiqueterasSeleccionado.saldo_tik) {
      errors.saldo_tik = true;
      formOk = false;
    }

    if (!tiqueterasSeleccionado.estado_tik) {
      errors.estado_tik = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tiqueterasSeleccionado);
      const res = await tiqueterasServices.save(tiqueterasSeleccionado);

      if (res.success) {
        swal("Tiqueteras", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiqueterasSeleccionado.nombre_tik;
        delete tiqueterasSeleccionado.tipotiquetera_tik;
        delete tiqueterasSeleccionado.cliente_tik;
        delete tiqueterasSeleccionado.valor_tik;
        delete tiqueterasSeleccionado.valorconsumo_tik;
        delete tiqueterasSeleccionado.saldo_tik;
        delete tiqueterasSeleccionado.estado_tik;
        delete tiqueterasSeleccionado. observacion_tik;
        delete tiqueterasSeleccionado.empresa_tar;
      } else {
        alert("");
        swal("Tiqueteras", "Error Creando la Tiquetera!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Tiqueteras", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarTiqueteras = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;
/*
    if (!tiqueterasSeleccionado.nombre_tik) {
      alert("1")
      errors.nombre_tik = true;
      formOk = false;
    }
*/
    if (!tiqueterasSeleccionado.tipotiquetera_tik) {
      alert("2")
      errors.tipotiquetera_tik = true;
      formOk = false;
    }

    if (!tiqueterasSeleccionado.cliente_tik) {
      alert("3")
      errors.cliente_tik = true;
      formOk = false;
    }
/*
    if (!tiqueterasSeleccionado.valor_tik) {
      alert("4")
      errors.valor_tik = true;
      formOk = false;
    }

    if (!tiqueterasSeleccionado.valorconsumo_tik) {
      alert("5")
      errors.valorconsumo_tik = true;
      formOk = false;
    }

    if (!tiqueterasSeleccionado.saldo_tik) {
      alert("6")
      errors.saldo_tik = true;
      formOk = false;
    }
*/
    if (!tiqueterasSeleccionado.estado_tik) {
      alert("7")
      errors.estado_tik = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await tiqueterasServices.update(tiqueterasSeleccionado);

      if (res.success) {
        swal("Tiqueteras", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
      } else {
        swal("Tiqueteras", "Error Actualizando la Tiquetera!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Tiqueteras", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarTiqueteras = async () => {

    const res = await tiqueterasServices.delete(tiqueterasSeleccionado.id_tik);

    if (res.success) {
      swal("Tiqueteras", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Tiqueteras", "Creada de forma Correcta!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tik'
    },
    {
      title: 'Nombre',
      field: 'nombre_tik',
      cellStyle: { minWidth: 300 }
    },
    {
      title: 'Tipo Tiquetera',
      field: 'nombre_ttk'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli'
    },
    {
      title: 'Valor Tiquetera',
      field: 'valor_tik'
    },
    {
      title: 'Utilizado',
      field: 'valorconsumo_tik'
    },
    {
      title: 'Saldo',
      field: 'saldo_tik'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    },
    {
      title: 'Observación',
      field: 'observacion_tik',
      cellStyle: { minWidth: 300 }
    }
  ]

  const tiqueterasInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Tiquetera
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Nombre Tiquetera" name="nombre_tik" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Tipo Tiquetera</InputLabel>
            <Select
              labelId="selectTipoTiquetera"
              name="tipotiquetera_tik"
              id="idselectTipoTiquetera"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarTiposTiqueteras.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ttk}>{itemselect.nombre_ttk}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCliente">Cliente</InputLabel>
            <Select
              labelId="selectCliente"
              name="cliente_tik"
              id="idselectCliente"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>      
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="valor_tik" label="Valor Tiquetera" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="valorconsumo_tik" label="Utilizado" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="saldo_tik" label="Saldo" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_tik"
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
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Observación" name="observacion_tik" onChange={handleChange} />
        </Grid>
      </Grid>
      <div align="right">
        <Button color="primary" onClick={() => grabarTiqueteras()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tiqueterasEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Tiquetera
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Nombre Tiquetera" name="nombre_tik" onChange={handleChange}
                     value={tiqueterasSeleccionado && tiqueterasSeleccionado.nombre_tik} />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Tipo Tiquetera</InputLabel>
            <Select
              labelId="selectTipoTiquetera"
              name="tipotiquetera_tik"
              id="idselectTipoTiquetera"
              onChange={handleChange}
              value={tiqueterasSeleccionado && tiqueterasSeleccionado.tipotiquetera_tik}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarTiposTiqueteras.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_ttk}>{itemselect.nombre_ttk}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCliente">Cliente</InputLabel>
            <Select
              labelId="selectCliente"
              name="cliente_tik"
              id="idselectCliente"
              onChange={handleChange}
              value={tiqueterasSeleccionado && tiqueterasSeleccionado.cliente_tik}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>      
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="valor_tik" label="Valor Tiquetera" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange} value={tiqueterasSeleccionado && tiqueterasSeleccionado.valor_tik}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="valorconsumo_tik" label="Utilizado" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange}  value={tiqueterasSeleccionado && tiqueterasSeleccionado.valorconsumo_tik}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField className={styles.inputMaterial} name="saldo_tik" label="Saldo" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange} value={tiqueterasSeleccionado && tiqueterasSeleccionado.saldo_tik}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_tik"
              id="idselectEstado"
              onChange={handleChange}
              value={tiqueterasSeleccionado && tiqueterasSeleccionado.estado_tik}
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
          <TextField className={styles.inputMaterial} label="Observación" name="observacion_tik" 
                     onChange={handleChange} value={tiqueterasSeleccionado && tiqueterasSeleccionado.observacion_tik} />
        </Grid>
      </Grid>
      <div align="right">
        <Button color="primary" onClick={() => actualizarTiqueteras()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tiqueterasEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Tiquetera <b>{tiqueterasSeleccionado && tiqueterasSeleccionado.nombre_tik}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarTiqueteras()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={() => abrirCerrarModalInsertar()} >
        Agregar Tiquetera
      </Button>
      <MaterialTable
        columns={columnas}
        data={listTiqueteras}
        title="CONSULTAR TIQUETERAS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tiquetera',
            onClick: (event, rowData) => seleccionarTiqueteras(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tiquetera',
            onClick: (event, rowData) => seleccionarTiqueteras(rowData, "Eliminar")
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
        {tiqueterasInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {tiqueterasEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {tiqueterasEliminar}
      </Modal>
    </div>
  );
}

export default Tiqueteras;
