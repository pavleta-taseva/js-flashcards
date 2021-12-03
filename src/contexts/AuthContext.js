import { Password } from '@mui/icons-material';
import { createContext, useState, useContext } from 'react';

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
    const login = (username, password) => {
        setUser(username, password);
    }
    return <AuthContext.Provider value={{user, login}}>
        { children }
    </AuthContext.Provider>
};

export const useAuth = () => {
    const authState = useContext(AuthContext);
    return authState;
}
