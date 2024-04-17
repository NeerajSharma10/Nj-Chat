import { useState } from 'react'
import './App.css'
import Chat from './components/chat/Chat'
import { List } from './components/list/List'
import { Detail } from './components/detail/Detail'
import {Login} from './components/login/Login'

function App() {

  return (
    <div className='outerContainer'>
      <div className="innerContainer">
        <List/>
        <Chat/>
        <Detail/>

        {/* <Login/> */}

      </div>
    </div>
  )
}

export default App
