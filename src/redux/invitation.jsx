import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {displayNotification} from "./notification.jsx";
import base from '../api/baseService.jsx';
import {
    getAllEvents,
    getAllEventsForCLients,
    getAllGuestsForEvent,
    getAllNotInvitedClients,
    setEventModalState
} from "./events.jsx";

const api = base.service(true);
export const initialState = {
    invitation: {},
    backendErrors: {},
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
    async ({id, userId, pagination, loggedUser,filters}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.post(`/api/invitations/${id}/${userId}`);
            //dispatch(getAllNotInvitedClients(id))
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


export const invitationSlice = createSlice({
    name: "invitation",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        // .addCase(createInvitation.fulfilled, (state) => {
        //     state.invitation = false
        //     state.backendErrors = {}
        // })
    }
})


export const invitationReducer = invitationSlice.reducer;
