import {
    CREATE_ORDER_STARTED,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    CLEAR_ORDER
} from '../actionTypes';

const initialState = {
    loading: false,
    error: false,
    message: '',
    order: {}
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_ORDER_STARTED:
            return {
                ...state,
                loading: true,
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                message: action.payload.message,
                order: action.payload.order
            }
        case CREATE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                message: action.payload.message,
                order: {}
            }
        case CLEAR_ORDER:
            return {
                ...state,
                order: {}
            }
        default: return state
    }
}