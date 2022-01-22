
import React, { useState } from 'react'

export const LoginContext = React.createContext();


export const LoginProvider = ({defaultValue = null, children}) => {
    const [credential, setCredential] = useState(defaultValue);
    const [user, setUser] = useState(defaultValue);

    return <LoginContext.Provider value={{credential,user,setUser,setCredential}}>
        {children}
    </LoginContext.Provider>
}
