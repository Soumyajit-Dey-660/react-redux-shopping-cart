/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import formatCurrency from '../utils';

const Products = ({ productsData, addToCart }) => {
    return (
        <div>
            <ul className='products'>
                {productsData.products.map(product => (
                    <li key={product._id}>
                        <div className="product">
                            <a href={"#" + product._id}>
                                <img src={product.image} alt={product.title}></img>
                                <p>{product.title}</p>
                            </a>
                            <div className="product-price">
                                <div>{formatCurrency(product.price)}</div>
                                <button onClick={() => addToCart(product)} className="button primary">Add To Cart</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Products
