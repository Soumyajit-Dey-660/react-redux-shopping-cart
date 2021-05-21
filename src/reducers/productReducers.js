import { FETCH_PRODUCTS_STARTED, 
FETCH_PRODUCTS_SUCCESS, 
FETCH_PRODUCTS_FAILURE,
FILTER_PRODUCTS_BY_SIZE,
ORDER_PRODUCTS_BY_PRICE } from '../actionTypes';

const initialState = {
    loading: false,
    error: null,
    items: [],
    filteredItems: [],
    size: '',
    price: ''
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
                items: action.payload,
                filteredItems: action.payload
            }
        case FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        case FILTER_PRODUCTS_BY_SIZE:
            return {
                ...state,
                size: action.payload.size,
                filteredItems: action.payload.items
            }
        case ORDER_PRODUCTS_BY_PRICE:
            return {
                ...state,
                price: action.payload.price,
                filteredItems: action.payload.items
            }
        default: return state;
    }
}