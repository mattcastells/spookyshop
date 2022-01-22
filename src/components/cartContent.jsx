import React, { useContext } from 'react';
import { CartContext } from "./cartContext.jsx";
import { Link } from 'react-router-dom';
import "./cartContent.sass";

const CartContent = ({enableEdit}) => {
    const cartContext = useContext(CartContext);

    function removeItem(itemId){
        cartContext.removeItem(itemId);
    }

    return (
        <>
        <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th className="content-text">Producto</th>
                        <th className="content-text">Precio</th>
                        <th className="content-text">Cantidad</th>
                        <th className="content-text">Total Parcial</th>
                        {enableEdit?<th></th>: <></>}
                    </tr>
                    
                </thead>
                <tbody>
                    {cartContext.cart.map(itemQuantity =>(
                    <tr>
                        <td><img className="item-img" alt={itemQuantity.item.title} style={{width: "100px", height:"100px"}} src={itemQuantity.item.thumbnail}></img></td>
                        <td className="content-item">{itemQuantity.item.title}</td>
                        <td className="content-item">${itemQuantity.item.price}</td>
                        <td className="content-item">{itemQuantity.quantity}</td>
                        <td className="content-item">${itemQuantity.quantity * itemQuantity.item.price}</td>
                        {enableEdit?<td>
                            <button className="btn btn-danger mx-1" onClick={()=>removeItem(itemQuantity.item.id)}>X</button>
                            <Link className="btn btn-success mx-1" to={"/item/"+itemQuantity.item.id}>Editar</Link>
                        </td>: <></>}
                        
                    </tr>
                    ))}
                </tbody>
            </table>
        <p  className="content-text">Total: ${cartContext.getTotalPrice()}</p>
        </>
    )
}

export default CartContent
