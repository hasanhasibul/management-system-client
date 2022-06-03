import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Privateroute = ({children}) => {
    const username =  localStorage.getItem('username')
    return (
        <div>
            {
                username ? <Outlet/> : <Navigate to="/login"/>
            }
        </div>
    );
};

export default Privateroute;