import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isFetchMediaMovieList: false,

    paginationMovieList: {
        page: 1,
        pageSize: 15,
        totalRows: 0,
        search: "",
        isLastPage: false,
    },
    movieList: [],
};

export const mediaSlice = createSlice({ 
    name: 'media',
    initialState,
    reducers: { 
        // set value form theo key trong object pagination
        setValuePaginationMovieList: (state, { payload }) => {
            const { key, value } = payload;
            state.paginationMovieList[key] = value 
        }, 
        processFetchMovieList: (state) => {
            state.isFetchMediaMovieList = true
        },
        fetchMovieListSuccess: (state, { payload }) => {
            return {
                ...state,
                isFetchMediaMovieList: false,
                paginationMovieList: {
                    ...state.paginationMovieList,
                    isLastPage: payload.isLastPage,
                    totalRows: payload.totalRows
                },
                movieList: [...state.movieList, ...payload.data]
            }
        },
        fetchMovieListFailed: (state, { payload }) => {

            state.isFetchMediaMovieList = false
        }
    },
    extraReducers: () => {},
})

export const actionMedia = mediaSlice.actions;

export default mediaSlice.reducer;