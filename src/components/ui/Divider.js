import React from 'react';

function Divider({ className }) {
    return (
        <div className={`${className || ''} h-[2px] w-full bg-primary`}></div>
    );
}

export default Divider;