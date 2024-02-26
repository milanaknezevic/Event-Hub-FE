import {useDispatch, useSelector} from 'react-redux';
import {auth} from "../redux/selectors.jsx";
import Page404 from "../constants/ErrorPages/Page404.jsx";
import {useEffect} from "react";
import {getLoggedUser} from "../redux/auth.jsx";


const ProtectedRoute = ({children, path}) => {
    const {isAuthenticated, loggedUser,loading} = useSelector(auth);
    const dispatch = useDispatch()
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!isAuthenticated && !loggedUser && token)
            dispatch(getLoggedUser({}))
    }, [isAuthenticated]);


    const getProtectedRoutes = () => {
        switch (loggedUser?.role) {
            case "SUPPORT":
                return ["users"];
            case "ORGANIZER":
                return [];
            case "CLIENT":
                return [];
            default:
        return ["/users", "/events"];
        }
    };
    console.log("loading ", loading)
    if( loading)
    {
        return <h1>Loading</h1>
    }
    if ( getProtectedRoutes() && getProtectedRoutes().includes(path) && !isAuthenticated && !token) {
        return <Page404/>;
    }

    return children;
};

export default ProtectedRoute;


