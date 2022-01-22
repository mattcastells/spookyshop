import React, {useEffect, useState} from 'react'
import './itemCountContainer.sass'

const ItemCount = ({stock, initial, onAdd}) => {
    const [stockActual, setstockActual] = useState(stock);
    const [cantidad, setcantidad] = useState(initial);

    useEffect(() => {
        setstockActual(stock);        
    }, [stock])

    const stockAvailable = () => stockActual > 0;

    function incrementCantidad(){
        if(!stockAvailable())
            return;

        if(cantidad+1 > stockActual)
            setcantidad(stockActual);
        else
            setcantidad(cantidad+1);
    }

    function decreaseCantidad(){
        if(!stockAvailable())
            return;

        if(cantidad > 1 && stockAvailable())
            setcantidad(cantidad - 1);
    }

    return (
        <div className="text-center">
            {/* Cantidad */}
            <div className="itemCountContainer">
                <button className={`btn btn-light ${stockActual <=0 ? "disabled": ""}`} onClick={decreaseCantidad}>-</button>
                <p>{cantidad}</p>
                <button className={`btn btn-light ${stockActual <=0 ? "disabled": ""}`} onClick={incrementCantidad}>+</button>
            </div>
            <button className="btn btn-success" onClick={()=>{if(stockActual>0) (onAdd && onAdd(cantidad))}}>Agregar al carrito</button>
        </div>
    )
}

export default ItemCount
