'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function LayoutAuth({ children }) {
    const router = useRouter();

    
    useEffect(() => {
        router.push('/auth/sign-in');
    }, [])

    return (
        <div
            className='w-full h-[100vh] fixed bg-auth-layout bg-cover bg-center bg-no-repeat'
        >
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
                    {children}  
                </div>
            </div>
        </div>
    );
}

export default LayoutAuth;