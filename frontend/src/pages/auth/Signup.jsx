import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TaskContext from '../../context/TaskContext';



const Signup = (props) => {
 const ctx = useContext(TaskContext)
  let navigate = useNavigate();
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://task-management-api-taupe.vercel.app/api/auth/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json)
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken)
      

      ctx.getNotes();
      navigate("/");
      // props.showAlert("account created successfully", "success")
    } else {
      alert("Invalid credentials")
      // props.showAlert("Invalid credentials", "danger")
    }
  }
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <h2 className='my-4'>Task Management signUp page</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" onChange={onChange} name='name' id="name" />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' onChange={onChange} id="email" />

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' onChange={onChange} id="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">confirm Password</label>
          <input type="password" className="form-control" name='cpassword' onChange={onChange} id="cpassword" minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  )
}

export default Signup
