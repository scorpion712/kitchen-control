import React, { useContext, useEffect } from 'react'
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Box,
    CircularProgress,
} from '@material-ui/core';

import useStyles from '../styles';
import TakeRow from '../components/TakeRow';
import { ITakeOff } from '../interfaces/ITakeOff';
import { Store } from '../Store';
import { fetchTakesOff } from '../actions/takesOffActions';
import { Alert } from '@material-ui/lab';

export default function TakeOffView() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const { state, dispatch } = useContext(Store);
    const { takesOff, loading, error } = state ? state.takesOffList : { takesOff: [], loading: true, error: '' };
    useEffect(() => {
        fetchTakesOff(dispatch);
    }, [dispatch]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box className={classes.root}>
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead >
                        <TableRow className={classes.tableRow}>
                            <TableCell align="left" className={classes.tableCellHead}>Semana</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading ? <CircularProgress disableShrink /> :
                                error ? <Alert severity='error'>{error}</Alert> :
                                    takesOff?.map((takeout: ITakeOff) => (
                                        <TakeRow key={takeout._id} takeoff={takeout} />
                                    ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 75, 100]}
                component="div"
                count={takesOff ? takesOff.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Salidas de almacen por página"
                nextIconButtonText="Siguiente"
                backIconButtonText="Anterior"
                className={classes.tablePagination}
            />
        </Box>
    )
}
