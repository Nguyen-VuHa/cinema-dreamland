"use client"

import Image from 'next/image';
import React from 'react';
import Button from '~/components/ui/Button';
import Input from '~/components/ui/Input';

function SignInPage() {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div 
                className='w-full flex flex-col items-center bg-layout-primary p-[3.125rem] max-w-[28.125rem] 
                max-sm:p-[1.5rem] max-sm:max-w-[18.75rem] space-y-2 border-2 border-layout-second rounded
                '
            >
                <Image
                    className='pb-10' 
                    alt='NO LOGO'
                    src="/logo.png"
                    width={200}
                    height={55}
                />
                <form className='w-full space-y-3'>
                    <Input 
                        className='w-full'
                        placeholder="Email"
                    />
                    <Input 
                        className='w-full'
                        placeholder="Mật Khẩu"
                    />
                    <Button
                        // type="submit"
                    >
                        Đăng Nhập
                    </Button>
                </form>
           </div>
        </div>
    );
}

export default SignInPage;