import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './component/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from './component/Home';
import About from './component/About';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
    <div>
      <NoteState>
      <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Routes>
      </Router>
      </NoteState>
    </div>
    </>
  );
}

export default App;
