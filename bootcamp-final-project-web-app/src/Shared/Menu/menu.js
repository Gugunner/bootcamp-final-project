import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Link } from "react-router-dom";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from '@material-ui/core/ListItemText';
import ButtonAppBar from "./appbar";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});
const items = [
    { id: "HOME", icon: <HomeIcon />, select: false, path:"/home" },
    { id: "STARTUPS LATAM", icon: <DashboardIcon />, select: false, path:"/startup-dashboard" }
]
const BootcampFinalProjectMenuDrawer = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(() => false);

    const toggleDrawer = (status) => (event) => {
        setOpen(status);
    };

    const list = () => (
        <div
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {items.slice(0,1).map((listItem, index) => (
                    <Link key={listItem.id} to={listItem.path} style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItem button >
                            <ListItemIcon>{listItem.icon}</ListItemIcon>
                            <ListItemText primary={listItem.id} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {items.slice(1).map((listItem, index) => (
                    <Link key={listItem.id} to={listItem.path} style={{textDecoration: 'none', color: 'inherit'}}>
                        <ListItem button >
                            <ListItemIcon>{listItem.icon}</ListItemIcon>
                            <ListItemText primary={listItem.id} />
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <ButtonAppBar toggleDrawer={setOpen} />
            <Drawer anchor={"left"} open={open} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </div>
    );
};

export default BootcampFinalProjectMenuDrawer;
