import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './Pages/Login';
import Signup from './Pages/Signup'
import AddNote from './Pages/AddNote'
import AllNote from './Pages/AllNote';


function App() {
  return (
  <BrowserRouter>
   <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addnote" element={<AddNote />} />
        <Route path="allnote" element={<AllNote />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
