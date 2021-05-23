import axios from 'axios';
import { CREATE_ORDER_STARTED,
CREATE_ORDER_SUCCESS,
CREATE_ORDER_FAILURE,
CLEAR_CART,
CLEAR_ORDER } from '../actionTypes';

const createOrderStarted = () => {
    return {
        type: CREATE_ORDER_STARTED
    }
}

const createOrderItem = (order, success) => {
    return {
        type: CREATE_ORDER_SUCCESS,
        payload: {
            message: success,
            order: order
        }
    }
}

const createOrderFailure = error => {
    return {
        type: CREATE_ORDER_FAILURE,
        payload: {
            message: error
        }
    }
}

const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

const clearOrderItems = () => {
    return {
        type: CLEAR_ORDER
    }
}

export const createOrder = order => dispatch => {
    dispatch(createOrderStarted());
    axios.post('/api/orders', order)
        .then(response => {
            if (response.data.error === false) {
                if (response.status === 200) {
                    dispatch(createOrderItem(response.data.order, response.data.message));
                    localStorage.clear('cartItems');
                    dispatch(clearCart());
                } else {
                    dispatch(createOrderFailure(response.data.message))
                }
            } else {
                dispatch(createOrderFailure(response.data.message))
            }
        })
        .catch(error => dispatch(createOrderFailure(error.message)))
}

export const clearOrder = () => dispatch => {
    dispatch(clearOrderItems());
}