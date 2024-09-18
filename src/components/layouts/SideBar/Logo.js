import Image from 'next/image';
import React from 'react';

function Logo() {
    return (
        <a href='/' className='flex justify-center items-center space-x-2'>
            <Image
                className='pb-2 max-md:p-0 w-[70px]' 
                alt='NO LOGO'
                src="/logo.png"
                priority
                width={180}
                height={1}
            />
            <span className='uppercase text-lg font-bold'>
                Dreamland
            </span>
        </a>
    );
}

export default Logo;