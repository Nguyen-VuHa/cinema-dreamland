import React from 'react';

function MenuItem({ onClick, menuName, icon, isActive}) {
    
    return (
        <div 
            className={`w-full flex items-center space-x-2 px-4 py-3 select-none cursor-pointer rounded-md 
            hover:text-layout-primary hover:bg-primary/80 ease-in duration-200 ${isActive && 'text-layout-primary bg-primary' || '' }`}
            onClick={(e) => {
                onClick && onClick(e)
            }}
        >
            {icon}
            <span className='truncate w-menu-icon-with font-semibold'>{menuName}</span>
        </div>
    );
}

export default MenuItem;