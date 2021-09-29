import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Collapse,
    Box,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'; 

import useStyles from '../styles';
import { ITakeOff } from '../interfaces/ITakeOff'; 

export default function TakeRow(props: { takeoff: ITakeOff }) {
    const classes = useStyles();
    const { takeoff } = props;
    const [open, setOpen] = React.useState(false);
 
    return (
        <React.Fragment>
            <TableRow hover>
                <TableCell component="th" scope="row" className={classes.tableCell}  onClick={() => setOpen(!open)}>
                    <IconButton aria-label="expand row" size="small">
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {new Date(takeoff.week_start).toLocaleDateString('es-ES') + " - " + new Date(takeoff.week_end).toLocaleDateString('es-ES')}
                </TableCell>
            </TableRow>
            <TableRow >
                <TableCell size="small" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.subTableCellHead}>Producto</TableCell>
                                        <TableCell align='center' className={classes.subTableCellHead}>Ingreso</TableCell>
                                        <TableCell align='center' className={classes.subTableCellHead}>Vencimiento</TableCell>
                                        <TableCell align='center' className={classes.subTableCellHead}>Fecha Retiro</TableCell>
                                        <TableCell align='center' className={classes.subTableCellHead}>Unidades</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {takeoff.products.map((product) => (
                                        <TableRow hover key={product._id}>
                                            <TableCell component="th" scope="row" className={classes.subTableCell}>
                                                {product.name}
                                            </TableCell>
                                            <TableCell align='center' className={classes.subTableCell}>
                                                {new Date(product.admission_date).toLocaleDateString('es-ES')}
                                            </TableCell>
                                            <TableCell align='center' className={classes.subTableCell}>
                                                {new Date(product.expiry_date).toLocaleDateString('es-ES')}
                                            </TableCell>
                                            <TableCell align='center' className={classes.subTableCell}>
                                                {new Date(product.retirement_date).toLocaleDateString('es-ES')}
                                            </TableCell>
                                            <TableCell align='center' className={classes.subTableCell}>
                                                {product.amount}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}
