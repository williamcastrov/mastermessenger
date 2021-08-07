import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Button, Typography } from "@material-ui/core";
import { green, blue, blueGrey, red } from '@material-ui/core/colors';
import { makeStyles } from "@material-ui/core/styles";
import Moment from 'moment';

import pedidosServices from "../../../services/Pedidos/Pedidos";

const useStyles = makeStyles((theme) => ({
    modal: {
        position: 'absolute',
        width: 700,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 300,
    },
    typography: {
        fontSize: 16,
        color: "#ff3d00"
    },
    button: {
        color: theme.palette.getContrastText(blueGrey[500]),
        backgroundColor: blue[700],
        margin: theme.spacing(1),
        fontSize: 12,
        '&:hover': {
            backgroundColor: green[700],
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

function EstadoCtaCliente(props) {
    const { idUsu } = props;

    const styles = useStyles();
    const [listarOT, setListarOT] = useState([]);

    useEffect(() => {
        async function fetchDataOT() {
            const res = await pedidosServices.leerestadoctacliente(idUsu);
            setListarOT(res.data);
            //console.log("ESTADO CTA CLIENTE : ", res.data);
        }
        fetchDataOT();
    }, [])

    return (
        <div>
            <div align="center" >
                <Button className={styles.button} color="primary" >
                    <ReactHTMLTableToExcel
                        table="estadoctacliente"
                        filename="Informacion Estado de Cta Cliente"
                        sheet="Sheet"
                        buttonText="Exportar a Excel"
                    />
                </Button>
            </div>
            <table id="estadoctacliente" className="table">
                <thead>
                    <tr>
                        <th>No. Servicio</th>
                        <th>Fecha Pedido</th>
                        <th>Fecha Recogida</th>
                        <th>Fecha Entrega</th>
                        <th>Tarifa</th>
                        <th>Valor Pagado</th>
                        <th>Estado</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        listarOT && listarOT.map((pedidos, index) => {
                            return (
                                <tr>
                                    <td>{pedidos.id_ped}</td>
                                    <td>{pedidos.fechapedido_ped}</td>
                                    <td>{pedidos.fechahorarecogida_ped}</td>
                                    <td>{pedidos.fechahoraentrega_ped}</td>
                                    <td>{pedidos.tarifa_ped}</td>
                                    <td>{pedidos.valorapagar_ped}</td>
                                    <td>{pedidos.nombre_est}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    );
}

export default EstadoCtaCliente;