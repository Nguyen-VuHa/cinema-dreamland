import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMenuSideBar: false,
    isModalEditLesson: false,
};

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setIsMenuSideBar: (state, { payload }) => {
            state.isMenuSideBar = payload;
        },
        setIsModalEditLesson: (state, { payload }) => {
            state.isModalEditLesson = payload;
        },
    },
    extraReducers: () => {},
});

export const configAction = configSlice.actions;

export default configSlice.reducer;