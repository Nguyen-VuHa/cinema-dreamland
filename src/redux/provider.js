"use client"

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import ToasitfyMessage from '~/components/toastify/Toastify.Main'
// import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { usePathname } from 'next/navigation'
import SideBar from '~/components/layouts/SideBar'
import Header from '~/components/layouts/Header'

// Initialize an agent at application startup.
// const fpPromise = FingerprintJS.load();

function ReduxProvider({children}) {
  const pathname = usePathname();

  // Kiểm tra nếu đang ở trang đăng nhập hoặc đăng ký
  const noLayoutPages = ['/auth/sign-in', '/auth/sign-up', '/auth/otp-verification'];

  const isAuthPage = noLayoutPages.includes(pathname);

  // useEffect(() => {
  //   (async () => {
  //     const fp = await fpPromise;
  //     const result = await fp.get();
    
  //     // This is the visitor identifier:
  //     const visitorId = result.visitorId;
  //   })()
    
  // }, [])

  return (
    <Provider store={store}>
      <ToasitfyMessage 
      
      />
      {
        !isAuthPage && 
        <>
          <div className="z-[-1] fixed top-0 left-0 w-full h-[100vh]">
            <div className="w-full h-full bg-auth-layout bg-cover bg-center bg-no-repeat backdrop-blur-md">
            </div>
            <div className='absolute top-0 left-0 w-full h-full backdrop-blur-sm'>
            </div>
          </div>
          <div className="flex w-full h-auto text-primary">
            <SideBar />
            <div className='ml-[20%] w-full'>
              <Header />
              {children}
            </div>
          </div>
        </>
      }
      {
        isAuthPage && children
      }
  </Provider>
  )
}

export default ReduxProvider