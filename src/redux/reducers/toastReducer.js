import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toastList: [],
};

export const toastifySlice = createSlice({
    name: 'toastify',
    initialState,
    reducers: {
        createToastMessage: (state, action) => {
            state.toastList = state.toastList.concat(action.payload);
        },
        removeToastMessage: (state, action) => {
            state.toastList = state.toastList.filter(toast => toast.uuid != action.payload);
        },
    },
    extraReducers: () => {},
});

export const toastifyAction = toastifySlice.actions;

export default toastifySlice.reducer;