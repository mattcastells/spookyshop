import React, { useContext, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { LoginContext } from "../components/loginContext";
import { getAuth,getFirebase } from "../firebaseInit";
import "./login.sass"
const Login = () => {
    const loginContext = useContext(LoginContext);

    // To redirect after sign in
    const history = useHistory();

    const googleLoginPopUp = () =>{
        getFirebase()
            .auth()
            .signInWithPopup(getAuth())
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                loginContext.setUser(user);
                loginContext.setCredential(credential);
                history.push(`/`);
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }

    function renderLoggedIn(){
        return <>
        <h1>Logged as:</h1>
        <h2>{loginContext.user.displayName}</h2>
        </>
    }

    function renderNotLoggedIn(){
        return <>
            <h1 >Log in</h1>
            <div class="col-md-12"> 
                <button className="btn btn-lg btn-google btn-block text-uppercase btn-outline" onClick={googleLoginPopUp}>
                    <img src="https://img.icons8.com/color/16/000000/google-logo.png"/> Signup Using Google
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
