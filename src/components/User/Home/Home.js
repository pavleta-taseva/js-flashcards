import React from 'react'
import './Home.css';
import { Outlet } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default Home;
