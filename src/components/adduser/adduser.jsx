import React from 'react'
import './adduser.css'

export const AddUser = () => {
  return (
    <div className='addUser'>
      <form className="upper">
        <input type="text" placeholder='Username' />
        <button>Search</button>
      </form>
      <div className="lower">
        <img src="src/assets/1.jpg" alt="" />
        <h3 style={{
          fontFamily:"'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontWeight: "600",
          fontSize: "small"
        }}>Arya Stark</h3>
        <button>Add User</button>
      </div>
    </div>
  )
}

export default AddUser