import React from 'react';

function CardBlur({ className, children }) {
    return (
        <div className={'relative w-full h-auto rounded-lg overflow-hidden shadow-md'}>
            <div className="z-[-1] absolute w-full h-full top-0 left-0 bg-white/5 backdrop-blur-md"></div>
            <div className={'w-full h-full ' + className}>
                {children}
            </div>
        </div>
    );
}

export default CardBlur;