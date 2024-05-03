import React from 'react'
import './adduser.css'
import { collection, query, where, getDocs, serverTimestamp, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { useState } from 'react'
import {db} from '../../lib/firebase'
import { useUserStore } from '../../lib/userStore'


export const AddUser = () => {

  //searching wala user hai ye na ki current user 
  const [user, setUser] = useState(null)
  const {currentUser} = useUserStore()

  const handleSearch = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")
    try{
      console.log(username);
      const userRef = collection(db, "users")
      //Create a query against a collection
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q)
      // console.log(querySnapshot);
      if(querySnapshot) {
        setUser(querySnapshot.docs[0].data())
      }
      console.log("user : ", user.url);
    }catch(err) {
      console.log(err);
    }
  }


  const handleAddClick = async () => {
    const chatRef = collection(db, "chats")
    const userChatsRef = collection(db, "userChats")

    try {
      const newChatRef  = doc(chatRef)
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: []
      })
      await updateDoc(doc(userChatsRef, user.id), {
        chats : arrayUnion({
          chatId: newChatRef.id,
          lastMessage:"",
          receiverId: currentUser.id,
          updatedAt: Date.now()
        })
      })
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats : arrayUnion({
          chatId: newChatRef.id,
          lastMessage:"",
          receiverId: user.id,
          updatedAt: Date.now()
        })
      })
      console.log("geo");
    }catch(err) {
      console.log("error : ", err);
    }
  }

  return (
    <div className='addUser'>
      <form className="upper" onSubmit={handleSearch}>
        <input type="text" placeholder='Username' name='username' />
        <button>Search</button>
      </form>
      {
        user && <div className="lower">
                  <img src={user.url || "src/assets/1.jpg"} alt="" />
                  <h3 style={{
                    fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                    fontWeight: "600",
                    fontSize: "small"
                  }}>{user.username}</h3>
                  <button onClick={handleAddClick}>Add User</button>
                </div>
      }
    </div>
  )
}

export default AddUser