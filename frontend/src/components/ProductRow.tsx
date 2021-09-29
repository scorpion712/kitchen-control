import React, { useContext } from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Collapse,
    Box,
    TextField,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import moment from 'moment';

import useStyles from '../styles';
import EditFormDialog from '../dialogs/EditFormDialog';
import SimpleAlert from '../dialogs/SimpleAlert';
import { IProduct, IProductRemove, IProductUnit } from '../interfaces/IProduct';
import { removeProduct, removeProductUnits } from '../actions/productActions';
import { Store } from '../Store';
import AddUnitsFormDialog from '../dialogs/AddUnitsFormDialog';
import { addTakeOff } from '../actions/takesOffActions';

export default function ProductRow(props: { product: IProduct }) {
    const classes = useStyles();
    const { product } = props;
    // expand collapse on table
    const [open, setOpen] = React.useState(false);
    // control open dialog to edit a product
    const [openEdit, setOpenEdit] = React.useState(false);
    const onCloseEdit = () => {
        setOpenEdit(!openEdit);
    }
    // control open dialog to add units to a product
    const [openAdd, setOpenAdd] = React.useState(false);
    const onCloseAdd = () => {
        setOpenAdd(!openAdd);
    }
    // variables and functions usefull to remove a product from stock and save the amount to delete
    const [openAlert, setOpenAlert] = React.useState(false); // control opening alert
    const onCloseAlert = () => {
        setOpenAlert(!openAlert);
    }
    // product units to remove from stock
    const [productRemove, setProductRemove] = React.useState<IProductRemove | null>({
        _id: product._id,
        amount: 0
    });
    const { dispatch } = useContext(Store);

    const removeFromStock = (product_name: string, unit: IProductUnit) => {
        if (productRemove && productRemove.amount > 0) {
            removeProductUnits(dispatch, productRemove);
            addTakeOff(dispatch, {
                // use endOf to find by date  while update using $lte: date
                week_start: moment().weekday(0).endOf('day').toDate(), 
                week_end: moment().weekday(7).endOf('day').toDate(),
                products: [{
                    name: product_name,
                    expiry_date: unit.expiry_date,
                    admission_date: unit.admission_date,
                    amount: productRemove.amount,
                    retirement_date: new Date(),
                }]
            });
        } else {
            setOpenAlert(!openAlert);
        }
    }
    // handle input text to control amount to delete
    const handleChange = (product: IProduct, unit: IProductUnit, event: React.ChangeEvent<HTMLInputElement>) => {
        unit.amount < Number.parseInt(event.target.value) ?
            setOpenAlert(!openAlert)
            :
            setProductRemove({ ...productRemove, unit_id: unit._id, amount: Number.parseInt(event.target.value) });
    }

    const handleDelete = (id:string | undefined) => {
        removeProduct(dispatch, id? id : '');
    }

    return (
        <React.Fragment>
            <TableRow hover>
                <TableCell component="th" scope="row" className={classes.tableCell} onClick={() => setOpen(!open)}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {product.name}
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>{product.category}</TableCell>
                <TableCell align="center" className={classes.tableCell}>{product.units.reduce((sum, unit) => sum + unit.amount, 0)}</TableCell>
                <TableCell align="justify" padding='normal' className={classes.tableCell}>
                    <IconButton title='Editar producto' aria-label="edit" style={{ color: "#d35400" }} size="medium" onClick={() => setOpenEdit(!openEdit)}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton title='Agregar unidades' aria-label="add-units" style={{ color: "#900C3F" }} size="medium" onClick={() => setOpenAdd(!openAdd)}>
                        <PostAddIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton title="Eliminar de Stock" style={{color: ' #a60606 '}} size='medium' onClick={() => handleDelete(product._id)}>
                        <DeleteForeverIcon fontSize='inherit'/>
                    </IconButton>
                </TableCell>
                {/*<TableCell align="right">{product.days_off}</TableCell>*/}
            </TableRow>
            <TableRow >
                <TableCell size="small" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={1}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.subTableCellHead}>Ingreso</TableCell>
                                        <TableCell className={classes.subTableCellHead}>Vencimiento</TableCell>
                                        <TableCell align="right" className={classes.subTableCellHead}>Unidades</TableCell>
                                        <TableCell />
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {product.units.map((unit) => (
                                        <TableRow hover key={unit._id}>
                                            <TableCell component="th" scope="row" className={classes.subTableCell}>
                                                {new Date(unit.admission_date).toLocaleDateString('es-ES')}
                                            </TableCell>
                                            <TableCell className={classes.subTableCell}>{new Date(unit.expiry_date).toLocaleDateString('es-ES')}</TableCell>
                                            <TableCell align="right" className={classes.subTableCell}>{unit.amount}</TableCell>
                                            <TableCell className={classes.subTableCell}>
                                                <TextField
                                                    margin="dense"
                                                    id="category"
                                                    label="Cantidad a descontar"
                                                    type="number"
                                                    variant="filled"
                                                    InputProps={{ inputProps: { min: 1, max: unit.amount } }}
                                                    onChange={(evt: React.ChangeEvent<HTMLInputElement>) => handleChange(product, unit, evt)}
                                                />
                                                <IconButton
                                                    title='Eliminar unidades'
                                                    aria-label="edit"
                                                    style={{ color: "#ff3333" }}
                                                    className={classes.margin}
                                                    size="medium"
                                                    onClick={() => removeFromStock(product.name, unit)}
                                                >
                                                    <RemoveCircleIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <EditFormDialog open={openEdit} onClose={onCloseEdit} product={product} />
            <AddUnitsFormDialog open={openAdd} onClose={onCloseAdd} product={product} />
            <SimpleAlert open={openAlert} handleClose={onCloseAlert} message={"Ingrese una cantidad valida"} />
        </React.Fragment>
    )
}
