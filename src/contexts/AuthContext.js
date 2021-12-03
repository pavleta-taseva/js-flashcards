import { createContext, useState } from 'react';

export const AuthContext = createContext();

const initialState = {
    username: '',
    email: '',
    authToken: '',
    userId: ''
}

export const AuthProvider = ({
    children
}) => {

    const [user, setUser] = useState(initialState);
    return <AuthContext.Provider values={{user}}>
        { children }
    </AuthContext.Provider>
}