// Feature 1
import React, { useState } from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
  const [productsData, setProductsData] = useState({
    products: data.products,
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    size: '',
    sort: ''
  });

  const addToCart = product => {
    const cartItems = productsData.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    })
    if (!alreadyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    setProductsData({
      ...productsData,
      cartItems: cartItems
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  const removeFromCart = product => {
    const cartItems = productsData.cartItems.slice();
    setProductsData({
      ...productsData,
      cartItems: cartItems.filter(item => item._id !== product._id)
    })
    localStorage.setItem('cartItems', JSON.stringify(cartItems.filter(item => item._id !== product._id)));
  }

  const handleSort = event => {
    // console.log(event.target.value);
    const sort = event.target.value;
    setProductsData({
      ...productsData,
      sort: sort,
      products: data.products.slice().sort((a, b) => {
        if (sort === 'lowest') {
          if (a.price > b.price) return 1;
          else return -1;
        } else if (sort === 'highest') {
          if (a.price < b.price) return 1;
          else return -1;
        } else {
          if (a._id > b._id) return 1;
          else return -1;
        }
      })
    })
  }

  const handleSize = event => {
    // console.log(event.target.value);
    if (event.target.value === '') {
      setProductsData({
        ...productsData,
        size: event.target.value
      })
    } else {
      setProductsData({
        ...productsData,
        size: event.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)
      })
    }
  }

  const createOrder = order => {
    alert("Order placed for "+order.name)
  }

  return (
    <Provider store={store}>
    <div className="grid-container">
      <header><a href='/'>React Shopping Cart</a></header>
      <main>
        <div className="content">
          <div className="main">
            <Filter 
              count={productsData.products.length} 
              sort={productsData.sort}
              size={productsData.size}
              handleSort={handleSort}
              handleSize={handleSize}
            />
            <Products 
              productsData={productsData} 
              addToCart={addToCart}
            />
          </div>
          <div className="sidebar">
            <Cart 
              cartItems={productsData.cartItems}
              removeFromCart={removeFromCart}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>All rights reserved.</footer>
    </div>
    </Provider>
  );
}

export default App;
