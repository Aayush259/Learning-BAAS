import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader.jsx';

export default function AuthLayout({
    children,
    authentication = true // Default to requiring authentication
}) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Get authentication status from Redux store
    const authStatus = useSelector(state => state.auth.status);

    // Redirect logic based on authentication requirements and current status
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            // Redirect to login if authentication is required but user is not authenticated
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            // Redirect to home if authentication is not required but user is authenticated
            navigate('/home');
        }
        // Set loading to false after authentication check
        setLoading(false);
    }, [authStatus, navigate, authentication]);

    return loading ? <Loader /> : <div>{children}</div>;
};
