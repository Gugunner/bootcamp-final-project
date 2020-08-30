import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    colorPrimary: {
        backgroundColor: "rgb(72, 137, 247)"
    },
    colorInherit: {
        color: "white"
    }
}));

const ButtonAppBar = ({toggleDrawer}) => {
    const classes = useStyles();
    const handleDrawer = (status) => {
        toggleDrawer(status);
    };
    return (
        <div className={classes.root} style={{backgroundColor: "orange"}}>
            <AppBar position="static" className={classes.colorPrimary}>
                <Toolbar>
                    <IconButton onClick={() => handleDrawer(true)}  edge="start" className={`${classes.menuButton} ${classes.colorInherit}`} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Bootcamp Final Project
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ButtonAppBar;