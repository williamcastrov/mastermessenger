import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Grid, ButtonGroup } from "@material-ui/core";
import { makeStyles, lighten } from "@material-ui/core/styles";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';

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
    modalcumplimiento: {
        position: 'absolute',
        width: 1400,
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
        minWidth: 155,
        maxWidth: 155,
    },
    formControl2: {
        margin: theme.spacing(0),
        minWidth: 220,
        maxWidth: 220,
    },
    typography: {
        fontSize: 14,
        color: "#ff3d00"
    },
    typography2: {
        fontSize: 16,
        color: "#f44336"
    },
    button: {
        color: theme.palette.getContrastText(blueGrey[200]),
        margin: theme.spacing(0.3),
        '&:hover': {
            backgroundColor: blueGrey[200],
        },
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    button1: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: green[700],
        margin: theme.spacing(1),
        fontSize: 14,
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
    button2: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blue[900],
        margin: theme.spacing(1),
        fontSize: 14,
        '&:hover': {
            backgroundColor: blue[900],
        },
    },
    button3: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: red[700],
        margin: theme.spacing(1),
        fontSize: 14,
        '&:hover': {
            backgroundColor: red[700],
        },
    },
}));

function EnviarEmail(props) {
    const styles = useStyles();
    const { razonsocial_cli, fechapedido_ped, nombremensajero, fechahorarecogida_ped, nombreentrega_ped, fechahoraentrega_ped, 
            telefonorecogida_ped, nombre_ciu  } = props.pedidosSeleccionado;
    //console.log("ORDEN SELECCIONADA : ", id_otr);

    const onSubmit = values => console.log(values);
    const [enviar, setEnviar] = useState(false);
    const [nombre, setNombre] = useState('Nilson Muñoz');
    const [email, setEmail] = useState("williamcastrov@gmail.com");
    const [comentario, setComentario] = useState("https://gimcloud.co/api/ordenesserv/generarPdf/");
    const [contacto, setContacto] = useState({
        nombre: 'Nilson Muñoz',
        email: "williamcastrov@gmail.com",
        comentario: "https://gimcloud.co/api/ordenesserv/generarPdf/"
    });

    const handleChange = e => {

        const { name, value } = e.target;

        setContacto(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const creaMensaje = () => {
        //e.preventDefault();
        setEnviar(true);
    }

    useEffect(() => {
        if (enviar) {
            function fetchDataDatosEquipos() {
                {
                    setContacto([{
                        nombre: "William Castro",
                        email: "williamcastrov@gmail.com",
                        comentario: "https://gimcloud.co/api/ordenesserv/generarPdf/"
                    }])
                }
                agregarTarea();
            }
            fetchDataDatosEquipos();
        }
    }, [enviar])

    const agregarTarea = (e) => {
        //e.preventDefault();
        console.log("EMAIL : ", contacto)

        alert(`Thank you for your message from ${contacto.email}`);
        const templateId = 'template_2ccp785';
        const serviceID = 'mantenimientogimcloud';
        sendFeedback(serviceID, templateId, { from_name: contacto.nombre, message_html: contacto.comentario, 
                                              reply_to: contacto.email, email: contacto.email })
        return;
    }

    const sendFeedback = (serviceID, templateId, variables) => {
        window.emailjs.send(
            serviceID, templateId,
            variables
        ).then(res => {
            console.log('Email successfully sent!')
        })
            .catch(err => console.error('There has been an error.  Here some thoughts on the error that occured:', err))
    }

    return (
        <div className="App">
            <Typography align="center" className={styles.typography} variant="button" display="block" >
                - PEDIDO # 
            </Typography>
            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
                <Button>CLIENTE : {razonsocial_cli} </Button>
                <Button>FECHA RECOGIDA : {fechahorarecogida_ped} </Button>
                <Button>TELEFONO : {telefonorecogida_ped} </Button>
            </ButtonGroup>

            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group" >
                <Button text-align="right" >FECHA PEDIDO : {fechapedido_ped} </Button>
                <Button >CONTACTO : {nombreentrega_ped} </Button>
                <Button >CORREO : { nombreentrega_ped } </Button>
            </ButtonGroup>

            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
                <Button >MENSAJERO : { nombremensajero }</Button>
                <Button >FECHA ENTREGA : { fechahoraentrega_ped } </Button>
                <Button >CIUDAD : { nombre_ciu } </Button>
            </ButtonGroup>
            <br />
            <ButtonGroup orientation="vertical" className={styles.button} color="primary" aria-label="outlined primary button group">
                <Button variant="contained" onClick={creaMensaje} size="large" color="secondary" >
                    Enviar Email
                </Button>
            </ButtonGroup>

        </div>
    );
}

export default EnviarEmail;