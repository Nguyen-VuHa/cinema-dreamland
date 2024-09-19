"use client"
import React, { useEffect } from 'react';

function LayoutWatch({children}) {
    useEffect(() => {
        if ('serviceWorker' in navigator) {
            
            window.addEventListener('load', () => {
                console.log('co dang ky khong');
                navigator.serviceWorker.register('/service-worker.js').then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                }, (error) => {
                    console.error('Service Worker registration failed:', error);
                });
            });
        }
    }, []);

    // useEffect(() => {
    //     const handleBeforeUnload = () => {
    //         // Hủy bỏ service worker trước khi đóng tab
    //         if ('serviceWorker' in navigator) {
    //             navigator.serviceWorker.getRegistration().then((registration) => {
    //                 if (registration) {
    //                     registration.unregister().then((success) => {
    //                         if (success) {
    //                             console.log('Service Worker unregistered successfully before unload.');
    //                         }
    //                     });
    //                 }
    //             });
    //         }
    //     };
    
    //     // Lắng nghe sự kiện 'beforeunload'
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    
    //     // Cleanup khi component bị hủy bỏ (gỡ bỏ listener)
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);

    return (
        <>
            {children}
        </>
    );
}

export default LayoutWatch;