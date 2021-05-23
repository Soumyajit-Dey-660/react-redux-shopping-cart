import { ADD_TO_CART, REMOVE_FROM_CART } from '../actionTypes';

const addItemToCart = product => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    let alreadyInCart = false;
    cartItems.forEach(item => {
        if (item._id === product._id) {
            alreadyInCart = true;
            item.count++;
        }
    })
    if (!alreadyInCart) cartItems.push({...product, count: 1}); 
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return {
        type: ADD_TO_CART,
        payload: {
            cartItems: cartItems
        }
    }
}

const removeItemFromCart = product => {
    let cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    cartItems = cartItems.filter(item => item._id !== product._id);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return {
        type: REMOVE_FROM_CART,
        payload: {
            cartItems: cartItems
        }
    }
}

export const addToCart = (items, product) => dispatch => {
    dispatch(addItemToCart(items, product));
}

export const removeFromCart = (items, product) => dispatch => {
    dispatch(removeItemFromCart(items, product));
}