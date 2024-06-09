import React from 'react';

function InputSelect({ placeholder, className, data, value, onChange }) {
    return (
        <select
            className={`${className || ''} p-1 outline-none bg-layout-second`}
            value={value}
            onChange={(e) => {
                onChange && onChange(e.target.value, e) // value string, event object
            }}
        >
            <option className='hidden text-input-place' value='' >{placeholder}</option>
            {
                data && data.length > 0 && 
                data.map(d => { 
                    return <option key={d.value} value={d.value}>
                        {d.name}
                    </option>
                })
            }
        </select>
    );
}

export default InputSelect;