import Axios from 'axios'; 

import {
    PRODUCT_ADD_FAIL,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_REQUEST,
    PRODUCT_EDIT_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_REMOVE_REQUEST,
    PRODUCT_REMOVE_SUCCESS,
    PRODUCT_REMOVE_FAIL,
    PRODUCT_UNIT_ADD_REQUEST,
    PRODUCT_UNIT_ADD_SUCCESS,
    PRODUCT_UNIT_ADD_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL
} from "../constants"
import { IEditProduct, IProduct, IProductRemove, IProductUnitAdd } from '../interfaces/IProduct';

export const fetchProducts = async (dispatch: any) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/products');
        return dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data,
        })
    } catch (error: any) {
        return dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message,
        })
    }
}

export const addProduct = async (dispatch: any, product: IProduct | null) => {
    dispatch({ type: PRODUCT_ADD_REQUEST });
    try {
        const {data} = await Axios.post('api/products', product);
        dispatch({
            type: PRODUCT_ADD_SUCCESS,
            payload: data,
        });
    } catch (error: any) {
        return dispatch({
            type: PRODUCT_ADD_FAIL,
            payload: error.message,
        })
    }
}

export const addProductUnits = async (dispatch: any, unit: IProductUnitAdd) => {  
    dispatch({ type: PRODUCT_UNIT_ADD_REQUEST });
    try {
        const {data} = await Axios.post('api/products/units', unit);
        dispatch({
            type: PRODUCT_UNIT_ADD_SUCCESS,
            payload: data,
        })
    } catch (error: any) {
        return dispatch({
            type: PRODUCT_UNIT_ADD_FAIL,
            payload: error.message,
        })
    }
}

export const editProduct = async (dispatch: any, product: IProduct | IEditProduct ) => {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    try {
        const {data} = await Axios.put('api/products/'+product?._id, product);
        dispatch({
            type: PRODUCT_EDIT_SUCCESS,
            payload: data,
        })
    } catch (error: any) {
        return dispatch({
            type: PRODUCT_EDIT_FAIL,
            payload: error.message,
        })
    }
}

// remove units from a given product
export const removeProductUnits = async (dispatch: any, productToRemove: IProductRemove) => {
    dispatch({ type: PRODUCT_REMOVE_REQUEST}); 
    try { 
        const {data} = await Axios.put('api/products/edit/'+productToRemove?._id, productToRemove);
        dispatch({
            type: PRODUCT_REMOVE_SUCCESS,
            payload: data,
        })
    } catch (error: any) {
        return dispatch({
            type: PRODUCT_REMOVE_FAIL,
            payload: error.message,
        })
    }
}

// delete product by given id
export const removeProduct = async (dispatch: any, product_id: string) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST}); 
    try { 
        const {data} = await Axios.delete('api/products/'+product_id);
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
        })
    } catch (error: any) {
        return dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.message,
        })
    }
}