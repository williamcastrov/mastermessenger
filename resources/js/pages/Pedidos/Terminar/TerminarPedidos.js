import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, Container, Table } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Moment from 'moment';
import swal from 'sweetalert';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Loading from "../../../components/Loading";
import "./TerminarPedido.css";

// Componentes de Conexion con el Backend
import pedidosServices from "../../../services/Pedidos/Pedidos";
import clientesServices from "../../../services/Interlocutores/Clientes";
import mensajerosServices from "../../../services/Interlocutores/Mensajeros";
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
    width: 800,
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
    minWidth: 300,
  },
  typography: {
    fontSize: 20,
    color: "#ff3d00"
  },
  typography2: {
    fontSize: 16,
    color: "#454257"
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

function TerminarPedidos() {
  const styles = useStyles();

  const [modalCodigoCliente, setModalCodigoCliente] = useState(false);
  const [listarPedidosServicio, setListarPedidosServicio] = useState([]);
  const [modalAsignar, setModalAsignar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarClientes, setListarClientes] = useState([]);
  const [listarMensajeros, setListarMensajeros] = useState(0);
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
  const [mensajero, setMensajero] = React.useState("");


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
    valorapagar_ped: 0,
    telefonorecogida_ped: "",
    telefonoentrega_ped: "",
    fechapedido_ped: fechaactual,
    direccionrecogida_ped: "",
    nombrerecogida_ped: "",
    direccionentrega_ped: "",
    nombreentrega_ped: "",
    fechahorarecogida_ped: "",
    fechahoraentrega_ped: "",
    mensajero_ped: "",
    fechaasigna_ped: "",
    estado_ped: 1,
    empresa_ped: 1,
    observación_ped: ""
  })

  useEffect(() => {
    async function fetchDataPedidos() {
      const res = await pedidosServices.listpedidosterminar();
      setListarPedidosServicio(res.data);
      setActualiza(false);
    }
    fetchDataPedidos();
  }, [actualiza])

  useEffect(() => {
    async function fetchDataPedidos() {
      const res = await pedidosServices.listpedidosterminar();
      setListarPedidosServicio(res.data);
      //console.log("PEDIDOS POR ASIGNAR :  ", res.data);
    }
    fetchDataPedidos();
  }, [])

  useEffect(() => {
    async function fetchDataClientes() {
      const res = await clientesServices.listClientes();
      setListarClientes(res.data);
    }
    fetchDataClientes();
  }, [])

  useEffect(() => {
    async function fetchDataMensajeros() {
      const res = await mensajerosServices.listmensajeros();
      setListarMensajeros(res.data);
    }
    fetchDataMensajeros();
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
    (caso === "Terminar") ? abrirCerrarModalAsignar() : abrirCerrarModalEliminar()
  }

  const abrirCerrarModalAsignar = () => {
    setModalAsignar(!modalAsignar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const abrirCerrarModalLoading = () => {
    if (loading)
      setLoading(false);
    else
      setLoading(true);
    setModalLoading(!modalLoading);
  }

  const terminarPedido = () => {
    //e.preventDefault();
    console.log("MENSAJERO : ", mensajero)

    if (!pedidosSeleccionado) {
      swal("Terminar Pedido", "Debe seleccionar el pedido a Terminar!", "warning", { button: "Aceptar" });
      return;
    }

    {
      let valordescuentovolumen   = 1 - (pedidosSeleccionado.descuentovolumen_ped/100);
      let valordescuentotiquetera = 1 - (pedidosSeleccionado.descuentotiquetera_ped/100);
      let valorpedido = pedidosSeleccionado.tarifa_ped * valordescuentovolumen;
          valorpedido = valorpedido * valordescuentotiquetera;
          
      console.log("DESCUENTO VOLUMEN : ", valordescuentovolumen);
      console.log("DESCUENTO TIQUETERA : ", valordescuentotiquetera);
      console.log("VALOR PEDIDO CON DESCUENTOS : ", valorpedido);
            
            setPedidosSeleccionado([{
              id_ped: pedidosSeleccionado.id_ped,
              cliente_ped: pedidosSeleccionado.cliente_ped,
              tipopedido_ped: pedidosSeleccionado.tipopedido_ped,
              zona_ped: pedidosSeleccionado.zona_ped,
              ciudadorigen_ped: pedidosSeleccionado.ciudadorigen_ped,
              ciudaddestino_ped: pedidosSeleccionado.ciudaddestino_ped,
              tarifa_ped: pedidosSeleccionado.tarifa_ped,
              descuentovolumen_ped: pedidosSeleccionado.descuentovolumen_ped,
              descuentotiquetera_ped: pedidosSeleccionado.descuentotiquetera_ped,
              pagacontratiquetera_ped: pedidosSeleccionado.pagacontratiquetera_ped,
              valorapagar_ped: valorpedido,
              telefonorecogida_ped: pedidosSeleccionado.telefonorecogida_ped,
              telefonoentrega_ped: pedidosSeleccionado.telefonoentrega_ped,
              fechapedido_ped: pedidosSeleccionado.fechapedido_ped,
              direccionrecogida_ped: pedidosSeleccionado.direccionrecogida_ped,
              nombrerecogida_ped: pedidosSeleccionado.nombrerecogida_ped,
              direccionentrega_ped: pedidosSeleccionado.direccionentrega_ped,
              nombreentrega_ped: pedidosSeleccionado.nombreentrega_ped,
              fechahorarecogida_ped: pedidosSeleccionado.fechahorarecogida_ped,
              fechahoraentrega_ped: pedidosSeleccionado.fechahoraentrega_ped,
              mensajero_ped: pedidosSeleccionado.mensajero_ped,
              fechaasigna_ped: pedidosSeleccionado.fechaasigna_ped,
              estado_ped: 6,
              empresa_ped: pedidosSeleccionado.empresa_ped,
              observación_ped: pedidosSeleccionado.observación_ped
            }])
    }
    setGrabar(true)

  };

  useEffect(() => {
    async function terminarPedido() {
      if (grabar) {
        console.log("DATOS PEDIDO : ", pedidosSeleccionado[0]);

        const res = await pedidosServices.update(pedidosSeleccionado[0]);

        if (res.success) {
          swal("Terminar Pedido", "Pedido Terminado OK!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalAsignar();
        } else {
          swal("Asignar Mensajero", "Error Terminando el pedido!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalAsignar();
        }
        setActualiza(true);
        //abrirCerrarModalLoading();
      }
    }
    terminarPedido();
  }, [grabar])


  const editar = (item) => {
    //console.log("Pedido Editado : ", item);
    setPedidosSeleccionado(item);
  };

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
      title: 'Id',
      field: 'id_ped'
    },
    {
      title: 'Cliente',
      field: 'razonsocial_cli'
    },
    {
      title: 'Mensajero',
      field: 'nombremensajero'
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
      field: 'tarifa_ped'
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
      title: 'Fecha Asignación',
      field: 'fechaasigna_ped'
    },
    {
      title: 'Estado',
      field: 'nombre_est'
    },
    {
      title: 'Observación',
      field: 'observacion_ped',
      cellStyle: { minWidth: 300 }
    }
  ]

  const pedidoAsignar = (
    <div className={styles.modal}>
      <div className="App">
        <Typography align="center" className={styles.typography} variant="button" display="block" >
          TERMINAR PEDIDO
        </Typography>
      </div>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ul>
            <Container>
              <br />
              <Table>
                <thead>
                  <tr className="parrafo">
                    <th># Pedido</th>
                    <th>Estado</th>
                    <th>Mensajero</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody className="texto">
                  {listarPedidosServicio.map((item) => (
                    <tr key={item.id_ped}>
                      <td>{item.id_ped}</td>
                      <td>{item.nombre_est}</td>
                      <td>{item.razonsocial_cli}</td>
                      <td>
                        <Button variant="contained" color="primary" size="small" onClick={() => editar(item)}>
                          Editar
                        </Button>{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>
          </ul>
        </Grid>
        <Grid item xs={12} md={4}>
          <br />
          <Button className={styles.button} variant="contained" type="submit" size="small" color="secondary" >
            {pedidosSeleccionado.id_ped}{"-"}{pedidosSeleccionado.razonsocial_cli}
          </Button>
          <div >
            <Button className={styles.button2} variant="contained" size="small" color="secondary" onClick={() => terminarPedido()} >
              Terminar Pedido
            </Button>
          </div>
        </Grid>
      </Grid>
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
      <p className="parrafo" >Estás seguro que deseas Terminar el Pedido # <b>{pedidosSeleccionado && pedidosSeleccionado.id_ped}</b>? </p>
      <div align="right">
        <Button className={styles.button} color="secondary" onClick={() => borrarPedido()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
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
      <MaterialTable
        columns={columnas}
        data={listarPedidosServicio}
        title="TERMINAR PEDIDOS"
        actions={[
          {
            icon: AssignmentTurnedInIcon,
            tooltip: 'Terminar Pedido',
            onClick: (event, rowData) => seleccionarPedido(rowData, "Terminar")
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
                  <Button variant="contained">Recogida : {rowData.direccionrecogida_ped}</Button> { }
                  <Button variant="contained">Preguntar por  : {rowData.nombrerecogida_ped}</Button> { }
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
                  <Button variant="contained">Tel Recogida : {rowData.telefonorecogida_ped}</Button> { }
                  <Button variant="contained">Tel Entrega : {rowData.telefonoentrega_ped}</Button> { }

                  <Button variant="contained">Preguntar por :{rowData.nombreentrega_ped}</Button>{ }
                </div>
              )
            },
          },
        ]}
      />{ }

      <Modal
        open={modalAsignar}
        onClose={abrirCerrarModalAsignar}
      >
        {pedidoAsignar}
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
      <Modal
        open={modalLoading}
        onClose={abrirCerrarModalLoading}
      >
        {mostrarModal}
      </Modal>
    </div>
  );
}

export default TerminarPedidos;
