import { IProduct } from "./IProduct";
import { ITakeOff } from "./ITakeOff";

export interface IState {
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