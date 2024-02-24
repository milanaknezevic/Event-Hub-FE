import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {displayNotification} from "./notification.jsx";
import {history} from "../components/Navbar/HorizontalNavbar.jsx";

export const initialState = {
    isAuthenticated: false,
    user: null,
    backendErrors: {},
}


export const userLogin = createAsyncThunk(
    'auth/login', async ({username, password}, {dispatch, rejectWithValue}) => {
        try {
            const response = await axios.post('/api/users/login', {username, password});
            const {accessToken} = response.data;
            localStorage.setItem('token', accessToken);
            dispatch(displayNotification({
                notificationType: "success",
                message: "Login successful!",
                title: "Login"
            }))
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const uploadAvatar = createAsyncThunk(
    'auth/avatar', async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/users/upload_avatar', (data));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const userRegister = createAsyncThunk(
    'auth/register', async (data, {dispatch, rejectWithValue}) => {
        try {
            const response = await axios.post('/api/users/', data);
            dispatch(displayNotification({
                notificationType: "success",
                message: "Registration successful. Your account will be approved shortly.",
                title: "Registration"
            }))
            history.navigate("/login")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
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
                state.backendErrors = action.payload
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(userLogin.fulfilled, (state) => {
                state.loading = false;
                state.backendErrors = {};
                state.isAuthenticated = true;
            })
            .addCase(userRegister.pending, state => {
                state.loading = true;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.backendErrors = action.payload
                state.loading = false;
            })
            .addCase(userRegister.fulfilled, (state) => {
                state.loading = false;
                state.backendErrors = {};
            })
    }
})

export const {logout, resetAuthState} = authSlice.actions;
export const authReducer = authSlice.reducer;
