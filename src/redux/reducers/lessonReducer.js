import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetchLessonList: false,
    isCreateLesson: false,
    lessons: [],
    lessonID: null,
};

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        setLessonList: (state, {payload}) => {
            state.lessons = payload
        },
        setLessonID: (state, {payload}) => {
            state.lessonID = payload
        },
    },
    extraReducers: () => {},
});

export const lessonAction = lessonSlice.actions;

export default lessonSlice.reducer;