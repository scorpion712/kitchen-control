import React, { createContext, useReducer } from 'react';

import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS,
    PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_ADD_FAIL,
    PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_EDIT_FAIL,
    PRODUCT_REMOVE_REQUEST, PRODUCT_REMOVE_SUCCESS, PRODUCT_REMOVE_FAIL,
    PRODUCT_UNIT_ADD_REQUEST, PRODUCT_UNIT_ADD_SUCCESS, PRODUCT_UNIT_ADD_FAIL,
    TAKEOFF_LIST_REQUEST, TAKEOFF_LIST_SUCCESS, TAKEOFF_LIST_FAIL,
    TAKEOFF_ADD_REQUEST, TAKEOFF_ADD_SUCCESS, TAKEOFF_ADD_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
} from './constants';
import { IProduct } from './interfaces/IProduct';
import { ITakeOff } from './interfaces/ITakeOff';

interface IState {
    productList: {
        loading: boolean,
        error?: string,
        products?: [IProduct],
    },
    takesOffList: {
        loading: boolean,
        error?: string,
        takesOff?: [ITakeOff],
    },
    productsChange: {
        loading: boolean,
        error?: string,
    }
}

interface IContext {
    state?: IState,
    dispatch?: any,
}

const initialState: IState = {
    takesOffList: { loading: true },
    productList: { loading: true },
    productsChange: { loading: true },
};

const initialContext: IContext = {
    state: {
        productList: {
            loading: true,
        },
        takesOffList: {
            loading: true,
        },
        productsChange: {
            loading: true
        },
    }
};
export const Store = createContext(initialContext);

function reducer(state: IState, action: any) {
    switch (action.type) {
        // fetch products
        case PRODUCT_LIST_REQUEST:
            return {
                ...state, productList: { loading: true }
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                productList: { loading: false, products: action.payload }
            }
        case PRODUCT_LIST_FAIL:
            return {
                ...state,
                productList: { loading: false, error: action.payload }
            }
        // create or add a new product
        case PRODUCT_ADD_REQUEST:
            return {
                ...state,
                productsChange: { loading: true },
            }
        case PRODUCT_ADD_SUCCESS:
            return {
                ...state,
                productsChange: { loading: false }
            }
        case PRODUCT_ADD_FAIL:
            return {
                ...state,
                productsChange: { loading: false, error: action.payload }
            }
        // edit an existing product
        case PRODUCT_EDIT_REQUEST:
            return {
                ...state,
                productsChange: { loading: true },
            }
        case PRODUCT_EDIT_SUCCESS:
            return {
                ...state,
                productsChange: { loading: false }
            }
        case PRODUCT_EDIT_FAIL:
            return {
                ...state,
                productsChange: { loading: false, error: action.payload }
            }
        // remove product amount
        case PRODUCT_REMOVE_REQUEST:
            return {
                ...state,
                productsChange: { loading: true },
            }
        case PRODUCT_REMOVE_SUCCESS:
            return {
                ...state,
                productsChange: { loading: false }
            }
        case PRODUCT_REMOVE_FAIL:
            return {
                ...state,
                productsChange: { loading: false, error: action.payload }
            }
        // delete product 
        case PRODUCT_DELETE_REQUEST:
            return {
                ...state,
                productsChange: { loading: true },
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                ...state,
                productsChange: { loading: false }
            }
        case PRODUCT_DELETE_FAIL:
            return {
                ...state,
                productsChange: { loading: false, error: action.payload }
            }
        // add product units
        case PRODUCT_UNIT_ADD_REQUEST:
            return {
                ...state,
                productsChange: { loading: true },
            }
        case PRODUCT_UNIT_ADD_SUCCESS:
            return {
                ...state,
                productsChange: { loading: false }
            }
        case PRODUCT_UNIT_ADD_FAIL:
            return {
                ...state,
                productsChange: { loading: false, error: action.payload }
            }
        // fetch takes off
        case TAKEOFF_LIST_REQUEST:
            return {
                ...state, takesOffList: { loading: true }
            }
        case TAKEOFF_LIST_SUCCESS:
            return {
                ...state,
                takesOffList: { loading: false, takesOff: action.payload }
            }
        case TAKEOFF_LIST_FAIL:
            return {
                ...state,
                takesOffList: { loading: false, error: action.payload }
            }
        // takeoff register
        case TAKEOFF_ADD_REQUEST:
            return {
                ...state,
            }
        case TAKEOFF_ADD_SUCCESS:
            return {
                ...state,
            }
        case TAKEOFF_ADD_FAIL:
            return {
                ...state,
                productsChange: { loading: false, error: action.payload }
            }
        // default action 
        default:
            return state;
    }
}

// StoreProvider wrapper for all components and provides states for all components/screen in the application
export function StoreProvider(props: any) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value: any = { state, dispatch };

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}