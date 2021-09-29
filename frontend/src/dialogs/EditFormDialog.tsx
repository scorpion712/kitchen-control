import React, { useContext } from 'react'
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
import { IProduct } from '../interfaces/IProduct';
import { addProduct, editProduct } from '../actions/productActions';
import { Store } from '../Store';

export default function EditFormDialog(props: { open: boolean, onClose: () => void, product: IProduct | null }) {
  const { open, product, onClose } = props;

  const { dispatch } = useContext(Store);

  const handleSave = () => {

    if ((!product && (productName === '' || productCategory === '' || productAmount < 1 || admissionDate === null || expiryDate === null)) ||
      (product && (productName === '' || productCategory === ''))) {
      setOpenAlert(true);
    } else {
      product ?  editProduct(dispatch, {
        _id: product._id,
        name: productName,
        category: productCategory
      })
        : addProduct(dispatch, {
          name: productName,
          category: productCategory,
          units: [
            {
              expiry_date: expiryDate,
              admission_date: admissionDate,
              amount: productAmount
            }
          ]
        });

      onClose();
    }
  }

  // Variables to save inputs for a new product
  const [productName, setProductName] = React.useState<string>(product ? product.name : '');
  const [productCategory, setProductCategory] = React.useState<string>(product ? product.category : '');
  const [productAmount, setProductAmount] = React.useState<number>(0);
  // expiry date
  const [expiryDate, setExpiryDate] = React.useState<Date>(new Date());
  // admission date
  const [admissionDate, setAdmissionDate] = React.useState<Date>(
    new Date(),
  );
  const handleExpiryDateChange = (date:Date | any ) => {
    setExpiryDate(date);
  };

  const handleAdmissionDateChange = (date: Date | any) => {
    setAdmissionDate(date);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductCategory(e.target.value);
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductAmount(Number.parseInt(e.target.value));
  }
  // control opening alert
  const [openAlert, setOpenAlert] = React.useState(false);
  const onCloseAlert = () => {
    setOpenAlert(!openAlert);
  }



  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{product ? "Editando " + product.name : "Registrar nuevo"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {product ? 'Usted está editando el producto "' + product.name + '". Haga clic en guardar para confirmar cambios. Presione cancelar, escape o clic fuera del dialog para salir sin guardar.'
            : "Registrar nuevo producto"}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Nombre producto"
          type="text"
          fullWidth
          defaultValue={product ? product.name : ''}
          onChange={handleNameChange}
        />
        <TextField
          margin="dense"
          name="category"
          label="Categoria del producto"
          type="text"
          fullWidth
          defaultValue={product ? product.category : ''}
          onChange={handleCategoryChange}
        />
        {!product &&
          <>
            <TextField
              margin="dense"
              name="amount"
              label="Cantidad"
              type="number"
              InputProps={{ inputProps: { min: 1} }}
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
        }{/*
          <TextField
            autoFocus
            margin="dense"
            id="days"
            label="Días aviso fin"
            type="number" 
            variant="filled"  
          /> */}
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
