import React, { useEffect, useState } from 'react'
import Navbar from '../Componnents/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AllNote() {
  const authToken = localStorage.getItem('token');
  const [notes, setnotes] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate()
  const [fullNote, setfullNote] = useState(null);

  const handleShowMore = (note) => {
    setfullNote(note);
  };

  const handleClose = () => {
    setfullNote(null);
  };

  const getNotes = async ()=>{
    try {
      if (!authToken) {
        console.error('Token not found in localStorage');
      }
      
       const response = await axios.get('http://localhost:8000/notes', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      setnotes(response.data.userNotes)
    }
    catch(error){
      console.error('Token verification failed:', error);
      navigate("/")
    }
  }
  useEffect(() => {
    getNotes()
  },);

  
  const handleDelete = async (noteId) => {
    try {
      const authToken = localStorage.getItem('token');
  
      if (!authToken) {
        console.error('Token not found in localStorage');
        return;
      }
  
       await axios.delete(`http://localhost:8000/notes/delete/${noteId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setnotes(notes.filter(note => note._id !== noteId));
      toast.success("Note Deleted")
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error("Failed to delete Note");
    }
  };
  

  const handleEdit = (note) => {
    setSelectedNote(note);
    setShowEditForm(true);
  };

  const handleEditFormClose = () => {
    setShowEditForm(false);
  };


  const handleNoteUpdate = async (updatedNote) => {

    try {
        await axios.put(`http://localhost:8000/notes/edit/${updatedNote._id}`, updatedNote, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      toast.success("Note Edited")
      setnotes(notes.map(note => (note._id === updatedNote._id ? updatedNote : note)));
      setShowEditForm(false); 
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error("Error in Editing")
    }
  };


  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-4 px-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
          <p className="text-gray-600 overflow-hidden line-clamp-2 h-14">{note.body}</p>
          <div className="mt-4 flex justify-end gap-4">
            <button
              onClick={() => handleDelete(note._id)}
              className="text-red-500 hover:text-red-700 font-semibold mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => handleEdit(note)}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Edit
            </button>
            <button
              onClick={() => handleShowMore(note)}
              className="text-green-500 hover:text-green-700 font-semibold"
            >
              Show More
            </button>
          </div>
        </div>
      ))}
    </div>
      </div>

      {fullNote && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-md p-4 max-w-lg w-full h-auto">
          <h2 className="text-xl font-semibold mb-2">{fullNote.title}</h2>
          <p className="text-gray-600 overflow-hidden break-words">{fullNote.body}</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleClose}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      )}

      {showEditForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">
            <button
              onClick={handleEditFormClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">Edit Note</h2>
            {selectedNote && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const updatedNote = {
                  ...selectedNote,
                  title: e.target.elements.title.value,
                  body: e.target.elements.body.value
                };
                handleNoteUpdate(updatedNote);
              }}>
                <div className="mb-4">
                  <label htmlFor="title" className="block mb-2 font-semibold">Title</label>
                  <input type="text" id="title" name="title" defaultValue={selectedNote.title} className="w-full border rounded-md px-2 py-1" />
                </div>
                <div className="mb-4">
                  <label htmlFor="body" className="block mb-2 font-semibold">Body</label>
                  <textarea id="body" name="body" defaultValue={selectedNote.body} className="w-full border rounded-md px-2 py-1" />
                </div>
                <div className='text-center'>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                >Update</button>
                </div>
                
              </form>
            )}
          </div>
        </div>
      )}
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
export default AllNote


