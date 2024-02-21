import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
// import api from '../api/ApiInterceptor';

// import {displayNotification} from './notification';
// import {history} from "../components/Navbar/HorizontalNavbar.jsx";

// export const LOCAL_STORAGE_TOKEN = "ISA_TOKEN"

export const initialState = {
    isAuthenticated: false,
    user: null,
    backendErrors: {},
}


export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ username, password }) => {
        console.log("AAAAAAA")
        axios.post('/api/users/login', { username: username, password: password })
            .then((results) => {
                const { token } = results.data;
                localStorage.setItem('token', token);
                return results.data;
            })
            .catch((err) => Promise.reject(err.response.status));
    }
);



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
            localStorage.removeItem("token")
        },
        resetAuthState: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(userLogin.pending, state => {
                state.loading = true;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false;
                state.backendErrors = action.payload
            })
            .addCase(userLogin.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
    }
})

export const {logout, setLoginModalState, resetAuthState} = authSlice.actions;
export const authReducer = authSlice.reducer;
