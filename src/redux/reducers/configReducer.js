import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMenuSideBar: false,
};

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setIsMenuSideBar: (state, { payload }) => {
            state.isMenuSideBar = payload;
        },
    },
    extraReducers: () => {},
});

export const configAction = configSlice.actions;

export default configSlice.reducer;