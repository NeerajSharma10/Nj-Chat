import React, { useState } from 'react'
import './Login.css'

export const Login = () => {

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


    const search = () => {
        console.log("in search function!!!");
    }

    return (
        <div className='login'>
            <div className="formDiv">
                <h2>Welcome back !!!</h2>
                <br />
                <form action={search} className='form'>
                    <input type='email' name="email" placeholder='email' />
                    <input type='password' name="password" placeholder='password' />
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <hr className='hrtag1'/>
            <div className="formDiv">
                <h2>Create an Account</h2>
                <br />
                <form action={search} className='form'>
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