import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_ID } from "~/constants/cookie";

const authSlice = createSlice({ 
    name: 'authentication',
    initialState: {
        isAuthentication: false,
        // status
        isLogin: false,
        // process đăng ký -> loading
        isProcesSignUp: false,
        isProcesSignIn: false, // trạng thái đăng nhập -> loading
        isProcessVerifyOTP: false, // trạng thais xử lý xác thực OTP 

        processVerifyOTP: false, // tiến trình xác thực -> redirect đến trang xác thực

        // trạng thái quá trinhf đăng ký thành công hoặc thất bại 
        statusSignUp: false,
        // trạng thái quá trinh đăng nhap thành công hoặc thất bại 
        statusSignIn: false,
        // trạng thái xác tực OTP thành công hoặc thất bại
        statusVerifyOTP: false,

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
        //set trạng thái đăng ký
        setValueStatusSignIn: (state, { payload }) => {
            state.statusSignIn = payload
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
        // set value form theo key trong object form data
        setValueFormSignIn: (state, { payload }) => {
            const { key, value } = payload;
            state.formSignIn[key] = value 
        }, 
         // set value error form theo key trong object form error data
        setValueErrorFormSignUp: (state, { payload }) => {
            state.errorSignUp = {
                ...state.errorSignUp,
                ...payload, 
            } 
        }, 
        // set value error form theo key trong object form error data
        setValueErrorFormSignIn: (state, { payload }) => {
            state.errorSignIn = {
                ...state.errorSignIn,
                ...payload, 
            } 
        }, 
        removeKeyErrorSignUp: (state, { payload }) => {
            delete state.errorSignUp[payload]
        }, 
        removeKeyErrorSignIn: (state, { payload }) => {
            delete state.errorSignIn[payload]
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
        // handle state send API sign in account
        processSignIn: (state) => {
            state.isProcesSignIn = true
        },
        singInAccountSuccess: (state, { payload }) => {
            if (payload.access_token == "") {
                state.processVerifyOTP = true
            } else {
                // set process về trạng thái cũ
                state.isProcesSignIn = false
                // set trạng thái đắng nhap thành công
                state.statusSignIn = true

                // set token vào cookies
                Cookies.set(ACCESS_TOKEN, payload.access_token);
                Cookies.set(REFRESH_TOKEN, payload.refresh_token);
                Cookies.set(USER_ID, payload.user_id);

                if (typeof window !== 'undefined') {
                    window.location.reload();
                }
            }
        },
        singInAccountFailed: (state, _) => {
            state.isProcesSignIn = false
            // set trạng thái đắng nhap thất bại
            state.statusSignIn = false
        },
        // Xử lý xác thực OTP
        processVerifyOTP: (state) => {
            state.isProcessVerifyOTP = true
        },
        verifyOTPSucess: (state, { payload }) => {
            // set token vào cookies
            Cookies.set(ACCESS_TOKEN, payload.access_token);
            Cookies.set(REFRESH_TOKEN, payload.refresh_token);
            Cookies.set(USER_ID, payload.user_id);

            state.isProcessVerifyOTP = false


            if (typeof window !== 'undefined') {
                window.location.replace("/");
            }
        },
        verifyOTPFailed: (state, { payload }) => {
            state.isProcessVerifyOTP = false
        },
    }
})

export const actionAuth = authSlice.actions;

export default authSlice.reducer;