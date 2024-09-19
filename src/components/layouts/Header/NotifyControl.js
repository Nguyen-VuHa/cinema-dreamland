"use client"

import React, { useEffect, useRef, useState } from 'react';
import { TbBellRingingFilled } from "react-icons/tb";
import Divider from '~/components/ui/Divider';
import { PiBellSimpleRingingDuotone } from "react-icons/pi";


function NotifyControl() {
    const buttonRef = useRef()
    const dropdownRef = useRef()
    const[isDropDown, setIsDropDown] = useState(false)

    const handleClickOutside = (event) => {
        if(buttonRef.current && !buttonRef.current.contains(event.target))
        { 
            if(dropdownRef && !dropdownRef.current.contains(event.target)) {
                setIsDropDown(false);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        }
    }, []);

    return (
        <div className='relative z-[100]'>
            <div 
                ref={buttonRef}
                className='cursor-pointer bg-layout-second shadow-sm shadow-primary transition-all 
                duration-200 p-2 rounded-[50%] hover:text-layout-second hover:shadow-input-place hover:bg-primary'
                onClick={() => {
                    setIsDropDown(!isDropDown)
                }}
            >
                <TbBellRingingFilled 
                    className='text-[25px]'
                />
            </div>
            <div className='absolute top-[-20%] right-[-20%]'>
                <div className='flex justify-center items-center w-[22px] h-[22px] rounded-[50%] bg-error text-layout-second p-0.5 text-center'>
                    <span className='text-[10px] font-semibold'>9+</span>
                </div>
            </div>
            {/* Dropdown */}
            <div 
                ref={dropdownRef}
                className={`absolute top-[115%] right-0 w-[320px] min-h-[500px] max-h-[500px] bg-layout-second
                shadow-md rounded-md ${!isDropDown && 'hidden'}`}
            >
                <div className='space-y-2'>
                    <div>
                        <div className='p-2'>
                            Thông Báo
                        </div>
                        <Divider />
                    </div>
                    <div>
                        
                    </div>
                    <div className='space-y-2 flex flex-col justify-center items-center !mt-10'>
                        <PiBellSimpleRingingDuotone 
                            className='text-[45px]'
                        />
                        <span>Không có thông báo nào.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotifyControl;