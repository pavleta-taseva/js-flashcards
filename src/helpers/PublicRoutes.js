import { Navigate, Outlet } from 'react-router-dom';
import * as authService from '../services/authService.js';

const PrivateRoute = () => {
   const isAuthenticated = authService.isAuthenticated();

    if (isAuthenticated) {
        return <Navigate to="/home" />
    } else {
        return <Outlet />;
    }
}

export default PrivateRoute;