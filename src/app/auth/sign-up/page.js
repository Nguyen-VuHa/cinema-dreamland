'use client'
import Link from 'next/link';
import React from 'react';
import FacebookLoginButton from '~/components/pages/SignIn/FacebookButton';
import GoogleLoginButton from '~/components/pages/SignIn/GoogleButton';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import InputDate from '~/components/ui/InputDate';
import InputPassword from '~/components/ui/InputPassword';

function SignUpPage() {
    return (
        <form className='w-full space-y-3'>
            <Input 
                className='w-full'
                placeholder="Email"
            /> 
            <InputPassword 
                className='w-full'
                placeholder="Mật Khẩu"
                type="password"
            /> 
            <Input 
                className='w-full'
                placeholder="Họ & Tên"
            />
            <InputDate 
                className='w-full'
                placeholder="Sinh nhật"
            />
            <Input 
                className='w-full'
                placeholder="Số điện thoại"
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

export default SignUpPage;