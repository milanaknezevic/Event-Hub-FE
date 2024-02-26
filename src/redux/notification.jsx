import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    showMessage: false,
    message: "",
    notificationType: "",
    title: ""
}


export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        displayNotification: (state, action) => {
            state.showMessage = true;
            state.notificationType = action.payload.notificationType;
            state.message = action.payload.message;
            state.title = action.payload.title;
        },
        resetNotification: () => initialState,
    },

})
export const {displayNotification,resetNotification} = notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
