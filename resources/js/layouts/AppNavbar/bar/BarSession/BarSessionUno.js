import React, {useState, useEffect} from 'react';
import { Toolbar, Typography, makeStyles, Button, IconButton, Drawer } from "@material-ui/core";
import UsuarioUno from "../UsuarioUno";
import firebase from "../../../../server/firebase";
import "firebase/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    sectionDesktop : {
        display: "none",
        [theme.breakpoints.up("md")] : {
            display : "flex"
        }
    },
    sectionMobile:{
        display: "flex",
        [theme.breakpoints.up("md")] : {
            display: "none"
        }
    },
    grow : {
        flexGrow: 1
    }
}));

const BarSessionUno = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const logout = () => {
        firebase.auth().signOut();
    }

    const IraInicio = () => {
        history.push("/gim");
    }  

    const [state, setState] = React.useState({
        left: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
           
            <Toolbar>
                <IconButton color="inherit" >
                    {["left"].map((anchor) => (
                    <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)} size="large" color="inherit"  >{"menu"}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <UsuarioUno />
                    </Drawer>
                    </React.Fragment>
                ))}

                </IconButton>
                <Typography variant="h3" color="inherit" >
                    Master Messenger
                </Typography>
                
                <div className={classes.grow} ></div>
                <div className={classes.sectionDesktop} >
                    <Button size="large" onClick={IraInicio} variant="outlined" color="inherit" > Ir a Inicio </Button>
                </div>
                
                <div className={classes.grow} ></div>
                <div className={classes.sectionDesktop} >
                    <Button size="large" color="inherit" onClick={logout} >Logout</Button>
                </div>
                <div className={classes.sectionMobile} >
                    <IconButton color="inherit">
                        <i className="material-icons">more_vert</i>
                    </IconButton>
                </div>

            </Toolbar>
            
        </div>
    );
};

export default BarSessionUno;