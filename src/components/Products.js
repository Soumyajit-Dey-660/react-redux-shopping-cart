/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { fetchProducts } from '../actionCreators/productActions';
import { addToCart } from '../actionCreators/cartActions';

const Products = (props) => {
    const [product, setProduct] = useState(null);

    const openModal = product => {
        setProduct(product);
    }

    const closeModal = () => {
        setProduct(null);
    }

    useEffect(() => {
        props.getProducts();
    }, [])

    return (
        <div>
            <Fade bottom cascade>
                {props.loading ? "Loading..." :
                    props.error ? props.error :
                    <ul className='products'>
                        {props.items.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id} onClick={() => openModal(product)}>
                                        <img src={product.image} alt={product.title}></img>
                                        <p>{product.title}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.price)}</div>
                                        <button onClick={() => props.addToCart(product)} className="button primary">Add To Cart</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>}

            </Fade>
            {product && (
                <Modal
                    isOpen={true}
                    onRequestClose={closeModal}
                >
                    <Zoom>
                        <button className="close-modal" onClick={closeModal} >x</button>
                        <div className="product-details">
                            <img src={product.image} alt={product.title}></img>
                            <div className="product-details-description">
                                <p><strong>{product.title}</strong></p>
                                <p>{product.description}</p>
                                <p>Available Sizes:{" "} {product.availableSizes.map(size => (
                                    <span>{" "}
                                        <button className="button">{size}</button>
                                    </span>
                                ))}
                                </p>
                                <div className="product-price">
                                    <div>{formatCurrency(product.price)}</div>
                                    <button className="button primary" onClick={() => {
                                        props.addToCart(product);
                                        closeModal();
                                    }}>Add To Cart</button> 
                                </div>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.products.loading,
        error: state.products.error,
        items: state.products.filteredItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProducts: () => dispatch(fetchProducts()),
        addToCart: product => dispatch(addToCart(product))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);
