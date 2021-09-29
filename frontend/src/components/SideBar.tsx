import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import ViewListIcon from '@material-ui/icons/ViewList';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import React from 'react'


import useStyles from '../styles';

export default function SideBar(props: {
    open: boolean,
    handleDrawerClose: () => void
}) {
    const classes = useStyles();
    const { open, handleDrawerClose } = props;
 
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List> 
                <ListItem button key={'Stock'} onClick={() => window.location.href = "./home"}>
                    <ListItemIcon style={{ color: "#FFF" }}>
                        <ViewListIcon/>
                    </ListItemIcon>
                    <ListItemText primary={'Stock'} />
                </ListItem>
                    <ListItem button key={'Salidas'} onClick={() => window.location.href = "./takesout"}>
                        <ListItemIcon style={{ color: "#FFF" }}>
                            <ShowChartIcon  />
                        </ListItemIcon>
                        <ListItemText primary={'Salidas'} />
                    </ListItem>
            </List>
            <Divider />
        </Drawer>
    )
}
