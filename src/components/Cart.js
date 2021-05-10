import React from 'react';
import formatCurrency from '../utils';

const Cart = ({ cartItems, removeFromCart }) => {
    let totalItems = 0;
    cartItems.forEach(item => totalItems += item.count);
    return (
        <>
        {/* Cart Header */}
            <div>
                { cartItems.length === 0 ? (
                <div className="cart cart-header">Cart Is Empty</div>
                ) : (
                <div className="cart cart-header">You have {totalItems} items in the cart {" "}</div>
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
            <div className="cart">
                <div className="total">
                    <div>
                    Total{" "}
                            {formatCurrency(cartItems.reduce((a, item) => a + (item.price * item.count), 0))}</div>
                    <button className="button primary">Proceed</button>
                </div>
            </div>
            )}
        </>
    )
}

export default Cart
