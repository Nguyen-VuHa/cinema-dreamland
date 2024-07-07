'use client'
import Link from 'next/link';
import React from 'react';
import FacebookLoginButton from '~/components/pages/SignIn/FacebookButton';
import GoogleLoginButton from '~/components/pages/SignIn/GoogleButton';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';
import InputPassword from '~/components/ui/InputPassword';
import useToastify from '~/hooks/useToastify';

function SignInPage() {
    const toastMessage = useToastify()

    return (
        <form className='w-full space-y-3'>
            <Input 
                className='w-full'
                placeholder="Email"
            />
            <InputPassword 
                className='w-full'
                placeholder="Mật khẩu"
            />
            <div className='flex space-x-2'>
                <span className='text-input-place'>Bạn chưa có tài khoản?</span>
                <Link href="/auth/sign-up" className='text-primary hover:underline transition-all'>
                    Đăng ký
                </Link>
            </div>
            <div className='divide-y divide-primary space-y-3'>
                <Button
                    // type="submit"
                    onClick={() => {
                        toastMessage({
                            type: 'INFO',
                            payload: {
                                message: "Đăng Nhập Thất Bại",
                            }
                        })
                    }}
                >
                    Đăng Nhập
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

export default SignInPage;