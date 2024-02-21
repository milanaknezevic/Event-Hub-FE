import './App.css'
import HorizontalNavbar from "./components/Navbar/HorizontalNavbar.jsx";
import Home from "./components/Home/Home.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";

const App = () => {
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
                },  {
                    path: "/register",
                    element: <Register/>
                },

                ]
            }
        ],
    )

    return <RouterProvider router={router}/>

}

export default App
