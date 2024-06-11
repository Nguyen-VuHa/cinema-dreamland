'use client';

import React, { useState } from 'react';
import { CiLock, CiUnlock  } from "react-icons/ci";

function InputPassword({ className, classNameInput, placeholder, onChange, value, errMessage, children }, ref) {

    const [passwordShow, setPasswordShow] = useState(false)

    return (
        <div className={
            (className || '') + 
            ` w-full space-y-2 relative`
        }>
            <input 
                className={classNameInput || '' + 
                    `w-full border-2 border-solid border-transparent
                    rounded-md shadow-0 bg-layout-second text-[white]
                    px-3 py-2
                    transition-all
                    font-text
                    focus:!border-primary
                    placeholder-input-place
                    hover:bg-hover hover:transition-all
                    `
                }
                placeholder={placeholder || 'Nhập gì đó . . .'}
                ref={ref}
                onChange={(e) => {
                    onChange && onChange(e.target.value, e)
                }}
                value={value}
                type={passwordShow ? 'text' : 'password'}
                {...children}
            />
            {/* Button View Password */}
            <div
                className='
                    absolute top-0 m-0 right-[3%]
                    flex justify-center items-center
                    cursor-pointer p-1 text-[20px] text-input-place rounded-lg
                    transition-all
                    hover:text-primary hover:bg-hover
                '
                onClick={() => {
                    setPasswordShow(!passwordShow)
                }}
            >
                {
                    passwordShow ? <CiUnlock /> : <CiLock />
                }
               
            </div>  
            {
                errMessage && <small className='text-error font-extralight italic'>{ errMessage }</small>
            }
        </div>
     )
}

export default  React.forwardRef(InputPassword);