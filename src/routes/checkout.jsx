import React, { useContext, useState } from 'react';
import { CartContext } from "../components/cartContext";
import { Link } from 'react-router-dom';
import CartContent from '../components/cartContent';
import {getFirestore} from "../firebaseInit"
import firebase from "firebase/app";
import 'firebase/firestore';
import { LoginContext } from '../components/loginContext';
import "./checkout.sass"


const empty_user = {
    name:"",
    email:"",
    phone:"",
    news:false
}
const Checkout = () => {
    const cartContext = useContext(CartContext);
    const loginContext = useContext(LoginContext);
    const [user, setUser] = useState(JSON.parse(JSON.stringify(empty_user)));
    const [orderId, setOrderId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [checkoutDone, setCheckoutDone] = useState(false);


    const updateStock = async (items,db)=>{
        setLoading(true);
        const itemsToUpdate = 
            db.collection("items")
            .where(firebase.firestore.FieldPath.documentId(),'in',items.map(item=>item.id));
        
        // Get Items to update stock
        const query = await itemsToUpdate.get();
        const batch = db.batch();

        const outOfStock = [];
        query.docs.forEach((docSnapshot,idx)=>{
            if(docSnapshot.data().stock >= items[idx].quantity){
                // Utilizo la referencia del snapshot para el batch
                batch.update(docSnapshot.ref,{stock: docSnapshot.data().stock - items[idx].quantity});
            }
            else{
                // En caso de que no haya stock al momento de efectuar la compra devolverá los mismos que no hay
                outOfStock.push({...docSnapshot.data(), id: docSnapshot.id});
            }
        });

        // Si no hay items fuera de stock, compro
        if(outOfStock.length===0){
            await batch.commit();
            return;
        }
        else
            throw new Error(-1);
        
    }
    const createOrder = async ()=>{
        setLoading(true);

        const items = cartContext.cart.map(item=>{return {
            id:item.item.id, title:item.item.title, price:item.item.price, quantity: item.quantity
        }})

        let buyUser = loginContext.user ? {
            name:loginContext.user.displayName,
            email:loginContext.user.email,
            phone:"",
            news:true
        } : user
        
        const order = {
            buyer: buyUser,
            items: items,
            date: firebase.firestore.Timestamp.fromDate(new Date()),
            total: cartContext.getTotalPrice()
        }

        const db = getFirestore();
        const orders = db.collection('orders');

        try{
            const {id} = await orders.add(order)
            setOrderId(id);
            await updateStock(items,db)
            setCheckoutDone(true)
            cartContext.clear();
        }
        catch(err){
            setCheckoutDone(false);
            setError(err);
        }
        finally{
            setLoading(false);
        }


    }

    const updateAttribute = (attr,evt, checkbox = false) =>{
        if(checkbox)
            setUser({...user,[attr]:evt.target.checked});
        else
            setUser({...user,[attr]:evt.target.value});
    }

    function renderBuyAsGoogle(){
        return (
        <div className="row mx-2 mt-2" >
            <button onClick={createOrder} className="btn btn-secondary mx-2 mt-2">Buy as {loginContext.user.displayName}</button>
        </div>
        )
    }

    function renderItems(){
        if(error != null){
            return <div className="container mt-4 text-center">
                <h1>Ocurrio un error durante la compra</h1>
                <Link className="btn btn-danger" to="/">Ir al catalogo</Link>
            </div>
        }
        if(checkoutDone){
            return  <div className="container mt-4 text-center">
                <h1 className="buying-text">Tu orden fue creada</h1>
                <h2 className="buying-text">El ID de tu orden es: {orderId}</h2>
                <Link className="btn btn-success" to="/">Ir al catalogo</Link>
            </div>
        }
        if(loading){
            return  <div className="container mt-4 text-center">
                <h2 className="buying-text">Realizando compra...</h2>
            </div>
        }
        else{
        return (
            <div className="container mt-4">
                <div className="row">
                    <div className="form col">
                        <div className="mb-3">
                            <label htmlFor="user-name" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="user-name" onChange={evt => updateAttribute("name",evt)}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user-email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="user-email" aria-describedby="emailHelp" onChange={evt => updateAttribute("email",evt)}/>
                            <div id="emailHelp" className="form-text">Nunca compartiremos tu mail con nadie.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="user-phone" className="form-label">Telefono</label>
                            <input type="phone" className="form-control" id="user-phone" onChange={evt => updateAttribute("phone",evt)}/>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="user-newsletter" onChange={evt => updateAttribute("news",evt,true)}/>
                            <label className="form-check-label" htmlFor="user-newsletter">Suscribete al correo diario para enterarte de nuestras novedades y descuentos</label>
                        </div>

                        {loginContext.user ? renderBuyAsGoogle(): <></>}
                        <div className="row mx-2 mt-2">
                            <button className="btn btn-primary mx-2 mt-2" onClick={createOrder}>Completar compra</button>
                        </div>
                    </div>
                    <div className="col text-center">
                        <CartContent enableEdit={false}/>
                    </div>
                </div>
        </div>
        )}
    }

    function renderNoItems(){
        return <>
        <div className="text-center">
            <p className="mt-4">No hay items en el carrito</p>
            <Link className="btn btn-success" to="/">Ir al catalogo</Link>
        </div>
        </>
    }

    return (
        <>
        { cartContext.cart.length === 0 && !checkoutDone ? renderNoItems(): renderItems() }
        </>
    )
}

export default Checkout
