import React from 'react'
import './userinfo.css'
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const UserInfo = () => {
  return (
    <div className='userinfo'>
      <div className="userImageAndName">
        <span className='userIcon'>N</span>
        <div className='textname'>Neeraj</div>
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