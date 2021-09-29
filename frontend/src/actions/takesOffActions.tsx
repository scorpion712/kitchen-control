import Axios from "axios";
import { TAKEOFF_ADD_FAIL, TAKEOFF_ADD_REQUEST, TAKEOFF_ADD_SUCCESS, TAKEOFF_LIST_FAIL, TAKEOFF_LIST_REQUEST, TAKEOFF_LIST_SUCCESS } from "../constants";
import { ITakeOff } from "../interfaces/ITakeOff";

export const fetchTakesOff = async (dispatch: any) => {
    dispatch({
        type: TAKEOFF_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get('/api/takesout');
        return dispatch({
            type: TAKEOFF_LIST_SUCCESS,
            payload: data,
        })
    } catch (error: any) {
        return dispatch({
            type: TAKEOFF_LIST_FAIL,
            payload: error.message,
        })
    }
}

export const addTakeOff = async (dispatch: any, takeOff: ITakeOff) => {
    dispatch({type: TAKEOFF_ADD_REQUEST});
    try {
        const { data } = await Axios.post('/api/takesout', takeOff);
        dispatch({
            type: TAKEOFF_ADD_SUCCESS,
            payload: data,
        }) 
    } catch (error: any) {
        return dispatch({
            type: TAKEOFF_ADD_FAIL,
            payload: error.message,
        })
    }
} 