import React from "react";
import {Link} from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import {ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import DialerSipIcon from '@material-ui/icons/DialerSip';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
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

function Pedidos() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPI, setOpenPI] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickPI = () => {
    setOpenPI(!openPI);
  };

  return (     
      <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <ViewHeadlineIcon />
        </ListItemIcon>
        <ListItemText primary="Gestionar Pedidos" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
   
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} button onClick={handleClickPI} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
            {openPI ? <ExpandLess /> : <ExpandMore />}  
          </ListItem>
          <Collapse in={openPI} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>  
              <ListItem component={Link} button to="/pedidos/crearpedidos" className={classes.nested}>
                <ListItemIcon>
                  <DialerSipIcon />
                </ListItemIcon>
                <ListItemText primary="Crear pedido" />
              </ListItem>
              <ListItem component={Link} button to="/pedidos/asignarpedido" className={classes.nested}>
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Asignar pedido" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem component={Link} button to="/pedidos/cumplirpedidos" className={classes.nested}>
            <ListItemIcon>
              <SettingsBackupRestoreIcon />
            </ListItemIcon>
            <ListItemText primary="Cumplir pedidos" />
          </ListItem>
          <Divider />
        </List>
      </Collapse>
      </div>
  );
}

export default Pedidos;