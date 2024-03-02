"use client"
import React from 'react'
import Navbarr from './components/navbar/page'
import MainSection from './components/mainsection/page'
import Footer from './components/footer/page'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
function page() {
  return (
    <div>
        <Provider store={store}>
      <Navbarr/>
      <MainSection/>
      <Footer/> 
   </Provider>
      </div>
  )
}

export default page