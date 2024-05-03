import React from 'react'
import './detail.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SouthIcon from '@mui/icons-material/South';
import { auth } from '../../lib/firebase';

export const Detail = () => {
  return (
    <div className='detail'>
      <div className="profileThings">
        <img src="src/assets/1.jpg" alt="" />
        <h2>Dustin Henderson</h2>
        <i>Stranger things Charming Character!!!</i>
      </div>
      <div className="profileOptions">
        <div className="chatSettings">
          <h4>Chat Settings</h4>
          <ExpandMoreIcon className='optionsIcons'/>
        </div>
        <div className="chatSettings">
          <h4>Chat Settings</h4>
          <ExpandMoreIcon className='optionsIcons'/>
        </div>
        <div className="chatSettings">
          <h4>Chat Settings</h4>
          <ExpandMoreIcon className='optionsIcons'/>
        </div>
        <div className="chatSettings">
          <h4>Privacy & Help</h4>
          <ExpandMoreIcon className='optionsIcons'/>
        </div>
        <div className="chatSettings">
          <h4>Shared photos</h4>
          <ExpandMoreIcon className='optionsIcons'/>
        </div>
        <div className="optionsDetail">
          <div className="chatSettings">
            <h4>Shared Files</h4>
            <ExpandLessIcon className='optionsIcons'/>
          </div>
          <div className="options">
            <img className='' src="src/assets/pexels-francesco-ungaro-2554092.jpg" alt="" />
            <h6>fileName.png</h6>
            <SouthIcon className='optionsIcons'/>
          </div>
          <hr className='hrtag' />
          <div className="options">
            <img className='' src="src/assets/pexels-francesco-ungaro-2554092.jpg" alt="" />
            <h6>fileName.png</h6>
            <SouthIcon className='optionsIcons'/>
          </div>
        </div>
        <div className="chatSettings">
          <h4>Chat Settings</h4>
          <ExpandMoreIcon className='optionsIcons'/>
        </div>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Sapiente recusandae consectetur non quisquam nobis conseq
          uatur nesciunt sequi perspiciatis omnis optio soluta provi
          dent consequuntur, necessitatibus impedit officia fuga aut sit asperiores?
        </div>
      </div>

      <hr className='hrtag'/>

      <div className="blockButtonDiv">
        <button className='blockButton'>
          Block User
        </button>
        <button className='logoutButton' onClick={() => {
          console.log("logout");
          auth.signOut()
        }}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Detail