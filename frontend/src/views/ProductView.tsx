import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    Box,
} from '@material-ui/core';
import React from 'react'

import useStyles from '../styles';
import ProductRow from '../components/ProductRow';
import { IProduct } from '../interfaces/IProduct';

export default function ProductView(props: { products: IProduct[] }) {
    const classes = useStyles();
    const { products } = props;
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                            <TableCell align="left" className={classes.tableCellHead}>Producto</TableCell>
                            <TableCell align="center" className={classes.tableCellHead}>Categoria</TableCell>
                            <TableCell align="center" className={classes.tableCellHead}>Unidades</TableCell>
                            {/*<TableCell align="right" className={classes.tableCellHead}>Aviso</TableCell>*/}
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product: IProduct) => (
                                <ProductRow key={product._id} product={product} />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 75, 100]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Productos por página"
                nextIconButtonText="Siguiente"
                backIconButtonText="Anterior"
                className={classes.tablePagination}
            />
        </Box>
    )
}
