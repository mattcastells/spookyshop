import React, { useContext } from 'react';
import { CartContext } from "../components/cartContext";
import { Link } from 'react-router-dom';
import CartContent from '../components/cartContent';
import "./cart.sass";

const Cart = () => {
    const cartContext = useContext(CartContext)

    function renderItems(){
        return <div className="text-center mt-4 container">
            <CartContent enableEdit={true}/>
        <Link className="btn btn-success" to="/checkout">Completar compra</Link>
        </div>
    }

    function renderNoItems(){
        return <>
        
        <div className="text-center">
            <p className="noitems-text ">No hay items en el carrito</p>
            <Link className="btn btn-success" to="/">Ir al catalogo</Link>
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
