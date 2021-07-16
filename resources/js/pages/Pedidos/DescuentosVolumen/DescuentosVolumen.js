import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import descuentosvolumenServices from "../../../services/Pedidos/DescuentosVolumen";
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
      prefix="%"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function DescuentosVolumen() {
  const styles = useStyles();
  const [listTiposDescuentos, setListTiposDescuentos] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tiposDescuentosSeleccionado, setTiposDescuentosSeleccionado] = useState({
    id_dvo: "",
    nombre_dvo: "",
    descripcion_dvo: "",
    valor_dvo: "",
    empresa_dvo: "",
    estado_dvo: ""
  })

  useEffect(() => {
    async function fetchDataTiposDescuentos() {
      const res = await descuentosvolumenServices.listdescuentosvolumen();
      setListTiposDescuentos(res.data);
      setActualiza(false);
    }
    fetchDataTiposDescuentos();
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

    setTiposDescuentosSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTiposDescuentos = (tiposservicio, caso) => {
    setTiposDescuentosSeleccionado(tiposservicio);
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

  const grabarTiposDescuentos = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposDescuentosSeleccionado.nombre_dvo) {
      errors.nombre_dvo = true;
      formOk = false;
    }

    if (!tiposDescuentosSeleccionado.descripcion_dvo) {
      errors.descripcion_dvo = true;
      formOk = false;
    }

    if (!tiposDescuentosSeleccionado.valor_dvo) {
      errors.valor_dvo = true;
      formOk = false;
    }

    if (!tiposDescuentosSeleccionado.empresa_dvo) {
      errors.empresa_dvo = true;
      formOk = false;
    }

    if (!tiposDescuentosSeleccionado.estado_dvo) {
      errors.estado_dvo = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tiposDescuentosSeleccionado);
      const res = await descuentosvolumenServices.save(tiposDescuentosSeleccionado);

      if (res.success) {
        swal("Descuentos por Volumen", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiposDescuentosSeleccionado.descripcion_dvo;
        delete tiposDescuentosSeleccionado.empresa_dvo;
        delete tiposDescuentosSeleccionado.estado_dvo;
      } else {
        alert("");
        swal("Descuentos por Volumen", "Error Creando el Tipo de Descuento!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Descuentos por Volumen", "Debe Ingresar Todos los Datos!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarTiposDescuentos = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposDescuentosSeleccionado.nombre_dvo) {
      errors.nombre_dvo = true;
      formOk = false;
    }

    if (!tiposDescuentosSeleccionado.descripcion_dvo) {
      errors.nombre_dvo = true;
      formOk = false;
    }

    if (!tiposDescuentosSeleccionado.valor_dvo) {
      errors.valor_dvo = true;
      formOk = false;
    }

    if (!tiposDescuentosSeleccionado.empresa_dvo) {
      errors.empresa_dvo = true;
      formOk = false;
    }

    if (!tiposDescuentosSeleccionado.estado_dvo) {
      errors.estado_dvo = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await descuentosvolumenServices.update(tiposDescuentosSeleccionado);

      if (res.success) {
        swal("Descuentos por Volumen", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tiposDescuentosSeleccionado.descripcion_dvo;
        delete tiposDescuentosSeleccionado.empresa_dvo;
        delete tiposDescuentosSeleccionado.estado_dvo;
      } else {
        swal("Descuentos por Volumen", "Error Actualizando Descuento por Volumen!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Descuentos por Volumen", "Debe Ingresar Todos los Datos!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarTiposDescuentos = async () => {

    const res = await descuentosvolumenServices.delete(tiposDescuentosSeleccionado.id_dvo);

    if (res.success) {
      swal("Descuentos por Volumen", "Actualizadaode forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Descuentos por Volumen", "Creado de forma Correcta!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_dvo',
      type: 'numeric'
    },
    {
      title: 'Nombre',
      field: 'nombre_dvo'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_dvo'
    },
    {
      title: 'Valor Descuento',
      field: 'valor_dvo'
    },
    {
      title: 'Código',
      field: 'empresa_dvo'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_dvo'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const tiposdescuentosInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Descuento Volumen
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Nombre Descuento" name="nombre_dvo" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_dvo" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} name="valor_dvo" label="Valor Descuento" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_dvo"
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
              name="estado_dvo"
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
        <Button className={styles.button1}  onClick={() => grabarTiposDescuentos()} >Insertar</Button>
        <Button className={styles.button2}  onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tiposdescuentosEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Descuento Volumen
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Nombre Tiquetera" name="nombre_dvo" onChange={handleChange}
            value={tiposDescuentosSeleccionado && tiposDescuentosSeleccionado.nombre_dvo} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_dvo" onChange={handleChange}
            value={tiposDescuentosSeleccionado && tiposDescuentosSeleccionado.descripcion_dvo} />
        </Grid>
        <Grid item xs={12} md={12}>  
          <TextField className={styles.inputMaterial} name="valor_dvo" label="Valor Descuento" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            value={tiposDescuentosSeleccionado && tiposDescuentosSeleccionado.valor_dvo}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_dvo"
              id="idselectEmpresa"
              onChange={handleChange}
              value={tiposDescuentosSeleccionado && tiposDescuentosSeleccionado.empresa_dvo}
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
              name="estado_dvo"
              id="idselectEstado"
              onChange={handleChange}
              value={tiposDescuentosSeleccionado && tiposDescuentosSeleccionado.estado_dvo}
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
        <Button className={styles.button1} onClick={() => actualizarTiposDescuentos()} >Editar</Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tiposdescuentosEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Descuento <b>{tiposDescuentosSeleccionado && tiposDescuentosSeleccionado.nombre_dvo}</b>? </p>
      <div align="right">
        <Button className={styles.button1} onClick={() => borrarTiposDescuentos()}> Confirmar </Button>
        <Button className={styles.button2} onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={() => abrirCerrarModalInsertar()} >Agregar Descuento por Volumen</Button>
      <MaterialTable
        columns={columnas}
        data={listTiposDescuentos}
        title="DESCUENTOS POR VOLUMEN"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Descuento',
            onClick: (event, rowData) => seleccionarTiposDescuentos(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Descuento',
            onClick: (event, rowData) => seleccionarTiposDescuentos(rowData, "Eliminar")
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
        {tiposdescuentosInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {tiposdescuentosEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {tiposdescuentosEliminar}
      </Modal>
    </div>
  );
}

export default DescuentosVolumen;
