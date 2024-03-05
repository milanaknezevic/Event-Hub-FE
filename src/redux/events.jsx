import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import base from '../api/baseService.jsx';


const api = base.service(true);
export const initialState = {
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


export const getAllEvents = createAsyncThunk(
    'events', async ({page = 1, size = 10, search = "", locationId = "", eventTypeId = ""}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/users/organizer_events/?page=${page}&size=${size}&search=${search}&locationId=${locationId}&eventTypeId=${eventTypeId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getEventTypes = createAsyncThunk(
    'eventTypes', async ({rejectWithValue}) => {
        try {
            const response = await api.get('/api/eventTypes');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getEventLocations = createAsyncThunk(
    'locations', async ({rejectWithValue}) => {
        try {
            const response = await api.get('/api/locations');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
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
    }
})

export const eventReducer = eventSlice.reducer;
