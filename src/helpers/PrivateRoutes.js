import { Navigate, Outlet } from 'react-router-dom';
import * as authService from '../services/authService.js';

const PrivateRoute = () => {
   const isAuthenticated = authService.isAuthenticated();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute;