import React from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { ListSubheader, List, ListItem, ListItemIcon, ListItemText, Collapse } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ViewListIcon from '@material-ui/icons/ViewList';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CategoryIcon from '@material-ui/icons/Category';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LanguageIcon from '@material-ui/icons/Language';
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

function Tiquetera() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openPI, setOpenPI] = React.useState(false);
  const [openGE, setOpenGE] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickPI = () => {
    setOpenPI(!openPI);
  };

  const handleClickGE = () => {
    setOpenGE(!openGE);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <LocalLibraryIcon />
        </ListItemIcon>
        <ListItemText primary="Gestionar Tiquetera" />
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
              <ListItem component={Link} button to="/tiqueteras/tipostiqueteras" className={classes.nested}>
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary="Tipos Tiquetera" />
              </ListItem>
              <ListItem component={Link} button to="" className={classes.nested}>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                <ListItemText primary="Sin asignar" />
              </ListItem>
              <ListItem component={Link} button to="" className={classes.nested}>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Sin asignar" />
              </ListItem>
              <ListItem component={Link} button to="" className={classes.nested}>
                <ListItemIcon>
                  <AssignmentIndIcon />
                </ListItemIcon>
                <ListItemText primary="Sin asignar" />
              </ListItem>
            </List>
          </Collapse>

          <Divider />

          <ListItem button className={classes.nested} button onClick={handleClickGE} >
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Gestión" />
            {openGE ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openGE} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component={Link} button to="/tiqueteras/tiqueteras" className={classes.nested}>
                <ListItemIcon>
                  <BorderColorIcon />
                </ListItemIcon>
                <ListItemText primary="Tiqueteras" />
              </ListItem>
              <ListItem component={Link} button to="" className={classes.nested}>
                <ListItemIcon>
                  <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Asignar Pedidos" />
              </ListItem>

            </List>
          </Collapse>
          <Divider />
        </List>
      </Collapse>
    </div>
  );
}

export default Tiquetera;