import React from 'react';

function LayoutAuth({ children }) {
    return (
        <div
            className='w-full h-[100vh] fixed bg-auth-layout bg-cover bg-center bg-no-repeat'
        >
            { children }
        </div>
    );
}

export default LayoutAuth;