import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderReducer } from './reducers/orderReducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;