import { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {
    
    const [user, setUser] = useState(null);
    const login = (username, password) => {
        setUser(username, password);
    }
    return <AuthContext.Provider value={{user, login, isAuthenticated: user}}>
        { children }
    </AuthContext.Provider>
};

export const useAuth = () => {
    const authState = useContext(AuthContext);
    return authState;
}
