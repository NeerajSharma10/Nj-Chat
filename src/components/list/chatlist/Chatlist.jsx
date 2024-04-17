import React, { useState } from 'react'
import './chatlist.css'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {AddUser} from '../../adduser/adduser';

const Chatlist = () => {

  const [plusIconToggle, setPlusIconToggle] = useState(true);

  const plusHandler = () => {
    setPlusIconToggle(!plusIconToggle)
  }

  return (
    <>
      <div className="chatlist">
        <div className='chatlist2'>
          <SearchIcon className='search' />
          <input type="text" placeholder="Search" className="searchbar" />
        </div>
        <div onClick={plusHandler}>
          {
            plusIconToggle ? <AddIcon className='add' /> : <RemoveIcon className='add' />
          }
        </div>
      </div>
      <br />
        {
          !plusIconToggle && <div className="addUserDiv">
                              <AddUser/>
                            </div>
        }

      <br />
      <div className="item">
        <img src="src/assets/1.jpg" className='imgavatar' alt="" />
        <div className='description'>
          <div>John Doe</div>
          <div className='descriptionText'>My Name is John Doe</div>
        </div>
      </div>
      <hr className='hrtag' />
      <br />
      <div className="item">
        <img src="src/assets/2.jpg" className='imgavatar' alt="" />
        <div className='description'>
          <div>Mohta Ji</div>
          <div className='descriptionText'>My Name is Harsh Mohta</div>
        </div>
      </div>
      <br />
      <hr className='hrtag' />
      <div className="item">
        <img src="src/assets/3.jpg" className='imgavatar' alt="" />
        <div className='description'>
          <div>Ranjan</div>
          <div className='descriptionText'>Hi My Name is Ranjan</div>
        </div>
      </div>
      <br />
      <hr className='hrtag' />
      <div className="item">
        <img src="src/assets/4.jpg" className='imgavatar' alt="" />
        <div className='description'>
          <div>Pawan</div>
          <div className='descriptionText'>Hi My Name is Pawan</div>
        </div>
      </div>
      <br />
      <hr className='hrtag' />
    </>
  )
}

export default Chatlist