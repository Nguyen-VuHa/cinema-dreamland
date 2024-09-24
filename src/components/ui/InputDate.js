'use client'
import '~/assets/styles/input-date.scss'
import React, { useEffect, useRef, useState } from 'react';
import { PiCalendarHeartFill } from "react-icons/pi";
import { generateYears, getMonthCalendar } from '~/utils/calender';
import InputSelect from './InputSelect';
import dayjs from 'dayjs';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Divider from './Divider';

// Data months from Vietnamese
const Months = [
    { value: 1, name: "Tháng 1" },
    { value: 2, name: "Tháng 2" },
    { value: 3, name: "Tháng 3" },
    { value: 4, name: "Tháng 4" },
    { value: 5, name: "Tháng 5" },
    { value: 6, name: "Tháng 6" },
    { value: 7, name: "Tháng 7" },
    { value: 8, name: "Tháng 8" },
    { value: 9, name: "Tháng 9" },
    { value: 10, name: "Tháng 10" },
    { value: 11, name: "Tháng 11" },
    { value: 12, name: "Tháng 12" }
]

const maxYear = 2100
const minYear = 1900
// Data years start 1900 from now.
const years = generateYears(minYear, maxYear)

// data day of week Vietnamese
const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];

function InputDate({ placeholder, classNameInput, value, onChange, errMessage}) {
    const selectRef = useRef(null); // ref - trạng thái component select
    const dropdownRef = useRef(null); // ref - trạng thái component drop down 

    // state status open dropdown
    const [isDropDown, setIsDropDown] = useState(false)

    // day list follow by month and year selected
    const [calendars, setCalendars] = useState([])

    // state month selected
    const [month, setMonth] = useState(dayjs().month() + 1)

    // state year selected
    const [year, setYear] = useState(dayjs().year())

    // date select 
    const [daySelect, setDaySelect] = useState(value || null)
    const [dateString, setDateString] = useState('')
    const [dateValue, setDateValue] = useState(null)

    useEffect(() => {
        if(!value) {
            setDaySelect(null)
            setDateString('')
            setDateValue(null)
        }
    }, [value])

    useEffect(() => {
        const calendar = getMonthCalendar(year, month);
        setCalendars(calendar)
    }, [year, month])
  

    useEffect(() => {
        if(daySelect) {
            let dayValue = dayjs( `${year}-${month}-${daySelect}`)
            setDateString(dayValue.format('DD/MM/YYYY'))
            setDateValue(dayValue)

            onChange && onChange(dayValue.format('YYYY-MM-DD'), dayValue) // return dateString, dayjs
        }
    }, [daySelect])

    const handleOutsideClick = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            setIsDropDown(false);
        }
      };
    
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (isDropDown) {
          const rect = selectRef.current.getBoundingClientRect();
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
      }, [isDropDown]);

  return (
    <div className='w-full relative' ref={selectRef}>
        <div
            className={classNameInput || '' + 
                `flex justify-between items-center w-full border-2 border-solid border-transparent
                rounded-md shadow-0 bg-layout-second text-[white]
                px-3 py-2 select-none
                transition-all
                font-text
                focus:!border-primary
                placeholder-input-place
                hover:bg-hover hover:transition-all
                cursor-pointer group
                `
            }
            onClick={() => {
                setIsDropDown(!isDropDown)
            }}
        >
            <span className={`${!daySelect && 'text-input-place'}`}>{daySelect && dateString || (placeholder || 'DD/MM/YYYY')}</span>
            <PiCalendarHeartFill  
                className='text-[24px] cursor-pointer transition-all group-hover:text-primary'
            />
        </div>
        {
            errMessage && <small className='text-error font-extralight italic'>{ errMessage }</small>
        }
        {/* Drop down */}
        <div 
            className={`absolute z-[999] 
            w-full min-h-[100px] bg-layout-second
            p-3 rounded-md text-white space-y-2 input-date-dropdown ${isDropDown && 'show' || ''}`}
            ref={dropdownRef}
        >
            {/* header input date */}
            <div className='w-full flex justify-between items-center '>
                <div>
                    <button 
                        className='border-2 rounded border-primary p-1 hover:bg-hover hover:text-primary transition-all' 
                        type='button'
                        onClick={() => {
                            if(parseInt(month) - 1 > 0) {
                                setMonth(parseInt(month) - 1)
                            } else {
                                if(parseInt(year) > minYear) {
                                    setMonth(12)
                                    setYear(parseInt(year) - 1)
                                }
                            }
                        }}
                    >
                        <GrFormPrevious />
                    </button>
                </div>
                <div className='flex space-x-2'>
                    <InputSelect 
                        className='border-2 cursor-pointer border-hover text-input-place hover:border-primary transition-all rounded text-sm'
                        placeholder="Thang"
                        data={Months}
                        value={month}
                        onChange={(value) => {
                            setMonth(value)
                        }}
                    />
                    <InputSelect 
                        className='border-2 cursor-pointer text-input-place border-hover hover:border-primary rounded text-sm transition-all'
                        placeholder="Nam"
                        data={years}
                        value={year}
                        onChange={(value) => {
                            setYear(value)
                        }}
                    />
                </div>
                <div>
                    <button 
                        className='border-2 rounded border-primary p-1 hover:bg-hover hover:text-primary transition-all' 
                        type='button'
                        onClick={() => {
                            if(parseInt(month) + 1 <= 12) {
                                setMonth(parseInt(month) + 1)
                            } else {
                                if(parseInt(year) < maxYear) {
                                    setMonth(1)
                                    setYear(parseInt(year) + 1)
                                }
                            }
                        }}
                    >
                        <GrFormNext />
                    </button>    
                </div>
            </div>
            <Divider />
            {/* content input date */}
            <div className='w-full grid grid-cols-7 gap-1'>
                {
                    daysOfWeek.map(day => {
                        return  <div 
                            key={day}
                            className='select-none flex justify-center items-center 
                                border-2 rounded border-hover
                                p-1 text-[.6rem] text-primary
                            '
                        >
                            {day}
                        </div>
                    })
                }
               
            </div>
            <div className='w-full grid grid-cols-7 gap-1'>
                {
                    calendars && calendars.length > 0 &&
                    calendars.map((calendar, index) => {
                        return calendar.map((childCalendar, indexChild) => {
                            let todayStatus = dayjs(`${year}-${month}-${childCalendar}`).format('YYYY-MM-DD') == dayjs().format('YYYY-MM-DD')
                            let dayActive = dayjs(`${year}-${month}-${childCalendar}`).format('YYYY-MM-DD') == dayjs(dateValue).format('YYYY-MM-DD')
                            return <div key={`${index}${indexChild}`}>
                                {
                                    childCalendar && <button 
                                        type='button'
                                        className={
                                            `select-none flex justify-center items-center 
                                            border-2 rounded border-hover
                                            p-1 text-xs w-full
                                            hover:bg-hover hover:text-primary transition-all hover:border-primary
                                            ${todayStatus && 'border-primary/50 text-primary'}
                                            ${dayActive && '!border-primary bg-hover hover:opacity-70 text-primary'}
                                            `
                                        }

                                        onClick={() => {
                                            setDaySelect(childCalendar)
                                            setIsDropDown(false)
                                        }}
                                    >
                                        {childCalendar}
                                    </button> || <div></div>
                                }
                            </div>
                        })
                    })  
                }
               
            </div>
        </div>
    </div>
  );
}

export default InputDate;