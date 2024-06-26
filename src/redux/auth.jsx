import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {displayNotification} from "./notification.jsx";
import {history} from "../components/Navbar/HorizontalNavbar.jsx";
import base from '../api/baseService.jsx';

const api = base.service(true);
export const initialState = {
    isAuthenticated: false,
    loggedUser: null,
    backendErrors: {},
}


export const userLogin = createAsyncThunk(
    'auth/login', async ({username, password}, {dispatch, rejectWithValue}) => {
        try {
            const response = await axios.post('/api/users/login', {username, password});
            const {accessToken} = response.data;
            localStorage.setItem('token', accessToken);
            dispatch(getLoggedUser({}))
            dispatch(displayNotification({
                notificationType: "success",
                message: "Login successful!",
                title: "Login"
            }))
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Login failed. Please try again.",
                title: "Login"
            }))
            return rejectWithValue(error.response.data);
        }
    }
);
export const changePassword = createAsyncThunk(
    'auth/change_password', async ({data}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.put('/api/users/change_password', data);
            dispatch(getLoggedUser({}))
            dispatch(displayNotification({
                notificationType: "success",
                message: "Password changed successfully!",
                title: "Change password"
            }))
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Change password failed. Please try again.",
                title: "Change password"
            }))
            return rejectWithValue(error.response.data);
        }
    }
);


export const getLoggedUser = createAsyncThunk(
    'user/logged', async ({rejectWithValue}) => {
        try {
            const response = await api.get('/api/users/user/logged');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const uploadAvatar = createAsyncThunk(
    'auth/avatar', async ({formData, uid}, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/users/upload_avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                params: {uid}
            });
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
            history.navigate("/")
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateUser = createAsyncThunk(
    "users/update",
    async ({data}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.patch(`/api/users/update/profile`, (data));
            dispatch(getLoggedUser({}))
            dispatch(displayNotification({
                notificationType: "success",
                message: "User updated successfully!",
                title: "User"
            }))
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Error while updating profile!",
                title: "User"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.loading = false;
            state.loggedUser = null;
            localStorage.removeItem("token")
            history.navigate("/")
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
            .addCase(getLoggedUser.pending, state => {
                state.loading = true;
            })
            .addCase(getLoggedUser.rejected, (state, action) => {
                state.backendErrors = action.payload
                state.loading = false;
            })
            .addCase(getLoggedUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.loggedUser = action.payload
                state.backendErrors = {};
            })
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.backendErrors = action.payload
                state.loading = false;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false;
                state.backendErrors = {};
            })
            .addCase(changePassword.pending, state => {
                state.loading = true;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.backendErrors = action.payload
                state.loading = false;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                state.backendErrors = {};
            })
    }
})

export const {logout, resetAuthState} = authSlice.actions;
export const authReducer = authSlice.reducer;
