import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./auth.jsx";

export const store = configureStore({
    reducer: {
        auth:authReducer
    }
});