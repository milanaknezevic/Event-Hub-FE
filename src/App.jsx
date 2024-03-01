import './App.css'
import HorizontalNavbar from "./components/Navbar/HorizontalNavbar.jsx";
import Home from "./components/Home/Home.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import ProtectedRoute from "./api/ProtectedRoutes.jsx";
import Users from "./components/Users/Users.jsx";
import Page404 from "./constants/ErrorPages/Page404.jsx";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "./redux/selectors.jsx";
import {useEffect} from "react";
import {getLoggedUser} from "./redux/auth.jsx";


const App = () => {
    const {isAuthenticated, loggedUser,loading} = useSelector(auth);
    const dispatch = useDispatch()
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!isAuthenticated && !loggedUser && token)
            dispatch(getLoggedUser({}))
    }, [isAuthenticated]);
    const router = createBrowserRouter(
        [
            {
                element: <HorizontalNavbar/>,
                children: [{
                    path: '/',
                    element: <Home/>
                }, {
                    path: "/login",
                    element: <Login/>
                }, {
                    path: "/register",
                    element: <Register/>
                }, {
                    path: "/users",
                    element: (
                        <ProtectedRoute path={"/users"}>
                            <Users/>
                        </ProtectedRoute>
                    ),
                },
                ],
                errorElement: <Page404/>
            }
        ],)

    return <RouterProvider router={router}/>

}

export default App
