import React, { useContext } from 'react';
import { CartContext } from "./cartContext.jsx";
import { Link } from 'react-router-dom';

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
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total Parcial</th>
                        {enableEdit?<th></th>: <></>}
                    </tr>
                    
                </thead>
                <tbody>
                    {cartContext.cart.map(itemQuantity =>(
                    <tr>
                        <td><img alt={itemQuantity.item.title} style={{width: "100px", height:"100px"}} src={itemQuantity.item.thumbnail}></img></td>
                        <td>{itemQuantity.item.title}</td>
                        <td>${itemQuantity.item.price}</td>
                        <td>{itemQuantity.quantity}</td>
                        <td>${itemQuantity.quantity * itemQuantity.item.price}</td>
                        {enableEdit?<td>
                            <button className="btn btn-danger mx-1" onClick={()=>removeItem(itemQuantity.item.id)}>X</button>
                            <Link className="btn btn-success mx-1" to={"/item/"+itemQuantity.item.id}>Editar</Link>
                        </td>: <></>}
                        
                    </tr>
                    ))}
                </tbody>
            </table>
        <p>Total: ${cartContext.getTotalPrice()}</p>
        </>
    )
}

export default CartContent
