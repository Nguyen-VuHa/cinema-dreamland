import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFetchLessonList: false,
    isCreateLesson: false,
    lessons: [],
};

export const lessonSlice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        setLessonList: (state, {payload}) => {
            state.lessons = payload
        },
    },
    extraReducers: () => {},
});

export const lessonAction = lessonSlice.actions;

export default lessonSlice.reducer;