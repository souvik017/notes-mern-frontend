import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = {email, password}
       
      const response = await axios.post("http://localhost:8000/user/login", body);
       
      if (response.status === 200 && response.data.success) {
      console.log("Loged in successfully");
      localStorage.setItem("token", response.data.token)
       setEmail('')
       setPassword('')
       setTimeout(() => {
        navigate('/addnote');
      }, 2000);
       toast.success("login sucessful !")
      } else {
        console.log("Unexpected response status:", response.status);
        toast.error("User not found !")
      }
    } catch (error) {
      console.log("Error in Loging in (404: User not Found)" , error)
      toast.error("User not found !")
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 font-bold">Email:</label>
            <input
              type="text"
              id="Email"
              required
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 font-bold">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 focus:outline-none w-full"
          >
            Login
          </button>
        </form>
        <div className='flex gap-2 text-center mx-12 my-4'>
          <h1>Don't have a Account ?</h1>
          <Link to="/SignUp"><h1 className='text-blue-600'>Signup</h1></Link>
        </div>
        <div className='text-center mx-10 mt-2'>
        <Link to="/"><h1 className='text-blue-600'>Forget password</h1></Link>
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
  );
}

export default Login
