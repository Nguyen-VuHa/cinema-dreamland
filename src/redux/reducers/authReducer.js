import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({ 
    name: 'authentication',
    initialState: {
        isAuthentication: false,
        // status
        isLogin: false,
        // process đăng ký -> loading
        isProcesSignUp: false,

        // trạng thái quá trinhf đăng ký thành công hoặc thất bại 
        statusSignUp: false,

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
            phoneNumber: '',
            birthDay: '',
        },
        errorSignUp: {},
    },
    reducers: {  
        //set trạng thái đăng ký
        setValueStatusSignUp: (state, { payload }) => {
            state.statusSignUp = payload
        },
        clearFormSignUp: (state) => {
            // set value in form default
            state.formSignUp = {
                fullName: '',
                email: '',
                password: '',
                phoneNumber: '',
                birthDay: '',
            }
            state.errorSignUp = {}
        },
        clearFormSignIn: (state) => {
            // set value in form default
            state.formSignUp = {
                email: '',
                password: '',
            }
            state.errorSignIn = {}
        },
        // set value form theo key trong object form data
        setValueFormSignUp: (state, { payload }) => {
            const { key, value } = payload;
            state.formSignUp[key] = value 
        }, 
         // set value error form theo key trong object form error data
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
        singUpAccountSuccess: (state, _) => {
            // set process về trạng thái cũ
            state.isProcesSignUp = false
            // set trạng thái đắng ký thành công
            state.statusSignUp = true
        },
        singUpAccountFailed: (state, _) => {
            state.isProcesSignUp = false
            // set trạng thái đắng ký thất bại
            state.statusSignUp = false
        },
    }
})

export const actionAuth = authSlice.actions;

export default authSlice.reducer;