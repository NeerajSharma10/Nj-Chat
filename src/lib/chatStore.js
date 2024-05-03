import { create } from 'zustand'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../lib/firebase'
import {useUserStore} from '../lib/userStore'

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked: false,
  isReceiverBlocked: false,
  changeChat: (chatId, user) => {
    try {

      const currentUser = useUserStore.getState().currentUser;
      console.log(currentUser);
      //Check if current User is blocked 
      //Check if receiver user is blocked

      if(user.blocked.includes(currentUser.id)) {
          return set({
              chatId,
              user: null,
              isCurrentUserBlocked: true,
              isReceiverBlocked: false
          })
      }else if(currentUser.blocked.includes(user.id)) {
          return set({
              chatId,
              user: null,
              isCurrentUserBlocked: false,
              isReceiverBlocked: true
          })
      }else{
        set({
          chatId,
            user,
            isCurrentUserBlocked: false,
            isReceiverBlocked: false
        })
      }
    }catch(err) {
      console.log("Exception : " , err);
    }

  },

  changeBlock: () => {
    set(state => ({...state, isReceiverBlocked: !state.isReceiverBlocked}))
  }
  
}))