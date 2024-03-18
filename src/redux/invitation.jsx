import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {displayNotification} from "./notification.jsx";
import base from '../api/baseService.jsx';
import {getAllNotInvitedClients} from "./user.jsx";

const api = base.service(true);
export const initialState = {
    invitation: {},
    backendErrors: {},
}

export const createInvitation = createAsyncThunk(
    "invitation/create",
    async ({id, userId}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.post(`/api/invitations/${id}/${userId}`);
            dispatch(getAllNotInvitedClients(id))
            dispatch(displayNotification({
                notificationType: "success",
                message: "Invitation sent successfully!",
                title: "Invitation"
            }))
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)


export const invitationSlice = createSlice({
    name: "invitation",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(createInvitation.fulfilled, (state) => {
                state.invitation = false
                state.backendErrors = {}
            })
    }
})


export const invitationReducer = invitationSlice.reducer;
