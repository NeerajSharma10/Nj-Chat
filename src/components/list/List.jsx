import React from 'react'
import './list.css'
import UserInfo from './userInfo/UserInfo'
import Chatlist from './chatlist/Chatlist'

export const List = () => {
  return (
    <div className='list'>
      <UserInfo/>
      <br />
      <Chatlist/>
    </div>
  )
}

export default List
