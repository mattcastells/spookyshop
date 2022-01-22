import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import ItemCount from "./itemCount";
import "./itemDetail.sass"

import { CartContext } from "./cartContext.jsx"


const ItemDetail = ({item}) => {
    const [addedQuantity, setAddedQuantity] = useState(0);
    const cartContext = useContext(CartContext)

    const onAdd = (cantidad)=>{
        setAddedQuantity(cantidad);
        cartContext.addItem(item,cantidad);
    }
    
    const renderPurchase= ()=>{
        if(addedQuantity===0){
            return <ItemCount stock={item.stock} initial={1} onAdd={onAdd}></ItemCount>
        }
        else{
            return (
            <div className="text-center">
                <Link className="btn btn-success" to="/cart">Terminar compra</Link>
            </div>
            );
        }
    }

    if(item != null){
        return (
            <div className="productDetail card">
                <img className="card-img-top product-img" alt={item.title} src={`/${item.thumbnail}`}></img>
                <div className="card-body w-100">
                    <h3 className="card-title">{item.title}</h3>
                    <h5>${item.price}</h5> 
                    {(item.stock <= 0) ? <h5 className="text-red">No stock</h5> : <></>}
                    <h6 className="card-text">Categoria: {item.category}</h6>
                    <p className="card-text">{item.description}</p>
                    {
                        renderPurchase()
                    }
                </div>
            </div>
        )
    }
    else{
        return <div>
            Cargando...
        </div>
    }
}

export default ItemDetail
