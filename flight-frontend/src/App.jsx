import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import FlightRequestForm from './components/FlightRequestForm'; 
import Signup from './components/Signup';
import Login from './components/Login';
import InstructorDash from './components/InstructorDash';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';


function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);

  return (
    <BrowserRouter>
      <NavBar token={token}/>
      <div className="px-24 pb-16">
      <Routes>
        <Route path='/' element={<InstructorDash />}></Route>
        <Route path='/request-form' element={<FlightRequestForm />}></Route>
        <Route path='/dashboard' element={<InstructorDash />}></Route>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path='/signup' element={<Signup />}></Route>
      </Routes>
      </div>
      
    </BrowserRouter>
  )
}

export default App;
