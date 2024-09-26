"use client"

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import ToasitfyMessage from '~/components/toastify/Toastify.Main'
// import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { usePathname } from 'next/navigation'
import SideBar from '~/components/layouts/SideBar/SideBar'
import Header from '~/components/layouts/Header/Header'

// Initialize an agent at application startup.
// const fpPromise = FingerprintJS.load();

function ReduxProvider({children}) {
  const pathname = usePathname();

  // Kiểm tra nếu đang ở trang đăng nhập hoặc đăng ký
  const noLayoutPages = ['/auth/sign-in', '/auth/sign-up', '/auth/otp-verification', '/login/success'];

  const isAuthPage = noLayoutPages.includes(pathname);

  // useEffect(() => {
  //   (async () => {
  //     const fp = await fpPromise;
  //     const result = await fp.get();
    
  //     // This is the visitor identifier:
  //     const visitorId = result.visitorId;
  //   })()
    
  // }, [])

    useEffect(() => {
      if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then((registration) => {
              console.log('Service Worker registered with scope:', registration.scope);
            }).catch((error) => {
              console.error('Service Worker registration failed:', error);
            });
          });
      } else {
        console.log('Service Workers are not supported in this browser.');
      }
  }, []);

  useEffect(() => {
      const handleBeforeUnload = () => {
          // Hủy bỏ service worker trước khi đóng tab
          if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistration().then((registration) => {
                  if (registration) {
                      registration.unregister().then((success) => {
                          if (success) {
                              console.log('Service Worker unregistered successfully before unload.');
                          }
                      });
                  }
              });
          }
      };

      // Lắng nghe sự kiện 'beforeunload'
      window.addEventListener('beforeunload', handleBeforeUnload);

      // Cleanup khi component bị hủy bỏ (gỡ bỏ listener)
      return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }, []);

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
          <div className="flex w-full h-auto text-primary px-5 max-sm:px-3 lg:px-10">
            <SideBar />
            <div className='w-full md:ml-[30%] lg:ml-[25%] xl:ml-[20%] 2xl:ml-[17%] pb-10'>
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