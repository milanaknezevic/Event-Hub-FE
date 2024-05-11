import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import base from '../api/baseService.jsx';
import {displayNotification} from "./notification.jsx";


const api = base.service(true);
export const initialState = {
    ticketStatus: [],
    ticketsNotifications: [],
    ticketPriority: [],
    tickets: [],
    pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
    },
    filters: {
        status: "",
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

export const updateClosedTicketNotification = createAsyncThunk(
    'tickets/update/notification', async ({id, pagination, filters, role}, {dispatch,rejectWithValue}) => {
        try {

            const response = await api.put(`/api/tickets/update/notifications/${id}`);
            dispatch(getAllTickets({
                page: pagination.current,
                size: pagination.pageSize,
                status: filters.status,
                priority: filters.priority,
                role: role
            }))
            dispatch(getOrganizerTicketNotifications({}));
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getAllTickets = createAsyncThunk(
    'tickets', async ({page = 1, size = 10, status, priority, role}, {rejectWithValue}) => {
        try {
            let response;
            if (role === 1) {
                response = await api.get(`/api/tickets?page=${page}&size=${size}&status=${status}&priority=${priority}`);
            } else if (role === 0 || role === 2) {
                response = await api.get(`/api/tickets/my/tickets?page=${page}&size=${size}&status=${status}&priority=${priority}`);
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const getTicketNotifications = createAsyncThunk(
    'support/notifications', async ({dispatch, rejectWithValue}) => {
        try {
            const response = await api.get('/api/tickets/support/notifications');
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Error while fetching notifications for tickets.",
                title: "Ticket"
            }))
            return rejectWithValue(error.response.data);
        }
    }
);
export const getOrganizerTicketNotifications = createAsyncThunk(
    'organizer/notifications', async ({dispatch, rejectWithValue}) => {
        try {
            const response = await api.get('/api/tickets/organizer/notifications');
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Error while fetching notifications for tickets.",
                title: "Ticket"
            }))
            return rejectWithValue(error.response.data);
        }
    }
);
export const createTicket = createAsyncThunk(
    'ticket/create', async ({data, pagination, filters, role}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.post('/api/tickets', data);
            dispatch(getAllTickets({
                page: pagination.current,
                size: pagination.pageSize,
                status: filters.status,
                priority: filters.priority,
                role: role
            }))
            dispatch(displayNotification({
                notificationType: "success",
                message: "Ticket created successfully!",
                title: "Ticket"
            }))
            return response.data;
        } catch (error) {
            dispatch(displayNotification({
                notificationType: "error",
                message: "Error while creating the ticket.",
                title: "Ticket"
            }))
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
    async (id, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.get(`/api/tickets/${id}/`);
            dispatch(setTicketModalState({modalOpen: true, mode: "edit", ticketObj: {}}));
            dispatch(getTicketNotifications({}))
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
export const getTicketPriority = createAsyncThunk(
    'ticket/priority', async ({rejectWithValue}) => {
        try {
            const response = await api.get('/api/tickets/ticket/priority');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const assignToTicket = createAsyncThunk(
    'ticket/assign', async ({id, pagination, filters, role}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.put(`/api/tickets/support/${id}/`);
            dispatch(getAllTickets({
                page: pagination.current,
                size: pagination.pageSize,
                status: filters.status,
                priority: filters.priority,
                role: role
            }))
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
export const replyToTicket = createAsyncThunk(
    'ticket/reply', async ({id, data, pagination, filters, role}, {dispatch, rejectWithValue}) => {
        try {
            const response = await api.put(`/api/tickets/reply/${id}/`, data);
            dispatch(getAllTickets({
                page: pagination.current,
                size: pagination.pageSize,
                status: filters.status,
                priority: filters.priority,
                role: role
            }))
            dispatch(displayNotification({
                notificationType: "success",
                message: "Answer has been sent successfully sent! Ticket is closed.",
                title: "Ticket"
            }))
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
            const {modalOpen, mode, ticketObj} = action.payload;
            state.form.modalOpen = modalOpen;
            state.form.formSubmitting = false;
            state.form.backendErrors = {};
            state.form.ticketObj = ticketObj;
            state.form.mode = mode
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
                let status = action.meta.arg.status
                let priority = action.meta.arg.priority
                state.loading = false;
                state.tickets = action.payload.tickets;
                state.pagination = {
                    total: action.payload.total,
                    current,
                    pageSize
                }
                state.filters = {
                    status,
                    priority
                }
            })
            .addCase(getTicketById.fulfilled, (state, action) => {
                state.form.ticketObj = action.payload
            })
            .addCase(assignToTicket.fulfilled, (state, action) => {
                state.form.ticketObj.status = action.payload.status
            })
            .addCase(replyToTicket.pending, (state) => {
                state.form.formSubmitting = true
            })
            .addCase(replyToTicket.rejected, (state, action) => {
                state.form.formSubmitting = false
                state.form.backendErrors = action.payload
            })
            .addCase(replyToTicket.fulfilled, (state) => {
                state.form.formSubmitting = false
                state.form.modalOpen = false
                state.form.ticketObj = {}
                state.form.mode = ""
                state.form.backendErrors = {}
            })
            .addCase(createTicket.pending, (state) => {
                state.form.formSubmitting = true
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.form.formSubmitting = false
                state.form.backendErrors = action.payload
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.form.formSubmitting = false
                state.form.modalOpen = false
                state.form.ticketObj = {}
                state.form.mode = ""
                state.form.backendErrors = {}
            })
            .addCase(getTicketNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.ticketsNotifications = action.payload.ticketNotification
            })
            .addCase(getOrganizerTicketNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.ticketsNotifications = action.payload.ticketNotification
            })

    }
})
export const {setTicketModalState} = ticketSlice.actions;
export const ticketReducer = ticketSlice.reducer;
