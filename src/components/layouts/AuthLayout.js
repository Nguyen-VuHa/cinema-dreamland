import React from 'react';

function AuthLayout({ children }) {
    
    return (
        <div className='w-full h-full'>
           { children }
        </div>
    );
}

export default AuthLayout;