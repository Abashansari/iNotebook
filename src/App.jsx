import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState';
import NavBar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Register from './component/Register';

function App() {
  return (
    <NoteState>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
