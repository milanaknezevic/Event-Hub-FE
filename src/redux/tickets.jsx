import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import base from '../api/baseService.jsx';
import {getUserById, userSlice} from "./user.jsx";


const api = base.service(true);
export const initialState = {
    ticketStatus: [],
    ticketPriority: [],
    tickets: [],
    pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
    },
    filters: {
        status: 0,
        priority: "",
    },
    form: {
        modalOpen: false,
        formSubmitting: false,
        backendErrors: {},
        ticketObj: {},
        mode: ""
    }

}


export const getAllTickets = createAsyncThunk(
    'tickets', async ({page = 1, size = 10, status ,priority}, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/tickets?page=${page}&size=${size}&status=${status}&priority=${priority}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getTicketStatus = createAsyncThunk(
    'ticket/status', async ({rejectWithValue}) => {
        try {
            const response = await api.get('/api/tickets/ticket/status');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getTicketById = createAsyncThunk(
    "tickets/getTicket",
    async (id, {rejectWithValue}) => {
        try {
            const response = await api.get(`/api/tickets/${id}/`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export const getTicketPriority = createAsyncThunk(
    'ticket/priority', async ({rejectWithValue}) => {
        try {
            const response = await api.get('/api/tickets//ticket/priority');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const ticketSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        setTicketModalState: (state, action) => {
            const {modalOpen} = action.payload;
            state.form.modalOpen = modalOpen;
            state.form.formSubmitting = false;
            state.form.backendErrors = {};
            state.form.userObj = {};
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getTicketStatus.fulfilled, (state, action) => {
                state.loading = false;
                state.ticketStatus = action.payload;
            })
            .addCase(getTicketPriority.fulfilled, (state, action) => {
                state.loading = false;
                state.ticketPriority = action.payload;
            })
            .addCase(getAllTickets.pending, state => {
                state.loading = true;
            })
            .addCase(getAllTickets.rejected, (state) => {
                state.loading = false;
                state.error = true;
            })
            .addCase(getAllTickets.fulfilled, (state, action) => {
                let current = action.meta.arg.page
                let pageSize = action.meta.arg.size
                state.loading = false;
                state.tickets = action.payload.tickets;
                state.pagination = {
                    total: action.payload.total,
                    current,
                    pageSize
                }
            })
            .addCase(getTicketById.fulfilled, (state, action) => {
                state.form.ticketObj = action.payload
                state.form.modalOpen = true
                // state.form.mode = "edit"
            })
    }
})
export const {setTicketModalState} = ticketSlice.actions;
export const ticketReducer = ticketSlice.reducer;
