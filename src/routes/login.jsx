import React, { useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { LoginContext } from "../components/loginContext";
import { getAuth,getFirebase } from "../firebaseInit";
import "./login.sass"

const Login = () => {
    const loginContext = useContext(LoginContext);

    const history = useHistory();

    const googleLoginPopUp = () =>{
        getFirebase()
            .auth()
            .signInWithPopup(getAuth())
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
                var user = result.user;
                loginContext.setUser(user);
                loginContext.setCredential(credential);
                history.push(`/`);
            })
            .catch((error) => {
                // Se encarga de los errores.
                var errorCode = error.code;
                var errorMessage = error.message;
                // El mail que intento usar el usuario esta en uso.
                var email = error.email;
                // El tipo de firebase.auth.AuthCredential esta en uso.
                var credential = error.credential;
                // ...
            });
    }

    function renderLoggedIn(){
        return <>
        <h1>Logead@ como:</h1>
        <h2>{loginContext.user.displayName}</h2>
        </>
    }

    function renderNotLoggedIn(){
        return <>
            <h1 className="log-in">Log in</h1>
            <div class="col-md-12"> 
                <button className="btn btn-lg btn-google btn-block text-uppercase btn-outline" onClick={googleLoginPopUp}>
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="google-logo"/> Ingresar usando Google
                </button> 
            </div>
        </>
    }
    return (
        <div className="grid-container">
            <div class="login-content text-center">
                {loginContext.user != null ? renderLoggedIn(): renderNotLoggedIn()}
            </div>
        </div>
    );
};

export default Login;
