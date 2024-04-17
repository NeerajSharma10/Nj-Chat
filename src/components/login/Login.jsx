import React from 'react'
import './Login.css'

export const Login = () => {

    const search = () => {
        console.log("in search function!!!");
    }

    return (
        <div className='login'>
            <div className="loginForm">
                <form action={search}>
                    <input type='email' name="email" />
                    <input type='password' name="password" />
                    <button type="submit">Sign In</button>
                </form>
            </div>
            <div className="registerForm">
                <form action={search}>
                    <input type="text" name='username'/>
                    <input type='email' name="email" />
                    <input type='password' name="password" />
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </div>
    )
}

export default Login