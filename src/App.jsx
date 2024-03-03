import './App.css'
import HorizontalNavbar from "./components/Navbar/HorizontalNavbar.jsx";
import Home from "./components/Home/Home.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import ProtectedRoute from "./api/ProtectedRoutes.jsx";
import Users from "./components/Users/Users.jsx";
import Page404 from "./constants/ErrorPages/Page404.jsx";
import Tickets from "./components/Tickets/Tickets.jsx";
import {auth} from "./redux/selectors.jsx";
import {useSelector} from "react-redux";
// import {useEffect} from "react";
// import {getLoggedUser, logout} from "./redux/auth.jsx";
// import Spinner from "./constants/Spinner.jsx";
// import {jwtDecode} from "jwt-decode";

const App = () => {
    // const {isAuthenticated, loggedUser, loading} = useSelector(auth);
    // const dispatch = useDispatch()
    // const token = localStorage.getItem('token');
    //
    // useEffect(() => {
    //     if (token) {
    //         const decodedToken = jwtDecode(token);
    //         console.log("decodedToken.exp * 1000 ",decodedToken.exp * 1000)
    //         console.log("Date.now() ",Date.now())
    //         console.log("decodedToken.exp * 1000 < Date.now() ",decodedToken.exp * 1000 < Date.now())
    //         if (decodedToken.exp * 1000 < Date.now()) {
    //             console.log("istekao je")
    //             dispatch(logout());
    //         }
    //     }
    //     if (!isAuthenticated && !loggedUser && token)
    //         dispatch(getLoggedUser({}))
    // }, [isAuthenticated]);

    const router = createBrowserRouter(
        [
            {
                element: <HorizontalNavbar/>,
                children: [{
                    path: '/',
                    element: (
                        <ProtectedRoute path={"/"}>
                            <Home/>
                        </ProtectedRoute>
                    )
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
                    {
                        path: "/tickets",
                        element: (
                            <ProtectedRoute path={"/tickets"}>
                                <Tickets/>
                            </ProtectedRoute>
                        ),
                    },
                ],
                errorElement: <Page404/>
            }
        ],)
    // if (loading) {
    //     return <Spinner/>
    // }

    return <RouterProvider router={router}/>

}

export default App
