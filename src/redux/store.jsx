import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./auth.jsx";
import {userReducer} from "./user.jsx";
import {notificationReducer} from "./notification.jsx";

export const store = configureStore({
    reducer: {
        auth:authReducer,
        user:userReducer,
        notification:notificationReducer
    }
});