import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',

      });
    const navigate = useNavigate()
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async (e)=>{

        try {
              e.preventDefault()
            const body = {
                username: formData.username,
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email,
                password: formData.password,
                
            }
            const response = await axios.post("http://localhost:8000/user/signup", body);
           
            if (response.status === 201) {
                console.log("Account created successfully");
                setFormData({
                  username: '',
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                })
                navigate("/");
              } else {
                console.log("Unexpected response status:", response.status);
                toast.error("Pls provide unique username and email")
              }
                
        } catch (error) {
            console.log("Error in creating account", error)
            toast.error("Pls provide unique username and email")
        }
        
      }


  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 ">
        <div className='text-center'>
        <h2 className="text-3xl font-semibold mb-4">Sign Up</h2>
        </div>
        
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              required
              autoComplete='off'
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              autoComplete='off'
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              required
              autoComplete='off'
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              autoComplete='off'
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              autoComplete='off'
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
        Create an Account
          </button>
        </form>
        <div className='flex gap-2 text-center mx-10 mt-4'>
          <h1>Already have a Account ?</h1>
          <Link to="/"><h1 className='text-blue-600'>Login</h1></Link>
        </div>
      </div>
    </div>
    <ToastContainer
     position="top-center"
     autoClose={3000}
     hideProgressBar={false}
     newestOnTop
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="light"
      />
    </div>
  )
}

export default Signup
