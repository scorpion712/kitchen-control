import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import React from 'react';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from '../styles';

export default function Header(props: {open:boolean, handleDrawerOpen: () => void}) {
    const classes = useStyles();

    const {open, handleDrawerOpen} = props;

    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}>
            <Toolbar variant="dense">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" style={{flex: 1}}>
                    Stock Alimentos Hogar
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
