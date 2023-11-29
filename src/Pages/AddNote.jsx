import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Componnents/Navbar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddNote() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');
  const VerifyToken = async () => {
    try {
      if (!authToken) {
        console.error('Token not found in localStorage');
        navigate('/')
      }
      
       await axios.get('http://localhost:8000/user/checkauth', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    } catch (error) {
      console.error('Token verification failed:', error);
      navigate('/');
    }
  };
  useEffect(()=>{
  VerifyToken();
  })


/// Add note

const [title, setTitle] = useState("");
const [body, setBody] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {title, body}
       
      const response = await axios.post("http://localhost:8000/notes/new",data, {
        headers: {
          Authorization: `Bearer ${authToken}`
    }});
      if (response.status === 201) {
      console.log("notes added succesfully");
       setTitle('')
       setBody('')
       toast.success(`Note added successfully`)
      } else {
        console.log("Unexpected response status:", response.status);
        toast.error("Error in addind Note")
      }
    } catch (error) {
      console.log("Error in adding Note" , error)
      toast.error("Error in addind Note")
    }
  }

 
  return (
    <>
    <div>
    <Navbar />
    </div>

    <div className="flex justify-center items-start h-91vh bg-gray-100">
  <div className="xl:mt-12 lg:mt-8 md:mt-2 sm:pt-4 md:pt-4 bg-white p-4 sm:p-8 rounded-lg shadow-md w-full sm:w-3/5 md:w-3/5 lg:w-3/5 xl:w-1/2 h-91vh md:h-3/5 lg:h-3/5 xl:h-1/2 sm:flex-row md:flex-row-reverse flex-col justify-center">
    <h2 className="text-3xl font-bold mb-6 text-center">Add Your Note</h2>
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-600 font-bold text-xl sm:text-2xl">Title</label>
        <input
          type="text"
          id="title"
          required
          autoComplete='off'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full xl:w-[650px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="inputArea" className="block text-gray-600 font-bold text-xl sm:text-2xl">Description</label>
        <input
          type="text"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full xl:w-[650px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className='text-center my-8'>
      <button
        type="submit"
        className="bg-blue-500 text-white rounded py-2 px-4 sm:px-6 hover:bg-blue-600 focus:outline-none w-56 xl:w-96 sm:w-auto"
      >
        Add Note
      </button>
      </div>
      
    </form>
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


</>
  );
}

export default AddNote;


