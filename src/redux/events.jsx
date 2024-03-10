import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import base from '../api/baseService.jsx';
import {displayNotification} from "./notification.jsx";
import axios from "axios";


const api = base.service(true);
export const initialState = {
    eventData: {
        invitations: [],
        status: true,
    },
    events: [],
    eventTypes: [],
    locations: [],
    pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
    },
    filters: {
        search: "",
        selectedEvent: "",
        selectedLocation: "",
    },
    form: {
        modalOpen: false,
        formSubmitting: false,
        backendErrors: {},
        eventObj: {},
        mode: ""
    }

}
export const replyToInvitation = createAsyncThunk(
    'invitation/organizator_reply', async ({eventId, userId, accept}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.put(`/api/invitations/creator/accept/${eventId}/${userId}/?accept=${accept}`);
            dispatch(getInvitationsByEventId(eventId))
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

export const getAllEvents = createAsyncThunk(
    'events', async ({page = 1, size = 10, search = "", locationId = "", eventTypeId = ""}, {
        dispatch,
        rejectWithValue
    }) => {
        try {
            const response = await api.get(`/api/users/organizer_events/?page=${page}&size=${size}&search=${search}&locationId=${locationId}&eventTypeId=${eventTypeId}`);
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Failed to fetch Events!",
                title: "Event"
            }))
            return rejectWithValue(error.response.data);
        }
    }
);
export const getEventById = createAsyncThunk(
    "events/getEvent",
    async (id, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.get(`/api/events/${id}/`);
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Failed to fetch Event!",
                title: "User"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)
export const getAllGuestsForEvent = createAsyncThunk(
    "events/guests",
    async ({id, status}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.get(`/api/users/guests/${id}/?status=${status}`);
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Failed to fetch guests!",
                title: "User"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)
export const getInvitationsByEventId = createAsyncThunk(
    "events/invitations",
    async (id, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.get(`/api/invitations/event/${id}/`);
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Failed to fetch invitations!",
                title: "User"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)


export const getEventTypes = createAsyncThunk(
    'eventTypes', async ({dispatch, rejectWithValue}) => {
        try {
            const response = await api.get('/api/eventTypes');
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Failed to fetch event types!",
                title: "User"
            }))
            return rejectWithValue(error.response.data);
        }
    }
);
export const getEventLocations = createAsyncThunk(
    'locations', async ({dispatch, rejectWithValue}) => {
        try {
            const response = await api.get('/api/locations');
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Failed to fetch event locations!",
                title: "User"
            }))
            return rejectWithValue(error.response.data);
        }
    }
);
export const deleteEvent = createAsyncThunk(
    "events/delete",
    async ({id, pagination, filters}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.delete(`/api/events/${id}/`);
            dispatch(getAllEvents({
                page: pagination.current,
                size: pagination.pageSize,
                search: filters.search,
                locationId: filters.selectedLocation,
                eventTypeId: filters.selectedEvent
            }))
            dispatch(displayNotification({
                notificationType: "success",
                message: "Event deleted successfully!",
                title: "Event"
            }))
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Error while deleting event!",
                title: "Event"
            }))
            return rejectWithValue(error.response.data);
        }
    }
)
export const addEvent = createAsyncThunk(
    "events/add",
    async (data, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.post(`/api/events/`, (data));
            dispatch(displayNotification({
                notificationType: "success",
                message: "Event added successfully!",
                title: "Event"
            }))
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export const uploadEventImages = createAsyncThunk(
    'events/uploadImages', async (formData, {rejectWithValue}) => {
        try {
            const response = await axios.post('/api/eventImages/upload_images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEventModalState: (state, action) => {
            const {modalOpen, mode} = action.payload;
            state.form.modalOpen = modalOpen;
            state.form.formSubmitting = false;
            state.form.backendErrors = {};
            state.form.eventObj = {};
            state.form.mode = mode;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getAllEvents.pending, state => {
                state.loading = true;
            })
            .addCase(getAllEvents.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getAllEvents.fulfilled, (state, action) => {
                let current = action.meta.arg.page
                let pageSize = action.meta.arg.size
                let search = action.meta.arg.search
                let selectedEvent = action.meta.arg.eventTypeId
                let selectedLocation = action.meta.arg.locationId
                state.loading = false;
                state.events = action.payload.events;
                state.pagination = {
                    total: action.payload.total,
                    current,
                    pageSize
                }
                state.filters = {
                    search,
                    selectedEvent,
                    selectedLocation,
                }

            })
            .addCase(getEventTypes.fulfilled, (state, action) => {
                state.loading = false;
                state.eventTypes = action.payload;
            })
            .addCase(getEventLocations.fulfilled, (state, action) => {
                state.loading = false;
                state.locations = action.payload;
            })
            .addCase(getAllGuestsForEvent.pending, state => {
                state.loading = true;
            })
            .addCase(getAllGuestsForEvent.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getAllGuestsForEvent.fulfilled, (state, action) => {
                state.eventData.invitations = action.payload.invitations
                state.eventData.status = action.meta.arg.status
            })
            .addCase(getInvitationsByEventId.pending, state => {
                state.loading = true;
            })
            .addCase(getInvitationsByEventId.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getInvitationsByEventId.fulfilled, (state, action) => {
                state.eventData.invitations = action.payload.invitations
            })
            .addCase(getEventById.fulfilled, (state, action) => {
                state.form.eventObj = action.payload

            })
            .addCase(deleteEvent.fulfilled, (state) => {
                state.form.formSubmitting = false
                state.form.modalOpen = false
                state.form.eventObj = {}
                state.form.mode = ""
            })
            .addCase(addEvent.pending, (state) => {
                state.form.formSubmitting = true
            })
            .addCase(addEvent.rejected, (state, action) => {
                state.form.formSubmitting = false
                state.form.backendErrors = action.payload
            })
            .addCase(addEvent.fulfilled, () => {
                // state.form.formSubmitting = false
                // state.form.modalOpen = false
                // state.form.eventObj = {}
                // state.form.mode = ""
                // state.form.backendErrors = {}
            })
    }
})
export const {setEventModalState} = eventSlice.actions;

export const eventReducer = eventSlice.reducer;
