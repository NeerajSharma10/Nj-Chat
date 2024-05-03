import React from 'react'
import './userinfo.css'
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {useUserStore} from '../../../lib/userStore'

const UserInfo = () => {
  const {currentUser} = useUserStore() 

  return (
    <div className='userinfo'>
      <div className="userImageAndName">
        {/* <span className='userIcon'>{currentUser.username[0]}</span> */}
        <div>
          {
            console.log(currentUser.url)
          }
          <img src={currentUser.url || "src/assets/1.jpg"} style={{width:'35px', height:'35px', borderRadius:'15px', objectFit:'cover'}} alt="" />
        </div>
        <div className='textname'>
            <div>{currentUser.username}</div>
        </div>
      </div>
      <div className="icons">
        <MoreHorizIcon fontSize='large'/>
        <VideocamIcon fontSize='large'/>
        <DriveFileRenameOutlineIcon fontSize='large'/>
      </div>
    </div>
  )
}

export default UserInfo