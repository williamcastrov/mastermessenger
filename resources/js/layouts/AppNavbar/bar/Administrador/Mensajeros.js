import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import VerticalAlignCenterIcon from '@material-ui/icons/VerticalAlignCenter';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import Divider from '@material-ui/core/Divider';

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

function Activos() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPA, setOpenPA] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickPA = () => {
    setOpenPA(!openPA);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <MonetizationOnIcon />
        </ListItemIcon>
        <ListItemText primary="Mensajero" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>

          <ListItem button className={classes.nested} button onClick={handleClickPA} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Gestión Mensajero" />
            {openPA ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPA} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/interlocutores/mensajeros" className={classes.nested}>
                <ListItemIcon>
                  < MotorcycleIcon />
                </ListItemIcon>
                <ListItemText primary="Mensajeros" />
              </ListItem>
              <ListItem component={Link} button to="/mensajeros/pedidosmensajero" className={classes.nested} >
                <ListItemIcon>
                  <VerticalAlignCenterIcon />
                </ListItemIcon>
                <ListItemText primary="Pedidos mensajero" />
              </ListItem>
              <ListItem component={Link} button to="/mensajeros/estadoctamensajero" className={classes.nested}>
                <ListItemIcon>
                  <CenterFocusWeakIcon />
                </ListItemIcon>
                <ListItemText primary="Estado de cta mensajero" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText primary="Historico Mensajero" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}

export default Activos;