import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Todolist(props) {
  const day = props.day
  const[res,setRes] = useState([]);
  
  const history = useNavigate()
  const tsk = useRef()
  const des = useRef()
  const hrs = useRef()
  useEffect(()=>{
    async function fetchTodo(){
      const res = await axios.get(`https://todo-api-pi-silk.vercel.app/todo/${day}`)
      setRes(res.data)
    }
    fetchTodo()
  },[day, res])
  const addForm = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
  const todolist = {
    padding: "25px 25px",
    backgroundImage: "linear-gradient(to right, red, purple)",
    borderRadius: "25px",
    marginBottom: "20px",
    color: "white",
    height: "50 %",
    overflow: "auto"
  }
  const deleteDone = async()=>{
    await axios.get('https://todo-api-pi-silk.vercel.app/todo/deletedone')
  }
  const addnew = async(event)=>{
    event.preventDefault()
    const data = {
      id:0,
      status:false,
      task:tsk.current.value,
      des:des.current.value,
      hrs:hrs.current.value,
      day:props.day
    }
    await axios.post('https://todo-api-pi-silk.vercel.app/todo/addnew', data)
  }
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "40px", justifyContent: "center" }}>
      <div style={addForm}>
        <h2 style={{ color: "rgb(54, 54, 54);" }}>Add A Task ✨</h2>
        <form>
          <input ref={tsk} type="text" autocomplete="off" placeholder="Enter Task" class="inp" name="tsk" />
          <input ref={des} type="text" autocomplete="off" placeholder="Enter Description" class="inp" name="ds" />
          <input ref={hrs} type="text" autoComplete='off' placeholder='Enter Hours' class="inp" name="datetime" />
          <input onClick={addnew} type="submit" class="but" value="+ Add Task" />
        </form>
      </div>
      <div>
        <div className='todolist' style={todolist}>
          <h2>Day {props.day}</h2>
          <table>
            <tr>
              <th>Status</th>
              <th>Task</th>
              <th>Hours</th>
            </tr>
            {res.map((item)=>{
              return <tr>
                <td>{item.status?<div style={{cursor:'pointer'}} onClick={async()=>{
                  await axios.get(`https://todo-api-pi-silk.vercel.app/changestatus/${item.id}`)
                  history('/todo')
                  console.log('Clicked True')
                }}>👍</div>:<div style={{cursor:'pointer'}} onClick={async()=>{
                  await axios.get(`https://todo-api-pi-silk.vercel.app/changestatuscross/${item.id}`)
                  history('/todo')
                  console.log('clicked false')
                }}>❌</div>}</td>
                <td>
                  <div style={{fontSize:"25px"}}>{item.task}</div>
                  <div style={{fontSize:"16px"}}>{item.des}</div>
                </td>
                <td>{Math.round(item.hrs)}</td>
                <td><div>📝</div></td>
                <td><div style={{cursor:'pointer'}} onClick={
                  async() =>{
                    await axios.get(`https://todo-api-pi-silk.vercel.app/todo/delete/${item.id}`)
                  }
                }>🗑️</div></td>
              </tr>
            })}
          </table>
        </div>

        <div style={{display:"flex", justifyContent:"space-around"}}>
          <button className='but' onClick={deleteDone}>Delete Completed Task</button>
        </div>
      </div>
    </div>
  )
}

export default Todolist
