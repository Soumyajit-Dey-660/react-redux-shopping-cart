// Feature 1
import React, { useState } from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';

const App = () => {
  const [productsData, setProductsData] = useState({
    products: data.products,
    size: '',
    sort: ''
  });

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

  return (
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
            <Products productsData={productsData} />
          </div>
          <div className="sidebar">
            Cart Items
          </div>
        </div>
      </main>
      <footer>All rights reserved.</footer>
    </div>
  );
}

export default App;
