import { useEffect, useState } from 'react'
import './App.css'
import Chat from './components/chat/Chat'
import { List } from './components/list/List'
import { Detail } from './components/detail/Detail'
import {Login} from './components/login/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useUserStore} from './lib/userStore'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from './lib/firebase'
import { useChatStore } from './lib/chatStore'


function App() {

  const {currentUser, loading, fetchUserInfo} = useUserStore()
  const {chatId} = useChatStore()


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    } )
    return () => {
      unsub();
    }
  }, [fetchUserInfo])

  if(loading) {
    return (
      <>
        <div class="ball"></div>
  
      </>
    )
  } 

  return (
    <div className='outerContainer'>
      <div className="innerContainer">

        {
          currentUser ? <>
            <List/>
            {chatId && <Chat/>}
            {chatId && <Detail/>}
          </>  : <>
            <Login/>
            <ToastContainer />
          </>
        }
      </div>
    </div>
  )
}

export default App
