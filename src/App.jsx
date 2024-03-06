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
import MyProfile from "./components/ManageUser/MyProfile.jsx";
import Events from "./components/Events/Events.jsx";
import Invitations from "./components/Invitations/Invitations.jsx";


const App = () => {
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
                    {
                        path: "/my_profile",
                        element: (
                            <ProtectedRoute path={"/my_profile"}>
                                <MyProfile/>
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/events",
                        element: (
                            <ProtectedRoute path={"/events"}>
                                <Events/>
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/events/event/:id/invitations",
                        element: <ProtectedRoute path={"/events/event/:id/invitations"}>
                            <Invitations/>
                        </ProtectedRoute>,
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
