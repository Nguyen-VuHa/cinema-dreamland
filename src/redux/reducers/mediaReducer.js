import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isFetchMediaMovieList: false,
    isFetchMovieDetail: false,

    isScreenView: true,

    paginationMovieList: {
        page: 1,
        pageSize: 15,
        totalRows: 0,
        search: "",
        isLastPage: false,
    },
    movieList: [],
    movieDetail: null,
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
        setIsScreenView: (state, { payload }) => {
            state.isScreenView = payload 
        }, 
        processFetchMovieList: (state) => {
            state.isFetchMediaMovieList = true
        },
        fetchMovieListSuccess: (state, { payload }) => {
            if (payload.data && payload.data.length > 0) {
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
            }
        },
        fetchMovieListFailed: (state, { payload }) => {
            state.isFetchMediaMovieList = false
        },
        processFetchMovieDetail: (state) => {
            state.isFetchMovieDetail = true
        },
        fetchMovieDetailSuccess: (state, { payload }) => { 
            state.movieDetail = payload;
            state.isFetchMovieDetail = false
            state.isScreenView = true
        },
        fetchMovieDetailFailed: (state, { payload }) => {
            state.isFetchMovieDetail = false
            state.isScreenView = true
        },
    },
    extraReducers: () => {},
})

export const actionMedia = mediaSlice.actions;

export default mediaSlice.reducer;