import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({ 
    name: 'authentication',
    initialState: {
        // status
        isLogin: false,
        isSignUp: false,

        // state sign-in
        formSignIn: {
            email: '',
            password: '',
        },
        errorSignIn: {},
    
        // state register
        formSignUp: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            numberPhone: '',
            birthDay: '',
            address: '',
        },
        errorSignUp: {},
    },
    reducers: {  
        setValueFormSignUp: (state, { payload }) => {
            const { key, value } = payload;
            state.formSignUp[key] = value 
        }, 
    }
})

export const actionAuth = authSlice.actions;

export default authSlice.reducer;