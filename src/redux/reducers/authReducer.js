import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({ 
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
})