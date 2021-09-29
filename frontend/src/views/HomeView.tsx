import { CircularProgress, IconButton, InputBase } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ProductView from './ProductView'
import useStyles from '../styles';
import EditFormDialog from '../dialogs/EditFormDialog';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { fetchProducts } from '../actions/productActions';
import { Store } from '../Store';
import { Alert } from '@material-ui/lab';
import { IProduct } from '../interfaces/IProduct';


export default function HomeView() {
    const classes = useStyles();

    const { state, dispatch } = useContext(Store);
    const { products, loading, error } = state ? state.productList : { products: null, loading: true, error: '' };
 
    // variable to control create new product form
    const [openNew, setOpenNew] = React.useState(false);
    // use this to control side bar opening (expand)
    const [open, setOpen] = React.useState(false);
    // variable to control real time search
    const [search, setSearch] = React.useState("");

    useEffect(() => {
        fetchProducts(dispatch);
    }, [dispatch, state?.productsChange]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLocaleLowerCase()); 
    }

    const onCloseNew = () => {
        setOpenNew(!openNew);
    }

    return (
        <div>
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <div className={classes.searchDiv}>
                <SearchIcon style={{ color: "#4a235a" }} />
                <InputBase
                    autoFocus
                    className={classes.search}
                    placeholder="Buscar Producto/Categoria"
                    onChange={handleChange}
                />
                <IconButton className={classes.addButton} onClick={() => setOpenNew(!openNew)}>
                    <AddCircleIcon />
                    Nuevo Producto
                </IconButton>
            </div>
            {
                loading ? <CircularProgress disableShrink /> :
                    error ? <Alert style={{marginLeft: '4rem' }} severity='error'>{error}</Alert> :
                        products ? <ProductView products={
                            products.filter(({ name, category }: IProduct) =>
                                name.toLocaleLowerCase().includes(search) || category.toLocaleLowerCase().includes(search))} /> : <></>
            }
            <SideBar open={open} handleDrawerClose={handleDrawerClose} />
            <EditFormDialog open={openNew} onClose={onCloseNew} product={null} />
        </div>
    )
}
