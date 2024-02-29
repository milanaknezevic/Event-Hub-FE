import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import base from '../api/baseService.jsx';
import {displayNotification} from "./notification.jsx";


const api = base.service(true);
export const initialState = {
    userRoles: [],
    userAdminRoles: [],
    userStatus: [],
    users: [],
    pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
    },
    form: {
        modalOpen: false,
        formSubmitting: false,
        backendErrors: {},
        userObj: {},
        mode: ""
    }

}


export const getUserRoles = createAsyncThunk(
    'user/roles', async ({rejectWithValue}) => {
        try {
            const response = await axios.get('/api/users/user/roles');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAdminUserRoles = createAsyncThunk(
    'user/adminRoles', async ({rejectWithValue}) => {
        try {
            const response = await api.get('/api/users/adminRoles');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserStatus = createAsyncThunk(
    'user/userStatus', async ({rejectWithValue}) => {
        try {
            const response = await api.get('/api/users/userStatus');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getAllUsers = createAsyncThunk(
    'users', async ({page = 1, size = 10}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/users?page=${page}&size=${size}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserById = createAsyncThunk(
    "users/getUser",
    async (id, {rejectWithValue}) => {
        try {
            const response = await axios.get(`/api/users/${id}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export const editUser = createAsyncThunk(
    "users/edit",
    async (data, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.patch(`/api/users/${data.id}/`, (data));
            dispatch(displayNotification({
                notificationType: "success",
                message: "User edited successfully!",
                title: "User"
            }))
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Failed while editing user!",
                title: "User"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)
export const addUser = createAsyncThunk(
    "users/add",
    async (data, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.post(`/api/users/add_user/`, (data));
            dispatch(displayNotification({
                notificationType: "success",
                message: "User added successfully!",
                title: "User"
            }))
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Failed while adding user!",
                title: "User"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserModalState: (state, action) => {
            const {modalOpen, mode} = action.payload;
            state.form.modalOpen = modalOpen;
            state.form.formSubmitting = false;
            state.form.backendErrors = {};
            state.form.userObj = {};
            state.form.mode = mode;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUserRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.userRoles = action.payload;
            })
            .addCase(getAdminUserRoles.fulfilled, (state, action) => {
                state.loading = false;
                state.userAdminRoles = action.payload;
            })
            .addCase(getUserStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.userStatus = action.payload;
            })
            .addCase(getAllUsers.pending, state => {
                state.loading = true;
            })
            .addCase(getAllUsers.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                let current = action.meta.arg.page
                let pageSize = action.meta.arg.size
                state.loading = false;
                state.users = action.payload.users;
                state.pagination = {
                    total: action.payload.total,
                    current,
                    pageSize
                }
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.form.userObj = action.payload
                state.form.modalOpen = true
                state.form.mode = "edit"
            })

            .addCase(editUser.pending, (state) => {
                state.form.formSubmitting = true
            })
            .addCase(editUser.rejected, (state, action) => {
                state.form.formSubmitting = false
                state.form.backendErrors = action.payload
            })
            .addCase(editUser.fulfilled, (state) => {
                state.form.formSubmitting = false
                state.form.modalOpen = false
                state.form.userObj = {}
                state.form.mode = ""
            })
            .addCase(addUser.pending, (state) => {
                state.form.formSubmitting = true
            })
            .addCase(addUser.rejected, (state, action) => {
                state.form.formSubmitting = false
                state.form.backendErrors = action.payload
            })
            .addCase(addUser.fulfilled, (state) => {
                state.form.formSubmitting = false
                state.form.modalOpen = false
                state.form.userObj = {}
                state.form.mode = ""
            })
    }
})
export const {setUserModalState} = userSlice.actions;
export const userReducer = userSlice.reducer;
