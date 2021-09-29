import { Typography } from '@material-ui/core';
import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import TakeOffView from './TakeOffView';

export default function TakeOffScreen() {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <div>
                <Typography style={{marginTop: '5rem', color: "#17202a"}}  variant="h4" gutterBottom>
                    Salidas por semanas
                </Typography>
                <TakeOffView/>
            </div>
            <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        </div>
    )
}
