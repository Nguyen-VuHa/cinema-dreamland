import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMenuSideBar: false,
    isModalEditLesson: false,
    isModelVocabulary: false,
    isLearnEnglish: false,
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
        setIsModalVocabulary: (state, { payload }) => {
            state.isModelVocabulary = payload;
        },
        setIsModalLearnEnglish: (state, { payload }) => {
            state.isLearnEnglish = payload;
        },
    },
    extraReducers: () => {},
});

export const configAction = configSlice.actions;

export default configSlice.reducer;