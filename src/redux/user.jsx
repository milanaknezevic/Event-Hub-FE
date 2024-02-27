import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import base from '../api/baseService.jsx';


const api = base.service(true);
export const initialState = {
    userRoles: [],
    users:[],
    pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
    }

}


export const getUserRoles = createAsyncThunk(
    'user/roles', async ({rejectWithValue}) => {
        try {
            const response = await api.get('/api/users');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getAllUsers = createAsyncThunk(
    'users', async ({ page = 1, size =10 }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/users?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getUserRoles.pending, state => {
                state.loading = true;
            })
            .addCase(getUserRoles.rejected, (state, action) => {
                state.backendErrors = action.payload
                state.loading = false;
                state.error = true;
            })
            .addCase(getUserRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.userRoles = action.payload;
            })
            .addCase(getAllUsers.pending, state => {
                state.loading = true;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
               let current=action.meta.arg.page
               let pageSize=action.meta.arg.size
                state.loading = false;
                state.users = action.payload.users;
                state.pagination = {
                    total: action.payload.total,
                    current,
                    pageSize
                }

            })

    }
})

export const userReducer = userSlice.reducer;
