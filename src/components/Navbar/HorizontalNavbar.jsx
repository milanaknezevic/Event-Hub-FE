import logoImage from '../../assets/logo.png';
import {Link, Outlet} from "react-router-dom";
import Footer from "../Footer/Footer.jsx";


const HorizontalNavbar = () => {
    return (
        <div className={"d-flex flex-column min-vh-100"}>
            <div className="container-fluid nav-container">
                <nav className="navbar navbar-expand-md">
                            <img className={"col-3 col-md-1"} src={logoImage} alt="Logo" />
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse d-md-flex justify-content-md-end mx-3" id="navbarNavDropdown">
                                <ul className="navbar-nav d-flex align-items-end">
                                    {/*<li className="nav-item">*/}
                                    {/*    <a className="nav-link active" href="#">Home</a>*/}
                                    {/*</li>*/}
                                    <Link className="nav-link active" to={"/"}>Home</Link>
                                    {/*<Link className={"nav-link"} to={"/login"}*/}
                                    {/*      onClick={window.innerWidth < 1200 ? handleToggle : undefined}><AiOutlineUser/></Link>*/}

                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Features</a>
                                    </li>
                                    <li className="nav-item ">
                                        <a className="nav-link" href="#">Pricing</a>
                                    </li>
                                    <li className="nav-item dropdown ">
                                        <a className="nav-link dropdown-toggle d-flex align-items-center justify-content-end" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Dropdown link
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <a className="dropdown-item" href="#">Action</a>
                                            <a className="dropdown-item" href="#">Another action</a>
                                            <a className="dropdown-item" href="#">Something </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                </nav>
            </div>
            <Outlet/>
        <Footer/>
        </div>
    );
};

export default HorizontalNavbar;
