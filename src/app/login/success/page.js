"use client"
import Cookies from 'js-cookie';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { PuffLoader } from 'react-spinners';
import { ACCESS_TOKEN, LOGIN_METHOD, USER_ID } from '~/constants/cookie';

function AuthSuccessThirdParty() {
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const accessToken = searchParams.get('access_token')
    const uid = searchParams.get('uid')
    const method = searchParams.get('method')

    useEffect(() => {
        if (!accessToken && !uid && !method)
        {
            router.back()
            return
        }

        Cookies.set(ACCESS_TOKEN, accessToken)
        Cookies.set(USER_ID, uid)
        Cookies.set(LOGIN_METHOD, method)

        window.location.replace("/")
    }, [])
    

    return (
        <div 
            className='w-full flex flex-col items-center bg-layout-primary p-[3.125rem] max-md:p-[2rem] max-w-[28.125rem] 
                max-sm:p-[1.5rem] max-sm:max-w-[90%] space-y-2 border-2 border-layout-second rounded text-primary text-lg
            '
        >
            <span>Vui lòng chờ xác thực . . . . </span>
            <PuffLoader 
                color="#f9ab00"
                loading={true}
            />
        </div>
    );
}

export default AuthSuccessThirdParty;