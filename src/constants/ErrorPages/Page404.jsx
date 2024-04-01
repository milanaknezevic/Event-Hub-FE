import ErrorPage404 from "../../assets/error404.svg";
import {NavLink} from "react-router-dom";

const Page404 = () => {

    return (
        <div className={"container-fluid error-container d-flex flex-column min-vh-100"}>
            <div className={"row flex-grow-1 justify-content-center align-items-center"}>
                <div
                    className={"col-12 col-md-12 col-lg-12 col-xl-12 pt-5 d-flex justify-content-center align-items-center position-relative"}>
                    <img src={ErrorPage404} alt="Error 403"/>
                    <div className={"position-absolute"}>
                        <h1 className={"text-center"}>Page not found</h1>
                        <div className="row justify-content-center">
                            <div className={"col-12 d-flex justify-content-center"}>
                                <NavLink className={"error-link"} to="/">
                                    {" "}
                                    Go back to the home page
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page404;