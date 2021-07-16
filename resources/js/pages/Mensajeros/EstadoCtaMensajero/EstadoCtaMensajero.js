import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import Moment from 'moment';
import swal from 'sweetalert';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import Loading from "../../../components/Loading";

// Componentes de Conexion con el Backend
import pedidosServices from "../../../services/Pedidos/Pedidos";
import clientesServices from "../../../services/Interlocutores/Clientes";
import tipospedidosServices from "../../../services/Pedidos/TiposPedidos";
import zonasServices from "../../../services/Pedidos/Zonas";
import tarifasServices from "../../../services/Pedidos/Tarifas";
import tiqueteraServices from "../../../services/Tiquetera/Tiquetera";
import tipotiqueteraServices from "../../../services/Tiquetera/TiposTiquetera";
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
  modal2: {
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

function EstadoCtaMensajero(props) {
  const { metadata, tipousuario, idUsu, nombreUsuario } = props;
  console.log("METADATA : ", metadata)
  console.log("TIPO USUARIO : ", tipousuario)
  console.log("ID USU : ", idUsu)
  const styles = useStyles();

  const [modalCodigoCliente, setModalCodigoCliente] = useState(false);
  const [listarPedidosServicio, setListarPedidosServicio] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
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
  const [grabar, setGrabar] = React.useState(false);
  const [tarifa, setTarifa] = React.useState(0);
  const [descuentoTiquetera, setDescuentoTiquetera] = React.useState(0);
  const [descuentoVolumen, setDescuentoVolumen] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [cliente, setCliente] = useState(0);


  const [pedidosSeleccionado, setPedidosSeleccionado] = useState({
    id_ped: "",
    cliente_ped: "",
    tipopedido_ped: "",
    zona_ped: "",
    ciudadorigen_ped: "",
    ciudaddestino_ped: "",
    tarifa_ped: tarifa,
    descuentovolumen_ped: descuentoTiquetera,
    descuentotiquetera_ped: descuentoVolumen,
    pagacontratiquetera_ped: "N",
    telefonorecogida_ped: "",
    telefonoentrega_ped: "",
    fechapedido_ped: fechaactual,
    direccionrecogida_ped: "",
    nombrerecogida_ped: "",
    direccionentrega_ped: "",
    nombreentrega_ped: "",
    fechahorarecogida_ped: "",
    fechahoraentrega_ped: "",
    mensajero_ped: 0,
    fechaasigna_ped: fechaactual,
    estado_ped: 1,
    empresa_ped: 1,
    observación_ped: "",
    pagadomensajero_ped: 'N',
    pagadocliente_ped: 'N'
  })

  useEffect(() => {
    async function fetchDataPedidos() {
      const res = await pedidosServices.leerestadoctamensajero(idUsu);
      setListarPedidosServicio(res.data);
      //console.log("ESTADO DE CTA MENSAJERO  : ", res.data)
      setActualiza(false);
    }
    fetchDataPedidos();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataPedidos() {
      const res = await pedidosServices.leerestadoctamensajero(idUsu);
      setListarPedidosServicio(res.data);
      //console.log("ESTADO DE CTA MENSAJERO  : ", res.data)
    }
    fetchDataPedidos();
  }, [idUsu])

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
      //console.log(res.data);
    }
    fetchDataTiposPedidos();
  }, [])

  useEffect(() => {
    async function fetchDataZonas() {
      const res = await zonasServices.listzonas();
      setListarZonas(res.data)
      //console.log(res.data);
    }
    fetchDataZonas();
  }, [])

  useEffect(() => {
    async function fetchDataTarifas() {
      const res = await tarifasServices.listtarifas();
      setListarTarifas(res.data)
      //console.log(res.data);
    }
    fetchDataTarifas();
  }, [])

  useEffect(() => {
    async function fetchDataCiudades() {
      const res = await ciudadesServices.listCiudades();
      setListarCiudades(res.data)
      //console.log(res.data);
    }
    fetchDataCiudades();
  }, [])

  useEffect(() => {
    async function fetchDataEstados() {
      const res = await estadosServices.listEstados();
      setListarEstados(res.data)
      //console.log(res.data);
    }
    fetchDataEstados();
  }, [])

  useEffect(() => {
    async function fetchDataEmpresas() {
      const res = await empresasServices.listEmpresas();
      setListarEmpresas(res.data)
      //console.log(res.data);
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

  const leerDatosClientes = () => {
    leerModalCodigoCliente();
  }

  const abrirCerrarModalLoading = () => {
    if (loading)
      setLoading(false);
    else
      setLoading(true);
    setModalLoading(!modalLoading);
  }

  const leerModalCodigoCliente = () => {
    setModalCodigoCliente(!modalCodigoCliente);
  }

  const DatosClientes = (cliente) => {
    async function fetchLeerDatoCliente() {
      const res = await clientesServices.listUnCliente(cliente);

      //setListarUnEquipo(res.data);
      setCliente(res.data[0].id_cli);
      setDescuentoVolumen(res.data[0].descuentovolumen_cli);
      /*
      setEquipo(res.data[0].codigo_equ);
      setContacto(res.data[0].id_con);
      setCiudad(res.data[0].ciudad_con);
      setSubGrupoEquipo(res.data[0].subgrupoparte_equ);
      */
      //console.log("DATOS DEL CLIENTE SELECCIONADO : ", res.data[0])

    }
    fetchLeerDatoCliente();
  }

  const grabarPedido = async () => {
    abrirCerrarModalLoading();
    setFormError({});
    let errors = {};
    let formOk = true;
    /*
        if (!pedidosSeleccionado.cliente_ped) {
          alert("1")
          errors.cliente_ped = true;
          formOk = false;
        }
    */
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

    if (!pedidosSeleccionado.ciudadorigen_ped) {
      alert("4")
      errors.ciudadorigen_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.ciudaddestino_ped) {
      alert("41")
      errors.ciudaddestino_ped = true;
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
      {
        let pagacontratiquetera = "N";
        let codigotarifa = "" + pedidosSeleccionado.ciudadorigen_ped + pedidosSeleccionado.ciudaddestino_ped
        //console.log("CODIGO TARIFA : ", codigotarifa);
        const res = await tarifasServices.leetarifa(codigotarifa);
        //console.log("DATOS TARIFA : ", res.data[0].valor_tar);
        if (!res.data) {
          swal("Pedido", "Error Leyendo Tarida del pedido, Valida con el Administrador!", "warning", { button: "Aceptar" });
          return;
        }

        const rest = await tiqueteraServices.leertiqueteracliente(cliente);
        //console.log("DATOS TIQUETERA CLIENTE : ", rest.data[0].saldo_tik);

        if (!rest.data) {
          console.log("Cliente no maneja Tiquetera!");
        } else {
          if (rest.data[0].saldo_tik > 0) {
            pagacontratiquetera = "S";
          } else {
            pagacontratiquetera = "N";
          }
        }

        const result = await tipotiqueteraServices.listunatiquetera(rest.data[0].tipotiquetera_tik);
        //console.log("DATOS TIPO CLIENTE : ", result.data);

        //let tarifa = "" + pedidosSeleccionado.zona_ped + pedidosSeleccionado.ciudadorigen_ped + pedidosSeleccionado.ciudaddestino_ped + pedidosSeleccionado.tipopedido_ped

        setPedidosSeleccionado([{
          id_ped: 0,
          cliente_ped: cliente,
          tipopedido_ped: pedidosSeleccionado.tipopedido_ped,
          zona_ped: pedidosSeleccionado.zona_ped,
          ciudadorigen_ped: pedidosSeleccionado.ciudadorigen_ped,
          ciudaddestino_ped: pedidosSeleccionado.ciudaddestino_ped,
          tarifa_ped: res.data[0].valor_tar,
          descuentovolumen_ped: descuentoVolumen,
          descuentotiquetera_ped: result.data[0].valor_ttk,
          pagacontratiquetera_ped: pagacontratiquetera,
          telefonorecogida_ped: pedidosSeleccionado.telefonorecogida_ped,
          telefonoentrega_ped: pedidosSeleccionado.telefonoentrega_ped,
          fechapedido_ped: fechaactual,
          direccionrecogida_ped: pedidosSeleccionado.direccionrecogida_ped,
          nombrerecogida_ped: pedidosSeleccionado.nombrerecogida_ped,
          direccionentrega_ped: pedidosSeleccionado.direccionentrega_ped,
          nombreentrega_ped: pedidosSeleccionado.nombreentrega_ped,
          fechahorarecogida_ped: pedidosSeleccionado.fechahorarecogida_ped,
          fechahoraentrega_ped: pedidosSeleccionado.fechahoraentrega_ped,
          mensajero_ped: 0,
          fechaasigna_ped: fechaactual,
          estado_ped: 1,
          empresa_ped: 1,
          observacion_ped: pedidosSeleccionado.observacion_ped,
          pagadomensajero_ped: 'N',
          pagadocliente_ped: 'N'
        }]);
      }
      setGrabar(true);
    }
    else {
      swal("Pedido", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      //console.log(clientesSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  useEffect(() => {
    async function grabarPedido() {
      if (grabar) {
        //console.log("DATOS PEDIDO : ", pedidosSeleccionado[0]);

        const res = await pedidosServices.save(pedidosSeleccionado[0]);

        if (res.success) {
          swal("Pedido", "Creado de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalInsertar();
          delete pedidosSeleccionado.cliente_ped;
          delete pedidosSeleccionado.tipopedido_ped;
          delete pedidosSeleccionado.zona_ped;
          delete pedidosSeleccionado.ciudadorigen_ped;
          delete pedidosSeleccionado.ciudaddestino_ped;
          delete pedidosSeleccionado.tarifa_ped;
          delete pedidosSeleccionado.telefonorecogida_ped;
          delete pedidosSeleccionado.telefonoentrega_ped;
          delete pedidosSeleccionado.direccionrecogida_ped;
          delete pedidosSeleccionado.nombrerecogida_ped;
          delete pedidosSeleccionado.direccionentrega_ped;
          delete pedidosSeleccionado.nombreentrega_ped;
          delete pedidosSeleccionado.fechahorarecogida_ped;
          delete pedidosSeleccionado.fechahoraentrega_ped;
        } else {
          swal("Pedido", "Error Creando el Pedido!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalInsertar();
        }
        setActualiza(true);
        abrirCerrarModalLoading();
      }
    }
    grabarPedido();
  }, [grabar])

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

    if (!pedidosSeleccionado.ciudadorigen_ped) {
      alert("4")
      errors.ciudadorigen_ped = true;
      formOk = false;
    }

    if (!pedidosSeleccionado.ciudaddestino_ped) {
      alert("41")
      errors.ciudaddestino_ped = true;
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
      swal("Pedido", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
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
      title: 'Servicio#',
      field: 'id_ped'
    },
    {
      title: 'Fecha Servicio',
      field: 'fechaasigna_ped'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli',
      cellStyle: { minWidth: 200}
    },
    {
      title: 'Tipo Pedido',
      field: 'descripcion_tpd'
    },
    {
      title: 'Ciudad Origen',
      field: 'ciudadorigen'
    },
    {
      title: 'Ciudad Destino',
      field: 'ciudaddestino'
    },
    {
      title: 'Valor',
      field: 'valorapagar_ped'
    },
    {
      title: 'Cliente Pago',
      field: 'pagadocliente_ped'
    },
    {
      title: 'Pagado al Mensajero',
      field: 'pagadomensajero_ped'
    },
    {
      title: 'Calificacion',
      field: '0'
    },
    {
      title: 'Observación',
      field: 'observacion_ped',
      cellStyle: { minWidth: 200 }
    }
  ]

  const pedidoEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Pedido
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
              defaultValue={cliente}
              value={pedidosSeleccionado && pedidosSeleccionado.cliente_ped}
            >
              <MenuItem value="">  <em>None</em> </MenuItem>
              {
                listarClientes.map((itemselect) => {
                  return (
                    <MenuItem value={itemselect.id_cli}>{itemselect.razonsocial_cli}
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
              value={pedidosSeleccionado && pedidosSeleccionado.tipopedido_ped}
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
              value={pedidosSeleccionado && pedidosSeleccionado.zona_ped}
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
            <InputLabel id="idselectCiudadOrigen">Ciudad Origen</InputLabel>
            <Select
              labelId="selectCiudadOrigen"
              name="ciudadorigen_ped"
              id="idselectCiudadOrigen"
              onChange={handleChange}
              value={pedidosSeleccionado && pedidosSeleccionado.ciudadorigen_ped}
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
            <InputLabel id="idselectCiudadDestino">Ciudad Destino</InputLabel>
            <Select
              labelId="selectCiudadDestino"
              name="ciudaddestino_ped"
              id="idselectCiudadDestino"
              onChange={handleChange}
              value={pedidosSeleccionado && pedidosSeleccionado.ciudaddestino_ped}
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
          <TextField name="telefonorecogida_ped" label="Teléfono Recogida" fullWidth onChange={handleChange}
            value={pedidosSeleccionado && pedidosSeleccionado.telefonorecogida_ped} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="telefonoentrega_ped" label="Teléfono Entrega" fullWidth onChange={handleChange}
            value={pedidosSeleccionado && pedidosSeleccionado.telefonoentrega_ped} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="direccionrecogida_ped" label="Dirección de Recogida" fullWidth onChange={handleChange}
            value={pedidosSeleccionado && pedidosSeleccionado.direccionrecogida_ped} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="nombrerecogida_ped" label="Nombre persona recogida" fullWidth onChange={handleChange}
            value={pedidosSeleccionado && pedidosSeleccionado.nombrerecogida_ped} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="direccionentrega_ped" label="Dirección de Entrega" fullWidth onChange={handleChange}
            value={pedidosSeleccionado && pedidosSeleccionado.direccionentrega_ped} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField name="nombreentrega_ped" label="Nombre persona entrega" fullWidth onChange={handleChange}
            value={pedidosSeleccionado && pedidosSeleccionado.nombreentrega_ped} />
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
              value={pedidosSeleccionado && pedidosSeleccionado.estado_ped}
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
          <TextField className={styles.inputMaterial} label="Observación" name="observacion_ped" onChange={handleChange}
            value={pedidosSeleccionado && pedidosSeleccionado.observacion_ped} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button} color="primary" onClick={() => actualizarPedido()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const mostrarModal = (
    <div className={styles.modal}>
      {
        loading ? <Loading /> : console.log("Loading es Falso")
      }
    </div>
  )

  return (
    <div className="App">
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Typography align="center" className={styles.typography} variant="button" display="block" >
            Usuario - {nombreUsuario}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
        </Grid>
      </Grid>

      <MaterialTable
        columns={columnas}
        data={listarPedidosServicio}
        title="ESTADO DE CUENTA MENSAJERO"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Pedido',
            onClick: (event, rowData) => seleccionarPedido(rowData, "Editar")
          },
          {
            icon: MoneyOffIcon,
            tooltip: 'Marcar Pagado',
            onClick: (event, rowData) => seleccionarPedido(rowData, "Eliminar")
          }
        ]}
        options={{
          actionsColumnIndex: -1,
          headerStyle:{backgroundColor:'#F5F5F5', fontSize: 16},
          rowStyle: {
            fontSize: 15,
          }
        }}
        localization={{
          header: {
            actions: "Acciones"
          }
        }}
      />{ }

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {pedidoEditar}
      </Modal>

      <Modal
        open={modalLoading}
        onClose={abrirCerrarModalLoading}
      >
        {mostrarModal}
      </Modal>
    </div>
  );
}

export default EstadoCtaMensajero;
