import logoImage from '../../assets/logo.png';
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import {useDispatch, useSelector} from "react-redux";
import {auth} from "../../redux/selectors.jsx";
import {logout} from "../../redux/auth.jsx";
import {FaUser} from 'react-icons/fa';
import {Tooltip} from "antd";
//import {LogoutOutlined, PlusOutlined, QuestionCircleOutlined, UserOutlined} from '@ant-design/icons';
import {LogoutOutlined} from '@ant-design/icons';

export const history = {
    navigate: null
}

const HorizontalNavbar = () => {
    const {isAuthenticated, loggedUser} = useSelector(auth);
    const {pathname} = useLocation();
    const dispatch = useDispatch()
    history.navigate = useNavigate()

    const routes = [
        {linkPath: '/', routeTitle: 'Home', public: true, allowedRoles: []},
        {linkPath: '/users', routeTitle: 'Users', public: false, allowedRoles: ["SUPPORT"]},
        {linkPath: '/tickets', routeTitle: 'Tickets', public: false, allowedRoles: ["SUPPORT"]},
        {linkPath: '/events', routeTitle: 'Events', public: false, allowedRoles: ["ORGANIZER"]},
    ];

    const dropdown = [
        {linkPath: '/my_profile', routeTitle: 'My Profile'},
        {linkPath: '/change_password', routeTitle: 'Change password'},
    ];
    const isDropdownItemActive = dropdown.some(item => item.linkPath === pathname);

    return (
        <div className={"d-flex flex-column min-vh-100"}>
            <div className="container-fluid nav-container">
                <nav className="navbar navbar-expand-md">
                    <img className={"col-3 col-md-1"} src={logoImage} alt="Logo"/>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-md-flex justify-content-md-end mx-3"
                         id="navbarNavDropdown">
                        <ul className="navbar-nav d-flex align-items-end justify-content-md-center align-items-md-center">

                            {routes.map((route) => {
                                    return ((
                                        (route.public || (isAuthenticated && route.allowedRoles?.includes(loggedUser?.role))) && (
                                            <Link key={route.linkPath}
                                                  className={`nav-link  ${route.linkPath === pathname ? 'active' : ""} `}
                                                  to={route.linkPath}>
                                                {route.routeTitle}
                                            </Link>
                                        )
                                    ))
                                }
                            )}
                            {isAuthenticated && (
                                <li className="nav-item dropdown">
                                    <a className={`nav-link dropdown-toggle d-flex align-items-center justify-content-end  ${isDropdownItemActive ? 'active' : ""} `}

                                       href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
                                       aria-expanded="false">
                                        <Tooltip placement={"top"} title={"User info"}>
                                            <FaUser/>
                                        </Tooltip>
                                    </a>

                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        {dropdown.map((route) => {
                                                return ((
                                                    (
                                                        <Link className="dropdown-item" key={route.linkPath}
                                                              to={route.linkPath}>
                                                            {route.routeTitle}
                                                        </Link>
                                                    )
                                                ))
                                            }
                                        )}
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item" onClick={() => dispatch(logout())}>
                                            <LogoutOutlined/> Logout
                                        </button>
                                    </div>
                                </li>
                            )}

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
