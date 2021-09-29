import React, { useContext } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import SimpleAlert from './SimpleAlert';
import { Store } from '../Store';
import { addProductUnits } from '../actions/productActions';
import { IProduct } from '../interfaces/IProduct';

export default function AddUnitsFormDialog(
    props: {
        open: boolean,
        onClose: () => void,
        product: IProduct | null
    }) {

    const { open, product, onClose } = props;

    const { dispatch } = useContext(Store);
    // control opening alert
    const [openAlert, setOpenAlert] = React.useState(false);
    const onCloseAlert = () => {
        setOpenAlert(!openAlert);
    }

    const [unitsAmount, setUnitsAmount] = React.useState<number>(0);
    const [expiryDate, setExpiryDate] = React.useState<Date>(new Date());
    const [admissionDate, setAdmissionDate] = React.useState<Date>(
        new Date(),
    ); 

    const handleExpiryDateChange = (date: Date | any) => {
        setExpiryDate(date);
    };

    const handleAdmissionDateChange = (date: Date | any) => {
        setAdmissionDate(date);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUnitsAmount(Number.parseInt(e.target.value));
    }
 
    const handleSave = () => {
        if (unitsAmount > 0 && admissionDate && expiryDate) {
            addProductUnits(dispatch, {
                _id: product?._id,
                units: [{
                    expiry_date: expiryDate,
                    admission_date: admissionDate,
                    amount: unitsAmount,
                }]
            });
            // reset fields
            setUnitsAmount(0);
            setExpiryDate(new Date());
            setAdmissionDate(new Date());
            onClose();
        } else {
            setOpenAlert(true);
        }
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{"Agregar unidades a " + product?.name}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {
                        'Usted está por agregar unidades al producto "' + product?.name + '". Haga clic en guardar para confirmar cambios. Presione cancelar, escape o clic fuera del dialogo para salir sin guardar.'
                    }
                </DialogContentText>
                <>
                    <TextField
                        margin="dense"
                        name="amount"
                        label="Cantidad"
                        type="number"
                        InputProps={{ inputProps: { min: 1 } }}
                        onChange={handleAmountChange}
                        style={{ padding: '1rem' }}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            format="dd/MM/yyyy"
                            margin="normal"
                            label="Vencimiento"
                            value={expiryDate}
                            onChange={handleExpiryDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'elegir fecha',
                            }}
                            minDate={new Date()}
                        />
                        <KeyboardDatePicker
                            disableToolbar
                            format="dd/MM/yyyy"
                            margin="normal"
                            label="Ingreso"
                            value={admissionDate}
                            onChange={handleAdmissionDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'elegir fecha',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSave} color="primary">
                    Guardar
                </Button>
            </DialogActions>
            <SimpleAlert open={openAlert} handleClose={onCloseAlert} message={"Ningun campo puede ser vacío"} />
        </Dialog>
    )
}
