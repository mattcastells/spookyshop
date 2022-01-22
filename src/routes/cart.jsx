import React, { useContext } from 'react';
import { CartContext } from "../components/cartContext";
import { Link } from 'react-router-dom';
import CartContent from '../components/cartContent';

const Cart = () => {
    const cartContext = useContext(CartContext)

    function renderItems(){
        return <div className="text-center mt-4 container">
            <CartContent enableEdit={true}/>
        <Link className="btn btn-success" to="/checkout">Complete Purchase</Link>
        </div>
    }

    function renderNoItems(){
        return <>
        
        <div className="text-center">
            <p className="mt-4">No items in cart</p>
            <Link className="btn btn-success" to="/">Go to Catalog</Link>
        </div>
        </>
    }
    return (
        <div>
            {cartContext.cart.length === 0? renderNoItems(): renderItems()}
        </div>
    )
}

export default Cart
