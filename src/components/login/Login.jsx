import React, { useEffect, useState } from 'react'
import './Login.css'
import {auth} from '../../lib/firebase'
import {db} from '../../lib/firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import {upload} from '../../lib/upload'
import {useUserStore} from '../../lib/userStore'

export const Login = () => {

    const {fetchUserInfo} = useUserStore()

    const [avatar, setAvatar] = useState({
        file : null,
        url : ""
    });

    const fileHandler = (e) => {
        setAvatar({
            file : e.target.files[0],
            url : URL.createObjectURL(e.target.files[0])
        })
    }


    const handleRegister = async (e) => {
        try{
            e.preventDefault();
            const {username, email, password} = e.target;
            const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
            
            const imageUrl = await upload(avatar);

            //entering user data in firestore
            const user = {
                username: username.value,
                email: email.value,
                url: imageUrl,
                password: password.value,
                id: userCredential.user.uid,
                blocked: []
              };

            const userChat = {
                chats: []
            }

            await setDoc(doc(db, "users", userCredential.user.uid), user);
            await setDoc(doc(db, "userChats", userCredential.user.uid), userChat);


            toast.success("User SignedUp Up!!!");
        } catch(err) {
            console.log(err);
            toast.error("Unknow Error")
        }
    }

    const handleLogin = async(e) => {
        try{
            e.preventDefault();
            const {email, password} = e.target;
            const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
            toast.success("User Logged In!!!");
        } catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, " @ ", errorMessage);
            toast.error("Wrong Credentials");
        }
    }

    return (
        <div className='login'>
            <div className="formDiv">
                <h2>Welcome back !!!</h2>
                <br />
                <form onSubmit={handleLogin} className='form'>
                    <input type='email' name="email" placeholder='email' />
                    <input type='password' name="password" placeholder='password' />
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <hr className='hrtag1'/>
            <div className="formDiv">
                <h2>Create an Account</h2>
                <br />
                <form onSubmit={handleRegister} className='form'>
                    <label htmlFor="uploadedImage" className='labelImage'>
                        <img src={avatar.url || "src/assets/1.jpg"} alt="" />
                        <div style={{
                            fontWeight : "100"
                        }}>Upload an Image</div>
                    </label>
                    <input onChange={fileHandler} type="file" id='uploadedImage' style={{display : "none"}}/>
                    <input type="text" name='username' placeholder='username'/>
                    <input type='email' name="email" placeholder='email'/>
                    <input type='password' name="password"  placeholder='password'/>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Login