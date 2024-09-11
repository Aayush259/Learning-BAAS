import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from './Loader.jsx';
import { useUrlLandingContext } from '../app/contexts/UrlLandingContext.js';

export default function AuthLayout({
    children,
    authentication = true // Default to requiring authentication
}: {
    children: React.ReactNode,
    authentication?: boolean;
}) {

    const navigate = useNavigate();
    const location = useLocation();

    const [loading, setLoading] = useState<boolean>(true);

    // State to handle landing url.
    const { URL, setLandingUrl } = useUrlLandingContext();

    // Get authentication status from Redux store
    const authStatus = useSelector((state: {
        auth: {
            status: boolean
        }
    }) => state.auth.status);

    // Redirect logic based on authentication requirements and current status
    useEffect(() => {

        // If URL is not present, and location is not login or signup of landing page, then set URL to the actual url.
        if (!URL && (location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/')) setLandingUrl(location.pathname);

        if (authentication && authStatus !== authentication) {
            // Redirect to login if authentication is required but user is not authenticated
            navigate('/login');
        } else if (!authentication && authStatus !== authentication) {
            // Redirect to user to the required page.
            if (URL) {
                navigate(URL);
            } else {
                navigate('/home');
            }
            setLandingUrl(null);
        }
        // Set loading to false after authentication check
        setLoading(false);
    }, [authStatus, navigate, authentication]);

    return loading ? <Loader /> : <div>{children}</div>;
};
