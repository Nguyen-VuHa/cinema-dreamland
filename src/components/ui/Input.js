'use client';

import React from 'react';

function Input({ className, classNameInput,  placeholder, inputChange, value, type, errMessage, children }, ref) {
    return (
        <div className={
            (className || '') + 
            ` w-full space-y-2`
        }>
            <input 
                className={classNameInput || '' + 
                    ` w-full border-2 border-solid border-transparent
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
                    inputChange && inputChange(e.target.value, e)
                }}
                value={value}
                type={type || 'text'}
                {...children}
             />
            {
                errMessage && <small className='text-error font-extralight italic'>{ errMessage }</small>
            }
        </div>
     )
}

export default  React.forwardRef(Input);