'use client';

import React, { useEffect, useRef, useState } from 'react';

let autoCompleteList = [
    "@gmail.com",
    "@outlook.com",
    "@hotmail.com",
]

function InputEmail({ className, classNameInput, placeholder, onChange, value, name, type, errMessage, children, autoComplete }, ref) {
    const [isDropdown, setIsDropdown] = useState(false) // trạng thái đóng mở dropdown khi focus vào input 

    const dropdownRef = useRef(null);
    const inputRef = useRef(null);


    const handleOutsideClick = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            setIsDropdown(false);
        }
    };
    
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    useEffect(() => {
        if (isDropdown) {
          const rect = inputRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const windowWidth = window.innerWidth;
    
          if (windowHeight - rect.bottom < dropdownRef.current.clientHeight) {
            dropdownRef.current.style.bottom = '110%';
            dropdownRef.current.style.top = 'auto';
          } else {
            dropdownRef.current.style.top = '110%';
            dropdownRef.current.style.bottom = 'auto';
          }
    
          if (windowWidth - rect.right < dropdownRef.current.clientWidth) {
            dropdownRef.current.style.right = '0';
            dropdownRef.current.style.left = 'auto';
          } else {
            dropdownRef.current.style.left = '0';
            dropdownRef.current.style.right = 'auto';
          }
        }
      }, [isDropdown]);

    return (
        <div className={
            (className || '') + 
            ` w-full space-y-2 relative`}
            ref={inputRef}
        >
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
                type={type || 'text'}
                name={name}
                onFocus={() => {
                    setIsDropdown(true)
                }}
                autoComplete="off"
                {...children}
             />
            {
                errMessage && <small className='text-error font-extralight italic'>{ errMessage }</small>
            }
            <div 
                ref={dropdownRef}
                className={`absolute 
                w-full min-h-[40px] bg-layout-second
                p-3 rounded-md text-white space-y-2 input-date-dropdown show border-[1px] border-layout-primary space-y-1
                ${!value.includes("@") && isDropdown ? "z-[100] opacity-1" : "z-[-1] opacity-[0]"}
                `}
            >
                {
                    autoComplete &&
                    autoComplete.map((auto, index) => {
                        return <div 
                            key={`${auto}-${index}`}
                            className='
                            cursor-pointer p-2 
                            bg-layout-primary/60 rounded-md
                            hover:bg-layout-primary select-none'
        
                        >
                            {value}{auto}
                        </div>
                    }) || autoCompleteList.map(auto => {
                        return <div 
                            onClick={() => {
                                onChange && onChange(value + auto)
                            }}
                            key={auto}
                            className='
                            cursor-pointer p-2 
                            bg-layout-primary/60 rounded-md
                            hover:bg-layout-primary select-none
                            text-hidden
                            '
        
                        >
                            {value}
                            <span className='text-primary'>{auto}</span>
                        </div>
                    })
                }
            </div>
        </div>
     )
}

export default  React.forwardRef(InputEmail);