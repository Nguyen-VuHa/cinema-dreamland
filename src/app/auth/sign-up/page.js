'use client'
import React from 'react';
import Input from '~/components/ui/Input';
import InputDate from '~/components/ui/InputDate';

function SignUpPage() {
    return (
        <form className='w-full space-y-3'>
            <Input 
                className='w-full'
                placeholder="Email"
            /> 
            <Input 
                className='w-full'
                placeholder="Họ & Tên"
            />
            <InputDate 
                className='w-full'
                placeholder="Ngày sinh nhat"
            />
        </form>
    );
}

export default SignUpPage;