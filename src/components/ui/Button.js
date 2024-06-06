import React from 'react';
import { HashLoader } from 'react-spinners';

function Button({ className, type, loading, loadingText, onClick,  children }) {
    return (
        <button
            className={ className || '' + 
                `flex justify-center items-center w-full px-3 py-2 text-white border-2 border-primary/60 rounded-md bg-layout-primary  hover:border-primary hover:bg-hover transition-all`
            }
            type={type || 'button'}
            onClick={(e) => {
                if(!loading) {
                    onClick && onClick(e)
                }
            }}
        >
            { loading ? 
                <div className='flex space-x-2 items-center'>
                    <HashLoader color='#f9ab00' size={24} /> 
                    <span>{ loadingText }</span>
                </div>
            : children }
        </button>
    );
}

export default Button;