import React, { useEffect, useState } from 'react'
import './chatlist.css'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {AddUser} from '../../adduser/adduser';
import { useUserStore } from '../../../lib/userStore';
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import {db} from '../../../lib/firebase'
import { useChatStore } from '../../../lib/chatStore';

const Chatlist = () => {

  const [plusIconToggle, setPlusIconToggle] = useState(true);
  const {changeChat} = useChatStore()
  const {currentUser} = useUserStore()
  const [chats, setChats] = useState([])

  const plusHandler = () => {
    setPlusIconToggle(!plusIconToggle)
  }

  const handleSelect = async(chat) => {
    const userChats = chats.map((item) => {
      const {user, ...rest} = item;
      return rest;
    })
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true
    const userChatsRef = doc(db, "userChats", currentUser.id)
    try {
      await updateDoc(userChatsRef, {
        chats: userChats
      })
      changeChat(chat.chatId, chat.user)
    }catch(err) {
      console.log("Error : " , err);
    }
  }

  useEffect(() => {
    
    const unsub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
        console.log("res : -> ", res);
        const items = res.data().chats
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId)
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data()
          return {...item, user}
        })
        const chatData = await Promise.all(promises)
        setChats(chatData.sort((a,b) => b.updatedAt - a.updatedAt))
        console.log("chats : -> " , chats);
    });

    return () => {
      unsub()
    }
  }, [currentUser.id])

  // console.log("chats : " , chats);

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

   
      {
        chats.map((chat) => {
          return (
            <div className='chatlistPart' style={{cursor: 'pointer', backgroundColor : chat?.isSeen ? 'transparent' : 'black'}} key={chat.chatId} onClick={() => handleSelect(chat)}>
              <div className="item">
                <img src={chat.user.url || "src/assets/1.jpg"} className='imgavatar' alt="" />
                <div className='description1'>
                  <div>{chat.user.username}</div>
                  <p className='descriptionText1'>{chat.lastMessage}</p>
                </div>
              </div>
              <br />
              <hr className='hrtag' />
          </div>
          )
        })
      }


    </>
  )
}

export default Chatlist