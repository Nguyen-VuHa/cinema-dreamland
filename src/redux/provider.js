"use client"

import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import ToasitfyMessage from '~/components/toastify/Toastify.Main'
import FingerprintJS from '@fingerprintjs/fingerprintjs';

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load();

function ReduxProvider({children}) {
  useEffect(() => {
    (async () => {
      const fp = await fpPromise;
      const result = await fp.get();
    
      // This is the visitor identifier:
      const visitorId = result.visitorId;
      console.log(visitorId);
    })()
    
  }, [])

  return (
    <Provider store={store}>
      <ToasitfyMessage 
      
      />
      {children}
    </Provider>
  )
}

export default ReduxProvider