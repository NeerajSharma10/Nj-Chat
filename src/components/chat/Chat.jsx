import React, { useState, useRef, useEffect } from 'react'
import './chat.css'
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import ErrorIcon from '@mui/icons-material/Error';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { useChatStore } from '../../lib/chatStore'
import { onSnapshot, doc, arrayUnion, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore';
import {upload} from '../../lib/upload'

const Chat = () => {
  const [chat, setChat] = useState()
  const [img, setImg] = useState({
    file: null,
    url: ""
  })

  const [emojiMode, setEmojiMode] = useState(false);
  const [textInsideMessage, setTextInsideMessage] = useState("")
  const endRef = useRef(null)
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore()

  useEffect(() => {
    endRef.current.scrollIntoView({ behaviour: 'smooth' })
  }, [])

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data())
    })
    return () => {
      unsub()
    }
  }, [chatId])


  const emojiHandler = () => {
    setEmojiMode(!emojiMode)
  }

  const handleImg = (e) => {
    if(e.target.files[0]) {
      setImg({
        file : e.target.files[0],
        url : URL.createObjectURL(e.target.files[0])
      })
    }
    console.log(img);
  }

  const emojiTextHandler = (emoji) => {
    const emojiandString = textInsideMessage + emoji.emoji;
    setTextInsideMessage(emojiandString)
    console.log(emojiandString);
  }

  const sendHandler = async () => {
    if (textInsideMessage == "") return;

    let imgUrl = null

    if(img.file) {
      imgUrl = await upload(img.file)
    }

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: textInsideMessage,
          createdAt: new Date(),
          ...(imgUrl && {img: imgUrl}),
        })
      })

      console.log("imgUrl", imgUrl);

      const userIds = [currentUser.id, user.id]

      userIds.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id)
        const userChatsSnapshot = await getDoc(userChatRef)
        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data()
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatsData.chats[chatIndex].lastMessage = textInsideMessage;
          userChatsData.chats[chatIndex].isSeen = id == currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();
          await updateDoc(userChatRef, {
            chats: userChatsData.chats
          })

        }
      })
      console.log("bb", img);
      setImg({
        file: null,
        url: ""
      });

      setTextInsideMessage("")

    } catch (err) {
      console.log("xxx", err);
    }
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

        {
          console.log(chat?.messages)
        }

        {
          chat?.messages?.map((message) => {
            return (
              <div key={message.createdAt} className={message.senderId === currentUser.id ? "ownMessage": "sendMessage"}>
               

                  {message.img && <div >
                    <img className="uploadedImage" src={message.img} alt="" />
                  </div>
                  }

                  <div className={message.senderId === currentUser.id ? "ownMessageInside": "sendMessageInside"}>
                      <p className={message.senderId === currentUser.id ? "textInsideOwnMessage": "textInsideSendMessage"}>
                        {message.text}
                      </p>
                    {/* <div className='time'>1 min ago</div> */}
                  </div>
              </div>
            )
          })
        }
         {
            img.url && 
            <div className="ownMessageInside">
              <img src={img.url} alt="" /> 
            </div>  
          }
        <div ref={endRef}></div>
      </div>


      <hr className='hrtag' />
      <div className="bottom">
        <div className="iconsbar">
          <label htmlFor="file">
            <DriveFolderUploadIcon style={{cursor:'pointer'}}/>
          </label>
          <input type="file" id='file' style={{display:"none"}}  onChange={handleImg}/>
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
          <button onClick={sendHandler} className='buttonSend'>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat