import React from 'react';
import { TbBellRingingFilled } from "react-icons/tb";
function NotifyControl() {
    return (
        <div className='relative cursor-pointer bg-layout-second shadow-sm shadow-primary transition-all duration-200 p-2 rounded-[50%] hover:text-layout-second hover:shadow-input-place hover:bg-primary'>
            <TbBellRingingFilled 
                className='text-[25px]'
            />
            <div className='absolute top-[-15%] right-[-15%]'>
                <div className='flex justify-center items-center w-[20px] h-[20px] rounded-[50%] bg-error text-primary p-0.5 text-center'>
                    <span className='text-[8px]'>9+</span>
                </div>
            </div>
        </div>
    );
}

export default NotifyControl;