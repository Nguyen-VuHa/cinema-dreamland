import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({ 
    name: 'authentication',
    initialState: {
        // status
        isLogin: false,
        isProcesSignUp: false,

        // state sign-in
        formSignIn: {
            email: '',
            password: '',
        },
        errorSignIn: {},
    
        // state register
        formSignUp: {
            fullName: 'Nguyễn Vũ Hạ',
            email: 'vuha201199',
            password: '123123123',
            phoneNumber: '0388318629',
            birthDay: '',
        },
        errorSignUp: {},
    },
    reducers: {  
        setValueFormSignUp: (state, { payload }) => {
            const { key, value } = payload;
            state.formSignUp[key] = value 
        }, 
        setValueErrorFormSignUp: (state, { payload }) => {
            state.errorSignUp = {
                ...state.errorSignUp,
                ...payload, 
            } 
        }, 
        removeKeyErrorSignUp: (state, { payload }) => {
            delete state.errorSignUp[payload]
        }, 
        // handle state send API sign up account
        processSignUpAccount: (state) => {
            state.isProcesSignUp = true
        },
        singUpAccountSuccess: (state, { payload }) => {
            console.log(payload);
            state.isProcesSignUp = false
        },
        singUpAccountFailed: (state, { payload }) => {
            console.log(payload);
            state.isProcesSignUp = false
        },
    }
})

export const actionAuth = authSlice.actions;

export default authSlice.reducer;