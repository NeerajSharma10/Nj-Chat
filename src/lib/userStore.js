import { create } from 'zustand'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../lib/firebase'

export const useUserStore = create((set) => ({
  currentUser: null,
  loading: true,
  fetchUserInfo: async(uid) => {
    if(!uid) return set({currentUser: null, loading: false});
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            set({currentUser: docSnap.data() , loading: false});
        }else{
            set({currentUser: null , loading: false});
        }
    } catch (error) {
        console.log(error);
        set({currentUser: null , loading: false});
    }
  }
}))