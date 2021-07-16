import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import PropTypes from 'prop-types';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import SaveIcon from '@material-ui/icons/Save';

// Componentes de Conexion con el Backend
import tiposcategoriasServices from "../../../../services/Interlocutores/TiposCategorias";
import estadosServices from "../../../../services/Parameters/Estados";
import empresasServices from "../../../../services/Parameters/Empresa";

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

function TiposCategorias() {
  const styles = useStyles();
  const [listTiposCategorias, setListTiposCategorias] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [formError, setFormError] = useState(false);
  const [listarEmpresas, setListarEmpresas] = useState([]);
  const [listarEstados, setListarEstados] = useState([]);
  const [actualiza, setActualiza] = useState(false);
  const [tiposCategoriasSeleccionado, setTiposCategoriasSeleccionado] = useState({
    id_tcg: "",
    nombre_tcg: "",
    descripcion_tcg: "",
    valor_tcg: "",
    empresa_tcg: "",
    estado_tcg: ""
  })

  useEffect(() => {
    async function fetchDataTiposCategorias() {
      const res = await tiposcategoriasServices.listtiposcategorias();
      setListTiposCategorias(res.data);
      setActualiza(false);
    }
    fetchDataTiposCategorias();
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

    setTiposCategoriasSeleccionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const seleccionarTiposCategorias = (tiposservicio, caso) => {
    setTiposCategoriasSeleccionado(tiposservicio);
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

  const grabarTiposCategorias = async () => {
    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposCategoriasSeleccionado.nombre_tcg) {
      errors.nombre_tcg = true;
      formOk = false;
    }

    if (!tiposCategoriasSeleccionado.descripcion_tcg) {
      errors.descripcion_tcg = true;
      formOk = false;
    }

    if (!tiposCategoriasSeleccionado.valor_tcg) {
      errors.valor_tcg = true;
      formOk = false;
    }

    if (!tiposCategoriasSeleccionado.empresa_tcg) {
      errors.empresa_tcg = true;
      formOk = false;
    }

    if (!tiposCategoriasSeleccionado.estado_tcg) {
      errors.estado_tcg = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      console.log(tiposCategoriasSeleccionado);
      const res = await tiposcategoriasServices.save(tiposCategoriasSeleccionado);

      if (res.success) {
        swal("Tipos Categorias", "Creado de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalInsertar();
        delete tiposCategoriasSeleccionado.descripcion_tcg;
        delete tiposCategoriasSeleccionado.empresa_tcg;
        delete tiposCategoriasSeleccionado.estado_tcg;
      } else {
        alert("");
        swal("Tipos Categorias", "Error Creando el Tipo de Categoria!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalInsertar();
      }
    }
    else {
      swal("Tipos Categorias", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalInsertar();
    }
    setActualiza(true);
  }

  const actualizarTiposCategorias = async () => {

    setFormError({});
    let errors = {};
    let formOk = true;

    if (!tiposCategoriasSeleccionado.nombre_tcg) {
      errors.nombre_tcg = true;
      formOk = false;
    }

    if (!tiposCategoriasSeleccionado.descripcion_tcg) {
      errors.nombre_tcg = true;
      formOk = false;
    }

    if (!tiposCategoriasSeleccionado.valor_tcg) {
      errors.valor_tcg = true;
      formOk = false;
    }

    if (!tiposCategoriasSeleccionado.empresa_tcg) {
      errors.empresa_tcg = true;
      formOk = false;
    }

    if (!tiposCategoriasSeleccionado.estado_tcg) {
      errors.estado_tcg = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {

      const res = await tiposcategoriasServices.update(tiposCategoriasSeleccionado);

      if (res.success) {
        swal("Tipos Categorias", "Actualizada de forma Correcta!", "success", { button: "Aceptar" });
        console.log(res.message)
        abrirCerrarModalEditar();
        delete tiposCategoriasSeleccionado.descripcion_tcg;
        delete tiposCategoriasSeleccionado.empresa_tcg;
        delete tiposCategoriasSeleccionado.estado_tcg;
      } else {
        swal("Tipos Categorias", "Error Actualizando el Tipo de Categoria!", "error", { button: "Aceptar" });
        console.log(res.message);
        abrirCerrarModalEditar();
      }
    }
    else {
      swal("Tipos Categorias", "Debe Ingresar Todos los Datos, Revisar la Información!", "warning", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEditar();
    }
    setActualiza(true);
  }

  const borrarTiposCategorias = async () => {

    const res = await tiposcategoriasServices.delete(tiposCategoriasSeleccionado.id_tcg);

    if (res.success) {
      swal("Tipos Categorias", "Actualizadaode forma Correcta!", "success", { button: "Aceptar" });
      console.log(res.message)
      abrirCerrarModalEliminar();
    }
    else {
      swal("Tipos Categorias", "Creada de forma Correcta!", "error", { button: "Aceptar" });
      console.log(res.message);
      abrirCerrarModalEliminar();
    }
    setActualiza(true);
  }
  // "string","boolean","numeric","date","datetime","time","currency"
  const columnas = [
    {
      title: 'Id',
      field: 'id_tcg',
      type: 'numeric'
    },
    {
      title: 'Nombre',
      field: 'nombre_tcg'
    },
    {
      title: 'Descripcion',
      field: 'descripcion_tcg'
    },
    {
      title: 'Valor Descuento',
      field: 'valor_tcg'
    },
    {
      title: 'Código',
      field: 'empresa_tcg'
    },
    {
      title: 'Nombre Empresa',
      field: 'nombre_emp'
    },
    {
      title: 'Estado',
      field: 'estado_tcg'
    },
    {
      title: 'Nombre Estado',
      field: 'nombre_est'
    }
  ]

  const tiposcategoriasInsertar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Agregar Tipo de Categoría
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Nombre Categoría" name="nombre_tcg" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tcg" onChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} name="valor_tcg" label="Valor Descuento" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_tcg"
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
              name="estado_tcg"
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
        <Button color="primary" onClick={() => grabarTiposCategorias()} >Insertar</Button>
        <Button onClick={() => abrirCerrarModalInsertar()} >Cancelar</Button>
      </div>
    </div>
  )

  const tiposcategoriasEditar = (
    <div className={styles.modal}>
      <Typography align="center" className={styles.typography} variant="button" display="block" >
        Actualizar Tipo de Categoría
      </Typography>
      <br />
      <Grid container spacing={2} >
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Nombre Categoría" name="nombre_tcg" onChange={handleChange}
            value={tiposCategoriasSeleccionado && tiposCategoriasSeleccionado.nombre_tcg} />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField className={styles.inputMaterial} label="Descripción" name="descripcion_tcg" onChange={handleChange}
            value={tiposCategoriasSeleccionado && tiposCategoriasSeleccionado.descripcion_tcg} />
        </Grid>
        <Grid item xs={12} md={12}>  
          <TextField className={styles.inputMaterial} name="valor_tcg" label="Valor Descuento" fullWidth
            InputLabelProps={{ shrink: true }} InputProps={{ inputComponent: NumberFormatCustom, }} 
            value={tiposCategoriasSeleccionado && tiposCategoriasSeleccionado.valor_tcg}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <FormControl className={styles.formControl}>
            <InputLabel id="idselectEmpresa">Empresa</InputLabel>
            <Select
              labelId="selectEmpresa"
              name="empresa_tcg"
              id="idselectEmpresa"
              onChange={handleChange}
              value={tiposCategoriasSeleccionado && tiposCategoriasSeleccionado.empresa_tcg}
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
              name="estado_tcg"
              id="idselectEstado"
              onChange={handleChange}
              value={tiposCategoriasSeleccionado && tiposCategoriasSeleccionado.estado_tcg}
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
        <Button color="primary" onClick={() => actualizarTiposCategorias()} >Editar</Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const tiposcategoriasEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el Tipo de Categoria <b>{tiposCategoriasSeleccionado && tiposCategoriasSeleccionado.nombre_tcg}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => borrarTiposCategorias()}> Confirmar </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}> Cancelar </Button>
      </div>
    </div>
  )

  return (
    <div className="App">
      <Button className={styles.button} variant="contained" startIcon={<SaveIcon />} onClick={() => abrirCerrarModalInsertar()} >Agregar Tipo de Categoria</Button>
      <MaterialTable
        columns={columnas}
        data={listTiposCategorias}
        title="MAESTRA DE CATEGORIAS"
        actions={[
          {
            icon: 'edit',
            tooltip: 'Editar Tipo de Categoria',
            onClick: (event, rowData) => seleccionarTiposCategorias(rowData, "Editar")
          },
          {
            icon: 'delete',
            tooltip: 'Borrar Tipo de Categoria',
            onClick: (event, rowData) => seleccionarTiposCategorias(rowData, "Eliminar")
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
        {tiposcategoriasInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {tiposcategoriasEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
      >
        {tiposcategoriasEliminar}
      </Modal>
    </div>
  );
}

export default TiposCategorias;
