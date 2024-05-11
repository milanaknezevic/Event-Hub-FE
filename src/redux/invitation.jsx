import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {displayNotification} from "./notification.jsx";
import base from '../api/baseService.jsx';
import {
    getAllEventsForCLients,
    getAllGuestsForEvent,
    getAllNotInvitedClients,
    getInvitationsByEventId,
    setEventModalState
} from "./events.jsx";

const api = base.service(true);
export const initialState = {
    invitations: [],
    invitationNotification: [],
    status: 0,
    backendErrors: {},
    pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
    },
}


export const organizerUnsendInvitation = createAsyncThunk(
    "invitations/delete",
    async ({eventId, userId, pagination}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.delete(`/api/invitations/${eventId}//${userId}/`);
            dispatch(getAllGuestsForEvent({
                page: pagination.current,
                size: pagination.pageSize,
                id: eventId,
                status: false
            }))
            dispatch(displayNotification({
                notificationType: "success",
                message: "Invitation deleted successfully!",
                title: "Invitation"
            }))
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Error while deleting invitation!",
                title: "Invitation"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)
export const createInvitation = createAsyncThunk(
    "invitation/create",
    async ({id, userId, pagination, loggedUser, filters}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.post(`/api/invitations/${id}/${userId}`);
            if (loggedUser?.role === 0) {
                dispatch(getAllNotInvitedClients({page: pagination.current, size: pagination.pageSize, id}))
            } else if ((loggedUser?.role === 2)) {
                dispatch(setEventModalState({modalOpen: false, mode: ''}));
                dispatch(getAllEventsForCLients({
                    page: pagination.current,
                    size: pagination.pageSize,
                    search: filters.search,
                    locationId: filters.selectedLocation,
                    eventTypeId: filters.selectedEvent,
                    status: filters.status
                }))
            }
            dispatch(displayNotification({
                notificationType: "success",
                message: "Invitation sent successfully!",
                title: "Invitation"
            }))
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Error while sending invitation!",
                title: "Invitation"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)

export const getAllInvitationsForCLient = createAsyncThunk(
    "events/guests",
    async ({page = 1, size = 10, status}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.get(`/api/invitations/?status=${status}&page=${page}&size=${size}`);
            dispatch(getClientNotifications({}));

            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Failed to fetch invitations!",
                title: "Invitations"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)

export const clientUnsendInvitation = createAsyncThunk(
    'invitation/client_unsend', async ({eventId, pagination, status}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.delete(`/api/invitations/${eventId}`);
            dispatch(getAllInvitationsForCLient({page: pagination.current, size: pagination.pageSize, status: status}))
            dispatch(displayNotification({
                notificationType: "success",
                message: "Invitation edited successfully!",
                title: "Invitation"
            }))
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getClientNotifications = createAsyncThunk(
    'client/notifications', async ({dispatch, rejectWithValue}) => {
        try {
            const response = await api.get('/api/invitations/client/invitations/notifications');
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Error while fetching notifications for invitations.",
                title: "Invitation"
            }))
            return rejectWithValue(error.response.data);
        }
    }
);

export const invitationSlice = createSlice({
    name: "invitation",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllInvitationsForCLient.pending, state => {
                state.loading = true;
            })
            .addCase(getAllInvitationsForCLient.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getAllInvitationsForCLient.fulfilled, (state, action) => {
                let current = action.meta.arg.page
                let pageSize = action.meta.arg.size
                state.pagination = {
                    total: action.payload.total,
                    current,
                    pageSize
                }
                state.invitations = action.payload.invitations
                state.status = action.meta.arg.status
            })
            .addCase(getClientNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.invitationNotification = action.payload.invitationNotification
            })
    }
})


export const invitationReducer = invitationSlice.reducer;
