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
    'auth/login', async ({ username, password }, { rejectWithValue}) => {
        try {
            const response = await axios.post('/api/users/login', { username, password });
            const {accessToken} = response.data;
            localStorage.setItem('token', accessToken);
            return response.data; // Make sure to return the data
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
                console.log("rejected ",  action.payload); // Log entire error object
                state.backendErrors = action.payload
                state.authenticatedFailed = true;
                state.loading = false;
            })
            .addCase(userLogin.fulfilled, (state,action) => {
                state.loading = false;
                state.isAuthenticated = true;
                console.log("fulfilled ",action.payload)
            })
    }
})

export const {logout, setLoginModalState, resetAuthState} = authSlice.actions;
export const authReducer = authSlice.reducer;
