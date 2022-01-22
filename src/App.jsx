import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from './components/navbar'
import './App.sass';
import ItemListContainer from "./components/itemListContainer"
import ItemDetailContainer from "./components/itemDetailContainer";
import About from "./routes/about"
import Login from "./routes/login"
import Contacto from "./routes/contacto"
import Cart from "./routes/cart"
import Checkout from "./routes/checkout";
import { CartProvider } from "./components/cartContext.jsx";
import { LoginProvider } from "./components/loginContext";



// ["Catalogo", "Cotizador", "Contacto", "Acerca de", "Log In"];

function App() {
    return (
    <CartProvider>
        <LoginProvider>
        <BrowserRouter>
               <NavBar/>
                <Switch>
                    <Route exact path="/about">
                        <About/>
                    </Route>
                    <Route exact path="/contact">
                        <Contacto/>
                    </Route>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                     <Route exact path="/cart">
                    <Cart/>
                    </Route>
                     <Route exact path="/item/:itemId">
                        <ItemDetailContainer/>
                    </Route>
                    <Route exact path="/category/:category">
                        <ItemListContainer/>
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout/>
                    </Route>
                    <Route path="/">
                        <ItemListContainer/>
                    </Route>
                </Switch>
        </BrowserRouter>
        </LoginProvider>
    </CartProvider>
    );
    
}

export default App;