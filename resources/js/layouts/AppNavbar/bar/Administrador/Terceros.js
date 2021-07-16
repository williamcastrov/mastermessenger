import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ContactsIcon from '@material-ui/icons/Contacts';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import CategoryIcon from '@material-ui/icons/Category';
import PeopleIcon from '@material-ui/icons/People';
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

function Terceros() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPI, setOpenPI] = React.useState(false);
  const [openTE, setOpenTE] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickPI = () => {
    setOpenPI(!openPI);
  };
  const handleClickTE = () => {
    setOpenTE(!openTE);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Gestionar Terceros" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
         
          <ListItem button className={classes.nested} button onClick={handleClickPI} >
            <ListItemIcon>
              <ViewHeadlineIcon />
            </ListItemIcon>
            <ListItemText primary="Parametros" />
            {openPI ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPI} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/interlocutores/tipointerlocutores" className={classes.nested}>
                <ListItemIcon>
                  <CategoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Tipos Interlocutores" />
              </ListItem>
              <ListItem component={Link} button to="/interlocutores/tiposcategorias" className={classes.nested}>
                <ListItemIcon>
                  <CategoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Tipos Categorias" />
              </ListItem>
            </List>
          </Collapse>
          
          <Divider />

          <List component="div" disablePadding>
            <ListItem button className={classes.nested} button onClick={handleClickTE} >
              <ListItemIcon>
                < ContactsIcon />
              </ListItemIcon>
              <ListItemText primary="Terceros" />
              {openTE ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openTE} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem component={Link} button to="/interlocutores/clientes" className={classes.nested}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Clientes" />
                </ListItem>
                <ListItem component={Link} button to="/interlocutores/empleados" className={classes.nested}>
                  <ListItemIcon>
                    <AssignmentIndIcon />
                  </ListItemIcon>
                  <ListItemText primary="Empleados" />
                </ListItem>
                <ListItem component={Link} button to="/interlocutores/mensajeros" className={classes.nested}>
                  <ListItemIcon>
                    < MotorcycleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mensajeros" />
                </ListItem>
              </List>
            </Collapse>
          </List>


        </List>
      </Collapse>

    </div>
  );
}

export default Terceros;