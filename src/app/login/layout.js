import Image from 'next/image';

function LayoutAuth({ children }) {

    return (
        <div
            className='w-full h-[100vh] fixed bg-auth-layout bg-cover bg-center bg-no-repeat'
        >
            <div className='w-full h-full flex flex-col justify-center items-center max-sm:justify-start max-sm:mt-5'>
                {children}  
            </div>
        </div>
    );
}

export default LayoutAuth;