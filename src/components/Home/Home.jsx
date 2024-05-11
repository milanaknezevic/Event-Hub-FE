import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Button} from "antd";
import {auth} from "../../redux/selectors.jsx";

const Home = () => {
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector(auth);
    const handleLogin = () => {
        navigate('/login');
    };
    return (

        <div className={"welcome-background flex-grow-1 d-flex align-items-center"}>
            <div className="container">
                <div className={"row justify-content-end align-items-end "}>
                    <div className="col-12 col-lg-6">
                        <h1 className={"text-center text-md-end"}>Discover the city pulse and be part of unforgettable
                            moments</h1>
                        <div className={"welcome-description text-center text-md-end"}>Join us and start your journey
                            through the best events
                        </div>
                        {!isAuthenticated &&
                            <div className={"row justify-content-center justify-content-md-end"}>
                                <div className={"col-12 col-md-4"}>
                                    <Button
                                        className="login-btn btn col-12 d-flex justify-content-center align-items-center"
                                        type="submit" onClick={handleLogin}>Login
                                    </Button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};


export default Home;
