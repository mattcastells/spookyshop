import React, { useContext } from 'react'
import "./cartWidget.sass";
import { CartContext } from "./cartContext.jsx"


export default function CartWidget() {
    const cartContext = useContext(CartContext)    
    return (
        <>
            <span className={"iconify iconify-cart"} data-icon={"mdi:cart-outline"} data-inline={"false"}></span>
            <span className={"cart-items"}>{cartContext.getTotalItems()} elemento{cartContext.getTotalItems() === 1 ? "":"s"}</span>
        </>
    )
    
}
