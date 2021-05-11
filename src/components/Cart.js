import React, { useState } from 'react';
import formatCurrency from '../utils';

const Cart = ({ cartItems, removeFromCart, createOrder }) => {
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
            cartItems: cartItems
        }
        console.log(order)
        createOrder(order);
    }

    return (
        <>
        {/* Cart Header */}
            <div>
                { cartItems.length === 0 ? (
                
                <div className="cart cart-header">Cart Is Empty</div>
                ) : (
                <div className="cart cart-header">You have {getTotalItems(cartItems)} items in the cart {" "}</div>
                )}
            </div>
            {/* Cart Items display */}
            <div className="cart">
                <ul className="cart-items">
                    {cartItems.map(item => 
                        (<li key={item._id}>
                            <div>
                                <img src={item.image} alt={item.title}></img>
                            </div>
                            <div>{cartItems.title}</div>
                            <div className="right">
                            {formatCurrency(item.price)} X {item.count}{" "}
                                <button className="button" onClick={() => removeFromCart(item)}>Remove</button>
                            </div>
                        </li>))}
                </ul>
            </div>
            {cartItems.length !== 0 && (
            <div>
                <div className="cart">
                    <div className="total">
                        <div>
                        Total{" "}
                                {formatCurrency(cartItems.reduce((a, item) => a + (item.price * item.count), 0))}</div>
                        <button 
                                onClick={proccedCheckout}
                            // onClick={setShowCheckout(true)} 
                            className="button primary"
                        >Proceed</button>
                    </div>
                </div>
                    {showCheckout && (
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
                    )}
            </div>
            )}
        </>
    )
}

export default Cart
