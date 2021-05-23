import React, { useState } from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../actionCreators/cartActions';
import { createOrder, clearOrder } from '../actionCreators/orderActions';
import { clearCart } from '../actionCreators/cartActions';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import formatCurrency from '../utils';
import Fade from 'react-reveal/Fade';

const Cart = (props) => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        address: ''
    })

    const proccedCheckout = () => {
        setShowCheckout(true);
    }

    const getTotalItems = (cartItems) => {
        let totalItems = 0;
        cartItems.forEach(item => totalItems += item.count);
        return totalItems;
    }

    const handleInput = event => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
    }

    const createOrderObj = event => {
        event.preventDefault();
        const order = {
            name: userInfo.name,
            email: userInfo.email,
            address: userInfo.address,
            cartItems: props.items,
            total: props.items.reduce((a, b) => a + b.price * b.count, 0)
        }
        console.log(order);
        props.createOrder(order);
        props.clearCart();
        setShowCheckout(false);
    }

    const closeModal = () => {
        props.clearOrder();
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    return (
        <>
            {/* Cart Header */}
            <div>
                {props.items.length === 0 ? (

                    <div className="cart cart-header">Cart Is Empty</div>
                ) : (
                    <div className="cart cart-header">You have {getTotalItems(props.items)} items in the cart {" "}</div>
                )}
                {props.order.cartItems && 
                    <Modal
                        isOpen={true}
                        onRequestClose={closeModal}
                    >
                        <Zoom>
                            <button className='close-modal' onClick={closeModal}>x</button>
                            <div className='order-details'>
                                <h3 className='success-message'>Your order has been placed</h3>
                                <h2>Order {props.order._id}</h2>
                                <ul>
                                    <li>
                                        <div>Name:</div>
                                        <div>{props.order.name}</div>
                                    </li>
                                    <li>
                                        <div>Email:</div>
                                        <div>{props.order.email}</div>
                                    </li>
                                    <li>
                                        <div>Address:</div>
                                        <div>{props.order.address}</div>
                                    </li>
                                    <li>
                                        <div>Date:</div>
                                        <div>{formatDate(props.order.createdAt)}</div>
                                    </li>
                                    <li>
                                        <div>Total:</div>
                                        <div>{formatCurrency(props.order.total)}</div>
                                    </li>
                                    <li>
                                        <div>Cart Items:</div>
                                        <div>{props.order.cartItems.map(item => (
                                            <div>
                                                {item.count} x {item.title}
                                            </div>
                                        ))}</div>
                                    </li>
                                </ul>
                            </div>
                        </Zoom>
                    </Modal>}
            </div>
            {/* Cart Items display */}
            <div className="cart">
                <Fade left cascade>
                    <ul className="cart-items">
                        {props.items.map(item =>
                        (<li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title}></img>
                            </div>
                            <div>{props.items.title}</div> {/*  props.cartItems.title */}
                            <div className="right">
                                {formatCurrency(item.price)} X {item.count}{" "}
                                <button className="button" onClick={() => props.removeFromCart(item)}>Remove</button>
                            </div>
                        </li>))}
                    </ul>
                </Fade>
            </div>
            {props.items.length !== 0 && (
                <div>
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total{" "}
                                {formatCurrency(props.items.reduce((a, item) => a + (item.price * item.count), 0))}</div>
                            <button
                                onClick={proccedCheckout} 
                                className="button primary"
                            >Proceed</button>
                        </div>
                    </div>
                    {showCheckout && (
                        <Fade right cascade>
                            <div className="cart">
                                <form onSubmit={createOrderObj}>
                                    <ul className="form-container">
                                        <li>
                                            <label>Email</label>
                                            <input
                                                type='email'
                                                required
                                                name='email'
                                                placeholder='Email'
                                                value={userInfo.email}
                                                onChange={handleInput}
                                            />
                                        </li>
                                        <li>
                                            <label>Name</label>
                                            <input
                                                type='text'
                                                required
                                                name='name'
                                                placeholder="Name"
                                                value={userInfo.name}
                                                onChange={handleInput}
                                            />
                                        </li>
                                        <li>
                                            <label>Address</label>
                                            <input
                                                type='text'
                                                required
                                                name='address'
                                                placeholder="Address"
                                                value={userInfo.address}
                                                onChange={handleInput}
                                            />
                                        </li>
                                        <li>
                                            <button className='button primary' type='submit'>Checkout</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </Fade>
                    )}
                </div>
            )}
        </>
    )
}

const mapStateToProps = state => {
    return {
        order: state.order.order,
        items: state.cart.cartItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromCart: product => dispatch(removeFromCart(product)),
        createOrder: order => dispatch(createOrder(order)),
        clearOrder: () => dispatch(clearOrder()),
        clearCart: () => dispatch(clearCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
