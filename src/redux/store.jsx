import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./auth.jsx";
import {userReducer} from "./user.jsx";
import {notificationReducer} from "./notification.jsx";
import {ticketReducer} from "./tickets.jsx";
import {eventReducer} from "./events.jsx";
import {invitationReducer} from "./invitation.jsx";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        notification: notificationReducer,
        ticket: ticketReducer,
        events: eventReducer,
        invitation:invitationReducer
    }
});
