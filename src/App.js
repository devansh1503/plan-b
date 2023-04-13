import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Weekplan from './components/Weekplan';
import Todolist from './components/Todolist';
import Performance from './components/Performance';
import Backlog from './components/Backlog';
import Notes from './components/Notes';
import { useEffect, useState } from 'react';
import Register from './components/Register';
import axios from 'axios';

function App() {
  const [day, setDay] = useState(1);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({})
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} userData={userData} setday={setDay}></Navbar>
      <Routes>
        <Route path='/signup' element={<Register setLoggedIn={setLoggedIn} setUserData={setUserData}></Register>}></Route>
        <Route path='/' element={<Weekplan userData={userData} isLoggedIn={isLoggedIn}></Weekplan>}></Route>
        <Route path='/todo' element={<Todolist day={day}></Todolist>}></Route>
        <Route path='/performance' element={<Performance></Performance>}></Route>
        <Route path='/backlog' element={<Backlog></Backlog>}></Route>
        <Route path='/notes' element={<Notes></Notes>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
