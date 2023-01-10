import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Weekplan from './components/Weekplan';
import Todolist from './components/Todolist';
import Performance from './components/Performance';
import Backlog from './components/Backlog';
import Notes from './components/Notes';
import { useState } from 'react';

function App() {
  const [day, setDay] = useState(1);
  return (
    <BrowserRouter>
      <Navbar setday={setDay}></Navbar>
      <Routes>
        <Route path='/' element={<Weekplan></Weekplan>}></Route>
        <Route path='/todo' element={<Todolist day={day}></Todolist>}></Route>
        <Route path='/performance' element={<Performance></Performance>}></Route>
        <Route path='/backlog' element={<Backlog></Backlog>}></Route>
        <Route path='/notes' element={<Notes></Notes>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
