import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
    userRoles: []
}


export const getUserRoles = createAsyncThunk(
    'user/roles', async ({rejectWithValue}) => {
        try {
            const response = await axios.get('/api/users/roles');
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
    }
})

export const userReducer = userSlice.reducer;
