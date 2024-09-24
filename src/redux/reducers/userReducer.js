import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFetchDetailUser: false,

    userDetail: null,
};

export const userSlice = createSlice({  
    name: 'user',
    initialState,
    reducers: {  
        processFetchUserDetail: (state) => {
            state.isFetchDetailUser = true
        },
        fetchUserDetailSuccess: (state, { payload }) => { 
            state.userDetail = payload;
            state.isFetchDetailUser = false
        },
        fetchUserDetailFailed: (state, { payload }) => {
            state.isFetchDetailUser = false
        },
    },
    extraReducers: () => {},
})

export const actionUser = userSlice.actions;

export default userSlice.reducer;