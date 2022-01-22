import React, { useState } from 'react'

export const CartContext = React.createContext();

export const CartProvider = ({defaultValue = [], children}) => {
    const [cart, setCart] = useState(defaultValue);

    const addItem = (item,quantity) =>{
        if(isInCart(item && item.id)){
            // Incremento por la cantidad
            const indexItem = cart.map(itemQuantity => itemQuantity.item.id).indexOf(item.id);
            cart[indexItem].quantity = quantity;
            setCart([...cart]);
        }else{
            // Agrego el item al cart
            setCart([...cart,{item:item,quantity:quantity}]);
        }
        
        
    }

    const isInCart = (itemId) =>{
        return itemId === undefined ? undefined : getItem(itemId) !== undefined;
    }

    const removeItem = (itemId) =>{
        if(!isInCart(itemId)){
            console.log("Item not in cart");
            return;
        }

        // Filtro los que NO tengan el id
        const newCart = cart.filter(itemQuantity => itemQuantity.item.id !== itemId)
        setCart(newCart);
    }

    const clear = (item,quantity) =>{
        setCart([]);
    }

    const getItem = (itemId) => {
        return cart.find(itemQuantity=>itemQuantity.item.id === itemId);
    }

    const getTotalPrice = ()=>{
        return cart.reduce((sum,itemQuantity)=>sum+itemQuantity.item.price * itemQuantity.quantity,0)
    }

    const getTotalItems = () =>{
        return cart.reduce((sum,itemQuantity)=>sum+itemQuantity.quantity,0)
    }

    return <CartContext.Provider value={{cart,addItem,isInCart,removeItem,clear, getItem, getTotalPrice,getTotalItems}}>
        {children}
    </CartContext.Provider>
}
