import {useEffect} from "react";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {auth, invitation, ticket} from "../../redux/selectors.jsx";
import {logout} from "../../redux/auth.jsx";
import {getOrganizerTicketNotifications, getTicketNotifications, setTicketModalState} from "../../redux/tickets.jsx";
import {Tooltip} from "antd";
import {FaBell, FaUser} from 'react-icons/fa';
import {LogoutOutlined} from '@ant-design/icons';
import logoImage from '../../assets/logo.png';
import Footer from "../Footer/Footer.jsx";
import TicketModal from "../Tickets/TicketModal.jsx";
import {getClientNotifications} from "../../redux/invitation.jsx";

export const history = {
    navigate: null
}

const HorizontalNavbar = () => {
    const {isAuthenticated, loggedUser} = useSelector(auth);
    const {ticketsNotifications} = useSelector(ticket);
    const {invitationNotification} = useSelector(invitation)
    const {pathname} = useLocation();
    const dispatch = useDispatch()

    history.navigate = useNavigate()

    const routes = [
        {linkPath: '/', routeTitle: 'Home', public: true, allowedRoles: []},
        {linkPath: '/users', routeTitle: 'Users', public: false, allowedRoles: [1]},
        {linkPath: '/events', routeTitle: 'Events', public: false, allowedRoles: [0, 2]},
        {linkPath: '/my_events', routeTitle: 'My Events', public: false, allowedRoles: [2]},
        {linkPath: '/invitations', routeTitle: 'Invitations', public: false, allowedRoles: [2]},
        {linkPath: '/tickets', routeTitle: 'Tickets', public: false, allowedRoles: [0, 1, 2]},
    ];


    useEffect(() => {
        if (loggedUser?.role === 1) {
            dispatch(getTicketNotifications({}));
        } else if (loggedUser?.role === 0) {
            dispatch(getOrganizerTicketNotifications({}));
        } else if (loggedUser?.role === 2) {
            dispatch(getOrganizerTicketNotifications({}));
            dispatch(getClientNotifications({}));
        }

        const id = setInterval(() => {
            if (loggedUser?.role === 1) {
                dispatch(getTicketNotifications({}));
            } else if (loggedUser?.role === 0) {
                dispatch(getOrganizerTicketNotifications({}));
            } else if (loggedUser?.role === 2) {
                dispatch(getOrganizerTicketNotifications({}));
                dispatch(getClientNotifications({}));
            }
        }, 300000);


        return () => clearInterval(id);
    }, [dispatch, loggedUser]);


    const dropdown = [
        {linkPath: '/my_profile', routeTitle: 'My Profile'},
        {linkPath: '/change_password', routeTitle: 'Change password'},
    ];
    const isDropdownItemActive = dropdown.some(item => item.linkPath === pathname);
    const handleTicket = () => {
        dispatch(setTicketModalState({modalOpen: true, mode: 'open', ticketObj: {}}));
    }
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
                                                {route.routeTitle === 'Tickets' && ticketsNotifications.length > 0 && (
                                                    <FaBell className="notification-icon mx-1"/>
                                                )}
                                                {route.routeTitle === 'Invitations' && invitationNotification.length > 0 && (
                                                    <FaBell className="notification-icon mx-1"/>
                                                )}
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
                                        <Tooltip placement={"top"} title={"About user"}>
                                            <FaUser/>
                                        </Tooltip>
                                    </a>

                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <div
                                            className="dropdown-item text-black-50 personal_info">{loggedUser?.name} {loggedUser?.lastname}</div>
                                        <div className="dropdown-divider"></div>
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
                                        {loggedUser?.role !== 1 &&
                                            <button className="dropdown-item" onClick={handleTicket}>
                                                Open Ticket
                                            </button>}
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
                <TicketModal/>
            </div>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default HorizontalNavbar;
