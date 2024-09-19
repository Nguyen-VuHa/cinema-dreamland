import Image from 'next/image';
import React from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { configAction } from '~/redux/reducers/configReducer';

function Logo() {
    const dispatch = useDispatch()

    return (
        <div className='relative'>
            <a href='/' className='flex justify-center items-center space-x-2 py-8'>
                <Image
                    className='max-md:p-0 w-[44px]' 
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
            <div className='absolute top-[10%] right-[3%] w-[50px] h-[50px] cursor-pointer hidden max-md:block'>
                <div 
                    className='w-full h-full 
                    flex justify-center items-center 
                    rounded-[999px] shadow 
                    backdrop-blur-lg bg-input-place/10
                    '
                    onClick={() => {
                        dispatch(configAction.setIsMenuSideBar(false))
                    }}
                >
                    <IoCloseSharp className='text-[30px] text-error' />
                </div>
            </div>
        </div>
    );
}

export default Logo;