import { FETCH_PRODUCTS_STARTED, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    items: []
};

export const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS_STARTED:
            return {
                ...state,
                loading: true
            }
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                items: action.payload
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default: return state;
    }
}