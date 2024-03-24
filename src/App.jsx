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
import Event from "./components/Events/Event.jsx";
import ChangePassword from "./components/ManageUser/ChangePassword.jsx";
import ClientInvitations from "./components/Invitations/ClientInvitations.jsx";


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
                        path: "/change_password",
                        element: (
                            <ProtectedRoute path={"/change_password"}>
                                <ChangePassword/>
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/events",
                        element: (
                            <ProtectedRoute path={"/events"}>
                                <Events myEvents={false} />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/my_events",
                        element: (
                            <ProtectedRoute path={"/my_events"}>
                                <Events myEvents={true} />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: "/events/event/:id",
                        element: <ProtectedRoute path={"/events/event/:id"}>
                            <Event/>
                        </ProtectedRoute>,
                    },
                    {
                        path: "/events/event/:id/invitations",
                        element: <ProtectedRoute path={"/events/event/:id/invitations"}>
                            <Invitations/>
                        </ProtectedRoute>,
                    },
                    {
                        path: "/invitations",
                        element: <ProtectedRoute path={"/invitations"}>
                            <ClientInvitations/>
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
