import axios from 'axios';
import { FETCH_PRODUCTS_STARTED, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from '../actionTypes';

const fetchProductsStarted = () => {
    return {
        type: FETCH_PRODUCTS_STARTED
    }
} 

const fetchProductsSuccess = items => {
    return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload: items
    }
}

const fetchProductsFailure = error => {
    return {
        type: FETCH_PRODUCTS_FAILURE,
        payload: error
    }
}

export const fetchProducts = () => dispatch => {
    console.log('called?');
    dispatch(fetchProductsStarted());
    axios.get('/api/products')
        .then(response => response.data)
        .then(response => dispatch(fetchProductsSuccess(response.data)))
        .catch(error => dispatch(fetchProductsFailure(error.message)))
};