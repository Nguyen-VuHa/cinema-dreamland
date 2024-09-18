import Image from 'next/image';
import React from 'react';

function LayoutAuth({ children }) {
    

    return (
        <div
            className='w-full h-[100vh] fixed bg-auth-layout bg-cover bg-center bg-no-repeat'
        >
             <div className='w-full h-full flex flex-col justify-center items-center'>
                <div 
                    className='w-full flex flex-col items-center bg-layout-primary p-[3.125rem] max-md:p-[2rem] max-w-[28.125rem] 
                        max-sm:p-[1.5rem] max-sm:max-w-[18.75rem] space-y-2 border-2 border-layout-second rounded
                    '
                >
                    <Image
                        className='pb-5 max-md:p-0 w-[100px]' 
                        alt='NO LOGO'
                        src="/logo.png"
                        priority
                        width={150}
                        height={1}
                    />
                    {children}  
                </div>
            </div>
        </div>
    );
}

export default LayoutAuth;