import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List } from "@material-ui/core";
import Parametros from "./Parametros";
import Usuarios from "./Usuarios";
import Terceros from "./Terceros";
import Pedidos from "./Pedidos";
import Tiquetera from "./Tiquetera";
import Mensajeros from "./Mensajeros";
import Clientes from "./Clientes";
import MisDirecciones from "./MisDirecciones";
import Informes from "./Informes";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function Administrador() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    
    return (
        <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    ADMINISTRADOR
                </ListSubheader>
            }
            className={classes.root}
        >
            <Parametros />
            <Usuarios />
            <Terceros />
            <Tiquetera />
            <Pedidos />
            <Mensajeros />
            <Clientes />
            <MisDirecciones />
            <Informes />
        </List>
    );
}

export default Administrador;

