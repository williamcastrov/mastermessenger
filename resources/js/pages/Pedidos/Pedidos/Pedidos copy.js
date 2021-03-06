import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import Moment from 'moment';
import swal from 'sweetalert';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

// Componentes de Conexion con el Backend
import pedidosServices from "../../../services/Pedidos/Pedidos";
import clientesServices from "../../../services/Interlocutores/Clientes";
import tipospedidosServices from "../../../services/Pedidos/TiposPedidos";
import zonasServices from "../../../services/Pedidos/Zonas";
import tarifasServices from "../../../services/Pedidos/Tarifas";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import estadosServices from "../../../services/Parameters/Estados";
import empresasServices from "../../../services/Parameters/Empresa";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 880,
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
    minWidth: 380,
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

function Pedidos() {
  const styles = useStyles();
  const [listarPedidosServicio, setListarPedidosServicio] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarClientes, setListarClientes] = useState([]);
  const [listarTiposPedidos, setListarTiposPedidos] = useState([]);
  const [listarZonas, setListarZonas] = useState([]);
  const [listarTarifas, setListarTarifas] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const fechaactual = Moment(new Date()).format('YYYY-MM-DD');
  const horaactual = Moment(new Date()).format('HH:mm:ss')

  const [pedidosSeleccionado, setPedidosSeleccionado] = useState({
    id_ped: "",
    cliente_ped: "",
    tipopedido_ped: "",
    zona_ped: "",
    ciudad_ped: "",
    tarifa_ped: "",
    telefonorecogida_ped: "",
    telefonoentrega_ped: "",
    fechapedido_ped: "",
    direccionrecogida_ped: "",
    nombrerecogida_ped: "",
    direccionentrega_ped: "",
    nombreentrega_ped: "",
    fechahorarecogida_ped: "",
    fechahoraentrega_ped: "",
    estado_ped: "",
    empresa_ped: "",
    observaci??n_ped: ""
  })

  useEffect(() => {
    async function fetchDataPedidos() {
      const res = await pedidosServices.listpedidos();
      setListarPedidosServicio(res.data);
      setActualiza(false);
    }
    fetchDataPedidos();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data);
    }
    fetchDataClientes();
  }, [])

  useEffect(() => {
    async function fetchDataTiposPedidos() {
      const res = await tipospedidosServices.listtipospedidos();
      setListarTiposPedidos(res.data)
      console.log(res.data);
    }
    fetchDataTiposPedidos();
  }, [])

  useEffect(() => {
    async function fetchDataZonas() {
      const res = await zonasServices.listzonas();
      setListarZonas(res.data)
      console.log(res.data);
    }
    fetchDataZonas();
  }, [])

  useEffect(() => {
    async function fetchDataTarifas() {
      const res = await tarifasServices.listtarifas();
      setListarTarifas(res.data)
      console.log(res.data);
    }
    fetchDataTarifas();
  }, [])

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListarCiudades(res.data)
      console.log(res.data);
    }
    fetchDataCiudades();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      console.log(res.data);
    }
    fetchDataEmpresas();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setPedidosSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarPedido = (tarifas, caso) => {
    setPedidosSeleccionado(tarifas);
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

  const grabarPedido = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!pedidosSeleccionado.cliente_ped) {
      alert("1")
      errors.cliente_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.tipopedido_ped) {
      alert("2")
      errors.tipopedido_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.zona_ped) {
      alert("3")
      errors.zona_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.ciudad_ped) {
      alert("4")
      errors.ciudad_ped = true;
      formOk = false;
    }
/*
    if (!pedidosSeleccionado.tarifa_ped) {
      alert("5")
      errors.tarifa_ped = true;
      formOk = false;
    }
*/
    if (!pedidosSeleccionado.telefonorecogida_ped) {
      alert("6")
      errors.telefonorecogida_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.telefonoentrega_ped) {
      alert("7")
      errors.telefonoentrega_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.direccionrecogida_ped) {
      alert("8")
      errors.direccionrecogida_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.nombrerecogida_ped) {
      alert("9")
      errors.nombrerecogida_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.direccionentrega_ped) {
      alert("10")
      errors.direccionentrega_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.nombreentrega_ped) {
      alert("11")
      errors.nombreentrega_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.fechahorarecogida_ped) {
      alert("12")
      errors.fechahorarecogida_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.fechahoraentrega_ped) {
      alert("13")
      errors.fechahoraentrega_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.estado_ped) {
      alert("14")
      errors.estado_ped = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(pedidosSeleccionado);
      const res = await pedidosServices.save(pedidosSeleccionado);

      if (res.success) {
        swal("Pedido", "Creada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete pedidosSeleccionado.cliente_ped;
        delete pedidosSeleccionado.tipopedido_ped;
        delete pedidosSeleccionado.zona_ped;
        delete pedidosSeleccionado.ciudad_ped;
        delete pedidosSeleccionado.tarifa_ped;
        delete pedidosSeleccionado.telefonorecogida_ped;
        delete pedidosSeleccionado.telefonoentrega_ped;
        delete pedidosSeleccionado.fechapedido_ped;
        delete pedidosSeleccionado.direccionrecogida_ped;
        delete pedidosSeleccionado.nombrerecogida_ped;
        delete pedidosSeleccionado.direccionentrega_ped;
        delete pedidosSeleccionado.nombreentrega_ped;
        delete pedidosSeleccionado.fechahorarecogida_ped;
        delete pedidosSeleccionado.fechahoraentrega_ped;
      } else {
        alert("");
        swal("Pedido", "Error Creando el Pedido!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Pedido", "Debe Ingresar Todos los Datos, Revisar la Informaci??n!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarPedido = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!pedidosSeleccionado.cliente_ped) {
      alert("1")
      errors.cliente_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.tipopedido_ped) {
      alert("2")
      errors.tipopedido_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.zona_ped) {
      alert("3")
      errors.zona_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.ciudad_ped) {
      alert("4")
      errors.ciudad_ped = true;
      formOk = false;
    }
/*
    if (!pedidosSeleccionado.tarifa_ped) {
      alert("5")
      errors.tarifa_ped = true;
      formOk = false;
    }
*/
    if (!pedidosSeleccionado.telefonorecogida_ped) {
      alert("6")
      errors.telefonorecogida_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.telefonoentrega_ped) {
      alert("7")
      errors.telefonoentrega_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.direccionrecogida_ped) {
      alert("8")
      errors.direccionrecogida_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.nombrerecogida_ped) {
      alert("9")
      errors.nombrerecogida_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.direccionentrega_ped) {
      alert("10")
      errors.direccionentrega_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.nombreentrega_ped) {
      alert("11")
      errors.nombreentrega_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.fechahorarecogida_ped) {
      alert("12")
      errors.fechahorarecogida_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.fechahoraentrega_ped) {
      alert("13")
      errors.fechahoraentrega_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.estado_ped) {
      alert("14")
      errors.estado_ped = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await pedidosServices.update(pedidosSeleccionado);

      if (res.success) {
        swal("Pedido", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
      } else {
        swal("Pedido", "Error Actualizando el Pedido!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Pedido", "Debe Ingresar Todos los Datos, Revisar la Informaci??n!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarPedido = async () => {

    const res = await pedidosServices.delete(pedidosSeleccionado.id_ped);

    if (res.success) {
      swal("Pedido", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Pedido", "Creada de forma Correcta!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_ped'
    },
    {
      title: 'Cliente',
      field: 'primer_nombre_cli'
    },
    {
      title: 'Tipo Pedido',
      field: 'descripcion_tpd'
    },
    {
      title: 'Zona',
      field: 'nombre_zon'
    },
    {
      title: 'Ciudad',
      field: 'nombre_ciu'
    },
    {
      title: 'Tarifa',
      field: 'valor_tar'
    },
    {
      title: 'Fecha-Hora Recogida',
      field: 'fechahorarecogida_ped'
    },
    {
      title: 'Fecha-Hora Entrega',
      field: 'fechahoraentrega_ped'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    },
    {
      title: 'Observaci??n',
      field: 'observacion_ped',
      cellStyle: { minWidth: 300 }
    }
  ]

  const pedidoInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Pedido
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCliente">Cliente</InputLabel>
            <Select
              labelId="selectCliente"
              name="cliente_ped"
              id="idselectCliente"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cli}>{itemselect.primer_nombre_cli}{" "}
                      {itemselect.segundo_nombre_cli}{" "}{itemselect.primer_apellido_cli}
                    </MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectTipoPedido">Tipo de Pedido</InputLabel>
            <Select
              labelId="selectTipoPedido"
              name="tipopedido_ped"
              id="idselectTipoPedido"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarTiposPedidos.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tpd}>{itemselect.descripcion_tpd}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectZona">Zona</InputLabel>
            <Select
              labelId="selectZona"
              name="zona_ped"
              id="idselectZona"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarZonas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_zon}>{itemselect.nombre_zon}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Ciudad</InputLabel>
            <Select
              labelId="selectCiudad"
              name="ciudad_ped"
              id="idselectCiudad"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
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
            <InputLabel id="idselectTarifa">Tarifa</InputLabel>
            <Select
              labelId="selectTarifa"
              name="tarifa_ped"
              id="idselectTarifa"
              onChange={handleChange}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarTarifas.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_tar}>{itemselect.nombre_tar}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="telefonorecogida_ped" label="Tel??fono Recogida" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="telefonoentrega_ped" label="Tel??fono Entrega" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="datetime" InputLabelProps={{ shrink: true }} name="fechapedido_ped" label="Fecha Pedido"
            fullWidth defaultValue={Moment(fechaactual).format('YYYY-MM-DD')} onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="direccionrecogida_ped" label="Direcci??n de Recogida" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="nombrerecogida_ped" label="Nombre persona recogida" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="direccionentrega_ped" label="Direcci??n de Entrega" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="nombreentrega_ped" label="Nombre persona entrega" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="datetime-local" InputLabelProps={{ shrink: true }} name="fechahorarecogida_ped"
            label="Fecha y Hora Recogida" fullWidth defaultValue={Moment(fechaactual).format('YYYY-MM-DD HH:mm:ss')}
            onChange={handleChange}  /*onChange={(e) => setFechaIniciaTransporte(e.target.value)} */ />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="datetime-local" InputLabelProps={{ shrink: true }} name="fechahoraentrega_ped"
            label="Fecha y Hora Entrega" fullWidth defaultValue={Moment(fechaactual).format('YYYY-MM-DD HH:mm:ss')}
            onChange={handleChange} /*onChange={(e) => setFechaFinalTransporte(e.target.value)}*/ />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_ped"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_ped"
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
          <TextField className={styles.inputMaterial} label="Observaci??n" name="observacion_ped" onChange={handleChange} />
        </Grid>
      </Grid>
      <div align="right">
        <Button color="primary" onClick={() => grabarPedido()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const pedidoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Tarifa
      </Typography>

      <div align="right">
        <Button color="primary" onClick={() => actualizarPedido()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const pedidoEliminar = (
    <div className={styles.modal}>
      <p>Est??s seguro que deseas eliminar el Pedido # <b>{pedidosSeleccionado && pedidosSeleccionado.id_ped}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarPedido()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={() => abrirCerrarModalInsertar()} >Agregar Pedido</Button>
      <MaterialTable
        columns={columnas}
        data={listarPedidosServicio}
        title="CONSULTA DE PEDIDOS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Pedido',
            onClick: (event, rowData) => seleccionarPedido(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Pedido',
            onClick: (event, rowData) => seleccionarPedido(rowData, "Eliminar")
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
        detailPanel={[
          {
            tooltip: 'Direcciones del Pedido',
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#0277bd',
                  }}
                >
                  <Button variant="contained">Recogida : {rowData.direccionrecogida_ped}</Button> {}
                  <Button variant="contained">Preguntar por  : {rowData.nombrerecogida_ped}</Button> {}
                  <Button variant="contained">Entregar :{rowData.direccionentrega_ped}</Button>{ }
                  <Button variant="contained">Preguntar por :{rowData.nombreentrega_ped}</Button>{ }
                </div>
              )
            },
          },
          {
            tooltip: 'Datos Auxiliares',
            icon: DoubleArrowIcon,
            render: rowData => {
              return (
                <div
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'white',
                    backgroundColor: '#0277bd',
                  }}
                >
                  <Button variant="contained">Fecha Pedido :{rowData.fechapedido_ped}</Button>{ }
                  <Button variant="contained">Tel Recogida : {rowData.telefonorecogida_ped}</Button> {}
                  <Button variant="contained">Tel Entrega : {rowData.telefonoentrega_ped}</Button> {}
                  
                  <Button variant="contained">Preguntar por :{rowData.nombreentrega_ped}</Button>{ }
                </div>
              )
            },
          },
        ]}
      />{ }
      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
      >
        {pedidoInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {pedidoEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {pedidoEliminar}
      </Modal>
    </div>
  );
}

export default Pedidos;
