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
    clients: [],
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
    'users', async ({page = 1, size = 10, search}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/users?page=${page}&size=${size}&search=${search}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getAllClients = createAsyncThunk(
    'users/clients', async ({rejectWithValue}) => {
        try {
            const response = await api.get(`/api/users/organizer/clients/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// export const getAllNotInvitedClients = createAsyncThunk(
//     'users/not_invited', async ({page = 1, size = 10,id},{rejectWithValue}) => {
//         try {
//             const response = await api.get(`/api/users/organizer/not_invited/${id}/?page=${page}&size=${size}`);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

export const getAllClientsForInvitation = createAsyncThunk(
    'invitations/clients', async (id,{rejectWithValue}) => {
        try {
            const response = await api.get(`/api/invitations//organizer/active/${id}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserById = createAsyncThunk(
    "users/getUser",
    async (id, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.get(`/api/users/${id}/`);
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Failed to fetch user!",
                title: "User"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)
export const editUser = createAsyncThunk(
    "users/edit",
    async ({data, pagination}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.patch(`/api/users/${data.id}/`, (data));
            dispatch(getAllUsers({page: pagination.current, size: pagination.pageSize, search: ""}))
            dispatch(displayNotification({
                notificationType: "success",
                message: "User edited successfully!",
                title: "User"
            }))
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const deleteUser = createAsyncThunk(
    "users/delete",
    async ({id, pagination}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.patch(`/api/users/delete/${id}/`);
            dispatch(getAllUsers({page: pagination.current, size: pagination.pageSize, search: ""}))
            dispatch(displayNotification({
                notificationType: "success",
                message: "User deleted successfully!",
                title: "User"
            }))
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Error while deleting user!",
                title: "User"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)
export const addUser = createAsyncThunk(
    "users/add",
    async ({data, pagination}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.post(`/api/users/add_user/`, (data));
            dispatch(getAllUsers({page: pagination.current, size: pagination.pageSize, search: ""}))
            dispatch(displayNotification({
                notificationType: "success",
                message: "User added successfully!",
                title: "User"
            }))
            return response.data;
        } catch (error) {
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
            .addCase(getAllClients.pending, state => {
                state.loading = true;
            })
            .addCase(getAllClients.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getAllClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.clients;
            })
            .addCase(getAllClientsForInvitation.pending, state => {
                state.loading = true;
            })
            .addCase(getAllClientsForInvitation.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getAllClientsForInvitation.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.clients;
            })
            // .addCase(getAllNotInvitedClients.pending, state => {
            //     state.loading = true;
            // })
            // .addCase(getAllNotInvitedClients.rejected, (state) => {
            //     state.loading = false;
            //     state.error = true;
            // })
            // .addCase(getAllNotInvitedClients.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.users = action.payload.users;
            // })
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
                state.form.backendErrors = {}
            })
            .addCase(deleteUser.fulfilled, (state) => {
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
                state.form.backendErrors = {}
            })
    }
})
export const {setUserModalState} = userSlice.actions;
export const userReducer = userSlice.reducer;
