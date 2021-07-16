import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from '@material-ui/icons/Save';
import NumberFormat from 'react-number-format';
import swal from 'sweetalert';

// Componentes de Conexion con el Backend
import tarifasServices from "../../../services/Pedidos/Tarifas";
import estadosServices from "../../../services/Parameters/Estados";
import ciudadesServices from "../../../services/Parameters/Ciudades";
import empresasServices from "../../../services/Parameters/Empresa";
import tipospedidosServices from "../../../services/Pedidos/TiposPedidos";
import zonasServices from "../../../services/Pedidos/Zonas";

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
      backgroundColor: [700],
    },
  },
  button1: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: 'green',
    margin: theme.spacing(1),
    fontSize: 12,
    '&:hover': {
      backgroundColor: blue[700],
    },
  },
  button2: {
    color: theme.palette.getContrastText(blueGrey[500]),
    backgroundColor: 'red',
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

function Tarifas() {
  const styles = useStyles();
  const [tarifasServicio, setTarifasServicio] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [listarZonas, setListarZonas] = useState([]);
  const [listarCiudades, setListarCiudades] = useState([]);
  const [listarTiposPedidos, setListarTiposPedidos] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [ciudadOrigen, setCiudadOrigen] = useState("");
  const [ciudadDestino, setCiudadDestino] = useState("");
  const [grabar, setGrabar] = React.useState(false);
  const [modifica, setModifica] = React.useState(false);
  const [tarifasSeleccionado, setTarifasSeleccionado] = useState({
    id_tar: "",
    nombre_tar: "",
    tipozona_tar: "",
    origen_tar: "",
    ciudadorigen_tar: ciudadOrigen,
    destino_tar: "",
    ciudaddestino_tar: ciudadDestino,
    codigotarifa_tar: "",
    tipopedido_tar: "",
    empresa_tar: "",
    valor_tar: "",
    estado_tar: "",
    observacion_tar: ""
  })

  useEffect(() => {
    async function fetchDataTarifas() {
      const res = await tarifasServices.listtarifas();
      setTarifasServicio(res.data);
      setActualiza(false);
    }
    fetchDataTarifas();
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

  useEffect(() => {
    async function fetchDataZonas() {
      const res = await zonasServices.listzonas();
      setListarZonas(res.data)
      console.log(res.data);
    }
    fetchDataZonas();
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
    async function fetchDataTiposPedidos() {
      const res = await tipospedidosServices.listtipospedidos();
      setListarTiposPedidos(res.data)
      console.log(res.data);
    }
    fetchDataTiposPedidos();
  }, [])

  const handleChange = e => {
    const { name, value } = e.target;

    setTarifasSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTarifas = (tarifas, caso) => {
    setTarifasSeleccionado(tarifas);
    //console.log("TARIFA SELECCIONADA : ", tarifas);
    setCiudadOrigen(tarifas.ciudadorigen_tar);
    setCiudadDestino(tarifas.ciudaddestino_tar);
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

  const seleccionarCiudadOri = async(e) => {
    //console.log("CODIGO CIUDAD : ", e)
    const res = await ciudadesServices.listUnaCiudad(e);
    setCiudadOrigen(res.data[0].nombre_ciu)
    //console.log(res.data);
    //console.log("CIUDAD : ",res.data[0].nombre_ciu);
  }

  const seleccionarCiudadDest = async(e) => {
    //console.log("CODIGO CIUDAD : ", e)
    const res = await ciudadesServices.listUnaCiudad(e);
    setCiudadDestino(res.data[0].nombre_ciu)
    console.log(res.data);
    //console.log("CIUDAD : ",res.data[0].nombre_ciu);
    
  }

  const grabarTarifas = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tarifasSeleccionado.nombre_tar) {
      errors.nombre_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.tipozona_tar) {
      errors.tipozona_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.tipopedido_tar) {
      errors.tipopedido_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.empresa_tar) {
      errors.empresa_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.valor_tar) {
      errors.valor_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.estado_tar) {
      errors.estado_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.origen_tar) {
      errors.origen_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.destino_tar) {
      errors.destino_tar = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      {
        //console.log("CIUDAD ORIGEN : ", ciudadOrigen)
        //console.log("CIUDAD DISTINO : ", ciudadDestino)
        let codigotarifa = ""+tarifasSeleccionado.origen_tar+tarifasSeleccionado.destino_tar
        setTarifasSeleccionado([{
          id_tar: 0,
          nombre_tar: tarifasSeleccionado.nombre_tar,
          tipozona_tar: tarifasSeleccionado.tipozona_tar,
          origen_tar: tarifasSeleccionado.origen_tar,
          ciudadorigen_tar: ciudadOrigen,
          destino_tar: tarifasSeleccionado.destino_tar,
          ciudaddestino_tar: ciudadDestino,
          codigotarifa_tar: codigotarifa,
          tipopedido_tar: tarifasSeleccionado.tipopedido_tar,
          empresa_tar: tarifasSeleccionado.empresa_tar,
          valor_tar: tarifasSeleccionado.valor_tar,
          estado_tar: tarifasSeleccionado.estado_tar,
          observacion_tar: tarifasSeleccionado.observacion_tar
        }]);
      }
      setGrabar(true);
    }
    else {
      swal("Tarifas", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      //console.log(clientesSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  useEffect(() => {
    async function grabarTarifa() {
      if (grabar) {
        //console.log("DATOS TARIFA : ", tarifasSeleccionado[0]);

        const res = await tarifasServices.save(tarifasSeleccionado[0]);

        if (res.success) {
          swal("Tarifa", "Creada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalInsertar();
          /*
          delete tarifasSeleccionado.nombre_tar;
          delete tarifasSeleccionado.empresa_tar;
          delete tarifasSeleccionado.valor_tar;
          delete tarifasSeleccionado.estado_tar;
          */
        } else {
          swal("Tarida", "Error Creando la Tarifa!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalInsertar();
        }
        setActualiza(true);
        setGrabar(false);
      }
    }
    grabarTarifa();
  }, [grabar])

  const actualizarTarifa = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tarifasSeleccionado.nombre_tar) {
      alert("1")
      errors.nombre_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.tipozona_tar) {
      alert("21")
      errors.tipozona_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.tipopedido_tar) {
      alert("31")
      errors.tipopedido_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.empresa_tar) {
      alert("2")
      errors.empresa_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.valor_tar) {
      alert("3")
      errors.valor_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.estado_tar) {
      alert("4")
      errors.estado_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.origen_tar) {
      alert("5")
      errors.origen_tar = true;
      formOk = false;
    }

    if (!tarifasSeleccionado.destino_tar) {
      alert("6")
      errors.destino_tar = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      {
        //console.log("CIUDAD ORIGEN : ", ciudadOrigen);
        //console.log("CIUDAD DESTINO : ", ciudadDestino);
        let codigotarifa = ""+tarifasSeleccionado.origen_tar+tarifasSeleccionado.destino_tar
        setTarifasSeleccionado([{
          id_tar: tarifasSeleccionado.id_tar,
          nombre_tar: tarifasSeleccionado.nombre_tar,
          tipozona_tar: tarifasSeleccionado.tipozona_tar,
          origen_tar: tarifasSeleccionado.origen_tar,
          ciudadorigen_tar: ciudadOrigen,
          destino_tar: tarifasSeleccionado.destino_tar,
          ciudaddestino_tar: ciudadDestino,
          codigotarifa_tar: codigotarifa,
          tipopedido_tar: tarifasSeleccionado.tipopedido_tar,
          empresa_tar: tarifasSeleccionado.empresa_tar,
          valor_tar: tarifasSeleccionado.valor_tar,
          estado_tar: tarifasSeleccionado.estado_tar,
          observacion_tar: tarifasSeleccionado.observacion_tar
        }]);
      }
      setModifica(true);
    }
    else {
      swal("Tarifas", "Debe Ingresar Todos los Datos, Error!", "warning", { button: "Aceptar" });
      //console.log(clientesSeleccionado);
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
  }

  useEffect(() => {
    async function modificaTarifa() {
      if (modifica) {
        //console.log("DATOS TARIFA : ", tarifasSeleccionado[0]);

        const res = await tarifasServices.update(tarifasSeleccionado[0]);

        if (res.success) {
          swal("Tarifa", "Creada de forma Correcta!", "success", { button: "Aceptar" });
          console.log(res.message)
          abrirCerrarModalInsertar();
          /*
          delete tarifasSeleccionado.nombre_tar;
          delete tarifasSeleccionado.empresa_tar;
          delete tarifasSeleccionado.valor_tar;
          delete tarifasSeleccionado.estado_tar;
          */
        } else {
          swal("Tarida", "Error Creando la Tarifa!", "error", { button: "Aceptar" });
          console.log(res.message);
          abrirCerrarModalInsertar();
        }
        setActualiza(true);
        setModifica(false);
      }
    }
    modificaTarifa();
  }, [modifica])

  const borrarTarifa = async () => {

    const res = await tarifasServices.delete(tarifasSeleccionado.id_tar);

    if (res.success) {
      swal("Tarifa", "Eliminada de forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Tarifa", "Error Borrando la Tarifa!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tar'
    },
    {
      title: 'Descripcion',
      field: 'nombre_tar'
    },
    {
      title: 'Zona',
      field: 'nombre_zon'
    },
    {
      title: 'Tipo de Pedido',
      field: 'descripcion_tpd'
    },
    {
      title: 'Empresa',
      field: 'empresa_tar'
    },
    {
      title: 'Valor',
      field: 'valor_tar'
    },
    {
      title: 'Estado',
      field: 'estado_tar'
    },
    {
      title: 'Observación',
      field: 'observacion_tar',
      cellStyle: { minWidth: 300 }
    }
  ]

  const tarifaInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Tarifa
      </Typography>
      <br/>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Nombre Tarifa" name="nombre_tar" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_tar"
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
              name="empresa_tar"
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectZona">Zona</InputLabel>
            <Select
              labelId="selectZona"
              name="tipozona_tar"
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
            <InputLabel id="idselectTipoPedido">Tipo de Pedido</InputLabel>
            <Select
              labelId="selectTipoPedido"
              name="tipopedido_tar"
              id="idselectTipoPedido_tar"
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
          <TextField className={styles.inputMaterial} name="valor_tar" label="Valor Tarifa" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudadOrigen">Ciudad Origen</InputLabel>
            <Select
              labelId="selectCiudadOrigen"
              name="origen_tar"
              id="idselectCiudadOrigen"
              onChange={handleChange}
              onClick={(e) => seleccionarCiudadOri(e.target.value)}
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
              name="destino_tar"
              id="idselectCiudadDestino"
              onChange={handleChange}
              onClick={(e) => seleccionarCiudadDest(e.target.value)}
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
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Observación" name="observacion_tar" onChange={handleChange} />
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button1} onClick={() => grabarTarifas()} >Insertar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tarifaEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Tarifa
      </Typography>
      <br/>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField className={styles.inputMaterial} label="Nombre Tarifa" name="nombre_tar" onChange={handleChange} 
                     value={tarifasSeleccionado && tarifasSeleccionado.nombre_tar} />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEstado">Estado</InputLabel>
            <Select
              labelId="selectEstado"
              name="estado_tar"
              id="idselectEstado"
              onChange={handleChange}
              value={tarifasSeleccionado && tarifasSeleccionado.estado_tar}
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
              name="empresa_tar"
              id="idselectEmpresa"
              onChange={handleChange}
              value={tarifasSeleccionado && tarifasSeleccionado.empresa_tar} 
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
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectZona">Zona</InputLabel>
            <Select
              labelId="selectZona"
              name="tipozona_tar"
              id="idselectZona"
              onChange={handleChange}
              value={tarifasSeleccionado && tarifasSeleccionado.tipozona_tar} 
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
            <InputLabel id="idselectTipoPedido">Tipo de Pedido</InputLabel>
            <Select
              labelId="selectTipoPedido"
              name="tipopedido_tar"
              id="idselectTipoPedido_tar"
              onChange={handleChange}
              value={tarifasSeleccionado && tarifasSeleccionado.tipopedido_tar} 
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
          <TextField className={styles.inputMaterial} name="valor_tar" label="Valor Tarifa" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange} value={tarifasSeleccionado && tarifasSeleccionado.valor_tar}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectCiudadOrigen">Ciudad Origen</InputLabel>
            <Select
              labelId="selectCiudadOrigen"
              name="origen_tar"
              id="idselectCiudadOrigen"
              onChange={handleChange}
              onClick={(e) => seleccionarCiudadOri(e.target.value)}
              value={tarifasSeleccionado && tarifasSeleccionado.origen_tar} 
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
              name="destino_tar"
              id="idselectCiudadDestino"
              onChange={handleChange}
              onClick={(e) => seleccionarCiudadDest(e.target.value)}
              value={tarifasSeleccionado && tarifasSeleccionado.destino_tar} 
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
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Observación" name="observacion_tar" onChange={handleChange} 
           value={tarifasSeleccionado && tarifasSeleccionado.observacion_tar}/>
        </Grid>
      </Grid>
      <div align="right">
        <Button className={styles.button1} onClick={() => actualizarTarifa()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tarifaEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar la Tarifa <b>{tarifasSeleccionado && tarifasSeleccionado.nombre_tar}</b>? </p>
      <div align="right">
        <Button  className={styles.button2} onClick={() => borrarTarifa()}> Confirmar </Button>
        <Button  className={styles.button1} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <br />
      <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={() => abrirCerrarModalInsertar()} >Agregar Tarifa</Button>
      <MaterialTable
        columns={columnas}
        data={tarifasServicio}
        title="MAESTRA DE TARIFAS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipo de Tarifa',
            onClick: (event, rowData) => seleccionarTarifas(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tipo de Tarifa',
            onClick: (event, rowData) => seleccionarTarifas(rowData, "Eliminar")
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
        {tarifaInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {tarifaEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {tarifaEliminar}
      </Modal>
    </div>
  );
}

export default Tarifas;
