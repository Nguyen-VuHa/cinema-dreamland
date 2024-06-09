'use client'

import React, { useEffect, useState } from 'react';
import { PiCalendarHeartFill } from "react-icons/pi";
import { generateYears, getMonthCalendar } from '~/utils/calender';
import InputSelect from './InputSelect';
import dayjs from 'dayjs';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Divider from './Divider';

// Data months from Vietnamese
const Months = [
    { value: 1, name: "Thang 1" },
    { value: 2, name: "Thang 2" },
    { value: 3, name: "Thang 3" },
    { value: 4, name: "Thang 4" },
    { value: 5, name: "Thang 5" },
    { value: 6, name: "Thang 6" },
    { value: 7, name: "Thang 7" },
    { value: 8, name: "Thang 8" },
    { value: 9, name: "Thang 9" },
    { value: 10, name: "Thang 10" },
    { value: 11, name: "Thang 11" },
    { value: 12, name: "Thang 12" }
]

const maxYear = 2100
const minYear = 1900
// Data years start 1900 from now.
const years = generateYears(minYear, maxYear)

// Data today for checking active and set default value
const toDay = dayjs().date()

// data day of week Vietnamese
const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];

function InputDate({ placeholder, classNameInput, value, onChange }) {

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

  return (
    <div className='w-full relative'>
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
                `
            }
        >
            <span className='text-input-place'>{daySelect && dateString || (placeholder || 'DD/MM/YYYY')}</span>
            <PiCalendarHeartFill 
                className='text-[24px] cursor-pointer text-primary'
            />
        </div>
        <div 
            className='
                absolute top-[110%] left-[0] z-[999] 
                w-full min-h-[100px] bg-layout-second
                p-3 rounded-md text-white space-y-2
            '
        >
            {/* header input date */}
            <div className='w-full flex justify-between items-center '>
                <div>
                    <button 
                        className='border-2 rounded border-primary p-1 hover:bg-hover hover:text-primary transition-all' 
                        type='button'
                        onClick={() => {
                            if(month - 1 > 0) {
                                setMonth(month - 1)
                            } else {
                                if(year > minYear) {
                                    setMonth(12)
                                    setYear(year - 1)
                                }
                            }
                        }}
                    >
                        <GrFormPrevious />
                    </button>
                </div>
                <div className='flex space-x-2'>
                    <InputSelect 
                        className='border-2 rounded text-sm'
                        placeholder="Thang"
                        data={Months}
                        value={month}
                        onChange={(value) => {
                            setMonth(value)
                        }}
                    />
                    <InputSelect 
                        className='border-2 rounded text-sm'
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
                            if(month + 1 <= 12) {
                                setMonth(month + 1)
                            } else {
                                if(year < maxYear) {
                                    setMonth(1)
                                    setYear(year + 1)
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
                                p-1 text-xs text-primary
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