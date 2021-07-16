import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import LanguageIcon from '@material-ui/icons/Language';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import DomainIcon from '@material-ui/icons/Domain';
import PhotoIcon from '@material-ui/icons/Photo';
import WallpaperIcon from '@material-ui/icons/Wallpaper';

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

function Parametros() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    < ViewHeadlineIcon />
                </ListItemIcon>
                <ListItemText primary="Parametros del Sistema" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem component={Link} button to="/parametros/paises" className={classes.nested}>
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Paises" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/regiones" className={classes.nested}>
                        <ListItemIcon>
                            <WallpaperIcon />
                        </ListItemIcon>
                        <ListItemText primary="Regiones" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/departamentos" className={classes.nested}>
                        <ListItemIcon>
                            <DomainIcon />
                        </ListItemIcon>
                        <ListItemText primary="Departamentos" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/ciudades" className={classes.nested}>
                        <ListItemIcon>
                            <PhotoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ciudades" />
                    </ListItem>
                    <ListItem component={Link} button to="/parametros/tiposusuarios" className={classes.nested}>
                        <ListItemIcon>
                            <PhotoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tipos Usuarios" />
                    </ListItem>
                </List>
            </Collapse>
        </div>

    );
}

export default Parametros;

/*
 <ListItem component={Link} button to="/parametros/paises" className={classes.nested} >
                        <ListItemIcon>
                            <LanguageIcon />
                        </ListItemIcon>
                        <ListItemText primary="Paises" />
                    </ListItem>

*/