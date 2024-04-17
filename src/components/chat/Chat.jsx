import React, { useState,useRef, useEffect } from 'react'
import './chat.css'
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import ErrorIcon from '@mui/icons-material/Error';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker, { Emoji } from 'emoji-picker-react';

const Chat = () => {

  const [emojiMode, setEmojiMode] = useState(false);
  const [textInsideMessage, setTextInsideMessage] = useState("")
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current.scrollIntoView({behaviour : 'smooth'})
  }, [])


  const emojiHandler = () => {
    setEmojiMode(!emojiMode)
  }

  const emojiTextHandler = (emoji) => {
    const emojiandString = textInsideMessage + emoji.emoji;
    setTextInsideMessage(emojiandString)
    console.log(emojiandString);
  }

  return (
    <div className='chat'>
      <div className="top">
        <div className="top-left">
          <img src="src/assets/3.jpg" className='imgavatar' alt="" />
          <div className='description'>
            <div>Ranjan</div>
            <div className='descriptionText'>Hi My Name is Ranjan</div>
          </div>
        </div>
        <div className="top-right">
          <CallIcon />
          <VideocamIcon />
          <ErrorIcon />
        </div>
      </div>
      <hr className='hrtag' />


      <div className="center">
        <div className='sendMessage'>
          <img src="src/assets/3.jpg" className='sendMessageIconImage' alt="" />
          <div>
            <p className='textInsideSendMessage'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Quibusdam, dolorum, facere exercitationem doloribus eos
              aspernatur at voluptatibus tempora, ex fugiat minima nihil
              accusantium laboriosam repellendus commodi a! Consequuntur,
              tenetur ex!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>
          <div className='time'>1 min ago</div>
        </div>
        <br />
        <div className='ownMessage'>
          <div className='ownMessageInside'>
              <p className='textInsideOwnMessage'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Quibusdam, dolorum, facere exercitationem doloribus eos
                aspernatur at voluptatibus tempora, ex fugiat minima nihil
                accusantium laboriosam repellendus commodi a! Consequuntur,
                tenetur ex!asdasdasdsadsadasdsadsadasdsadadasdasdasddddddd
                dddddddddddddddddddddddddddddddddddddddddddddd
                asdasdsadsadasdsadadasssssssssssssadddsdasdad
                asdddddddddddddddddddddddddddddddddddddddd
                asdddddddddddddddddddddddddddddddddddddddddd
              </p>
              <div className='time'>1 min ago</div>
          </div>
        </div>
        <div className='sendMessage'>
          <img src="src/assets/3.jpg" className='sendMessageIconImage' alt="" />
          <div>
            <p className='textInsideSendMessage'>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Quibusdam, dolorum, facere exercitationem doloribus eos
              aspernatur at voluptatibus tempora, ex fugiat minima nihil
              accusantium laboriosam repellendus commodi a! Consequuntur,
              tenetur ex!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </p>
          </div>
          <div className='time'>1 min ago</div>
        </div>
        <br />
        <div className='ownMessage'>
          <div >
            <img className="uploadedImage" src="src/assets/pxfuel.jpg" alt="" />
          </div>
          <div className='ownMessageInside'>
              <p className='textInsideOwnMessage'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Quibusdam, dolorum, facere exercitationem doloribus eos
                aspernatur at voluptatibus tempora, ex fugiat minima nihil
                accusantium laboriosam repellendus commodi a! Consequuntur,
                tenetur ex!asdasdasdsadsadasdsadsadasdsadadasdasdasddddddd
                dddddddddddddddddddddddddddddddddddddddddddddd
                asdasdsadsadasdsadadasssssssssssssadddsdasdad
                asdddddddddddddddddddddddddddddddddddddddd
                asdddddddddddddddddddddddddddddddddddddddddd
              </p>
              <div className='time'>1 min ago</div>
          </div>
          <div ref={endRef}></div>
        </div>
      </div>
      

      <hr className='hrtag' />
      <div className="bottom">
        <div className="iconsbar">
          <DriveFolderUploadIcon />
          <CameraAltIcon />
          <KeyboardVoiceIcon />
        </div>
        <div className="centerinputbar">
          <input type="text" onChange={(e) => setTextInsideMessage(e.target.value)} value={textInsideMessage} placeholder='Type a message...' className="centerinputbarfield" />
        </div>
        <div className="emojibar">
          <div onClick={emojiHandler} className='emojipicker'>
            <EmojiEmotionsIcon />
            {
              emojiMode ?
                <div className="popup">
                  <EmojiPicker onEmojiClick={(emoji) => emojiTextHandler(emoji)} open={emojiMode} className='emojipickerreact' />
                </div> : ""
            }
          </div>
          <button className='buttonSend'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat