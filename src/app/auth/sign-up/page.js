'use client'
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FacebookLoginButton from '~/components/pages/SignIn/FacebookButton';
import GoogleLoginButton from '~/components/pages/SignIn/GoogleButton';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import InputDate from '~/components/ui/InputDate';
import InputEmail from '~/components/ui/InputEmail';
import InputPassword from '~/components/ui/InputPassword';
import { actionAuth } from '~/redux/reducers/authReducer';

function SignUpPage() {
    const dispatch = useDispatch()
    const { email, password, fullName }  = useSelector(state => state.authState.formSignUp) 

    return (
        <form className='w-full space-y-3'>
            <InputEmail 
                className='w-full'
                placeholder="Email"
                name="email"
                value={email}
                onChange={(value) => {
                    dispatch(actionAuth.setValueFormSignUp({
                        key: 'email',
                        value,
                    }))
                }}
            /> 
            <InputPassword 
                className='w-full'
                placeholder="Mật khẩu"
                type="password"
                name="password"
                value={password}
                onChange={(value) => {
                    dispatch(actionAuth.setValueFormSignUp({
                        key: 'password',
                        value
                    }))
                }}
            /> 
            <Input 
                className='w-full'
                placeholder="Họ & Tên"
                name="fullName"
                value={fullName}
                onChange={(value) => {
                    dispatch(actionAuth.setValueFormSignUp({
                        key: 'fullName',
                        value
                    }))
                }}
            />
            <InputDate 
                className='w-full'
                placeholder="Sinh nhật"
            />
            <Input 
                className='w-full'
                placeholder="Số điện thoại"
                name="phoneNumber"
            />
            <div className='flex space-x-2'>
                <span className='text-input-place'>Bạn đã có tài khoản?</span>
                <Link href="/auth/sign-in" className='text-primary hover:underline transition-all'>
                    Đăng nhập
                </Link>
            </div>
            <div className='divide-y divide-primary space-y-3'>
                <Button
                    // type="submit"
                    onClick={() => {
                        // console.log(formSignUp);
                    }}
                >
                    Đăng Ký
                </Button>
                <div />
            </div>
            <div className='flex items-center space-x-2'>
                <GoogleLoginButton />
                <FacebookLoginButton />
            </div>
        </form>
    );
}

export default React.memo(SignUpPage);