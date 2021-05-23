// Feature 1
import React, { useState } from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
  // const [productsData, setProductsData] = useState({
  //   products: data.products,
  //   cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
  //   size: '',
  //   sort: ''
  // });

  // const addToCart = product => {
  //   const cartItems = productsData.cartItems.slice();
  //   let alreadyInCart = false;
  //   cartItems.forEach(item => {
  //     if (item._id === product._id) {
  //       item.count++;
  //       alreadyInCart = true;
  //     }
  //   })
  //   if (!alreadyInCart) {
  //     cartItems.push({ ...product, count: 1 })
  //   }
  //   setProductsData({
  //     ...productsData,
  //     cartItems: cartItems
  //   })
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // }

  // const removeFromCart = product => {
  //   const cartItems = productsData.cartItems.slice();
  //   setProductsData({
  //     ...productsData,
  //     cartItems: cartItems.filter(item => item._id !== product._id)
  //   })
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item => item._id !== product._id)));
  // }

  // const createOrder = order => {
  //   alert("Order placed for "+order.name)
  // }

  return (
    <Provider store={store}>
    <div className="grid-container">
      <header><a href='/'>React Shopping Cart</a></header>
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products />
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </main>
      <footer>All rights reserved.</footer>
    </div>
    </Provider>
  );
}

export default App;
