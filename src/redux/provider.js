"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import ToasitfyMessage from '~/components/toastify/Toastify.Main'


function ReduxProvider({children}) {
  return (
    <Provider store={store}>
      <ToasitfyMessage 
      
      />
      {children}
    </Provider>
  )
}

export default ReduxProvider