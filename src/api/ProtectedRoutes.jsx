import {useDispatch, useSelector} from 'react-redux';
import {auth} from "../redux/selectors.jsx";
import Page404 from "../constants/ErrorPages/Page404.jsx";
import Spinner from "../constants/Spinner.jsx";
import {useEffect} from "react";
import {jwtDecode} from "jwt-decode";
import {getLoggedUser, logout} from "../redux/auth.jsx";

const ProtectedRoute = ({children, path}) => {
    const {isAuthenticated, loggedUser, loading} = useSelector(auth);
    const dispatch = useDispatch()
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                dispatch(logout());
            }
        }
        if (!isAuthenticated && !loggedUser && token)
            dispatch(getLoggedUser({}))
    }, [isAuthenticated]);


    const getProtectedRoutes = () => {
        switch (loggedUser?.role) {
            case 1:
                return ["/users", "/tickets", "/", "/my_profile"];
            case 0:
                return ["/events", "/events/event/:id/invitations", "/", "/my_profile"];
            case 2:
                return ["/", "/my_profile"];
            default:
                return ["/users", "/tickets", "/events", "/events/event/:id/invitations", '/my_profile'];
        }
    };


    if (loading) {
        return <Spinner/>
    }

    if (!isAuthenticated && !token && getProtectedRoutes()?.includes(path)) {
        return <Page404/>;
    }
    if (isAuthenticated && token && !getProtectedRoutes()?.includes(path)) {
        return <Page404/>;
    }

    return children;
};

export default ProtectedRoute;


