import axios from 'axios';
import { FETCH_PRODUCTS_STARTED, 
FETCH_PRODUCTS_SUCCESS, 
FETCH_PRODUCTS_FAILURE,
FILTER_PRODUCTS_BY_SIZE,
ORDER_PRODUCTS_BY_PRICE } from '../actionTypes';

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

const filteredBySize = (products, size) => {
    return {
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items: size === ''
            ? products 
            : products.filter(item => item.availableSizes.indexOf(size) >= 0)
        }
    }
}

const orderByPrice = (products, price) => {
    const sortedProducts = products.slice();
    console.log('PRICE ', price)
    if (price === 'latest') {
        sortedProducts.sort((a, b) => a._id > b._id ? 1 : -1);
    } else {
        if (price === 'lowest')
            sortedProducts.sort((a, b) => a.price > b.price ? 1 : -1);
        else
            sortedProducts.sort((a, b) => a.price < b.price ? 1 : -1)
    }
    return {
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            price: price,
            items: sortedProducts
            // price === '' 
            // ? products.sort((a, b) => a._id > b._id)
            // : price === 'lowest' 
            // ? products
            // : products.sort((a, b) => a.price < b.price ? 1 : -1)
        }
    }
}

export const fetchProducts = () => dispatch => {
    dispatch(fetchProductsStarted());
    axios.get('/api/products')
        .then(response => response.data)
        .then(response => dispatch(fetchProductsSuccess(response.data)))
        .catch(error => dispatch(fetchProductsFailure(error.message)))
};

export const filterProducts = (products, size) => dispatch => {
    dispatch(filteredBySize(products, size));
}

export const orderProducts = (products, price) => dispatch => {
    dispatch(orderByPrice(products, price));
}