import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Backlog() {
  const [res, setRes] = useState([])
  const [load, setLoad] = useState(true)
  useEffect(()=>{
    async function fetchdata(){
      await axios.get('http://localhost:6969/todo/backlog').then((res)=>{
        setRes(res.data)
        setLoad(false)
      })
    }
    fetchdata()
  },[])
  const pagestyle = {
    padding: "2% 7%",
    color: "white",
    fontFamily: "sans-serif",
    display:"flex",
    justifyContent:"center",
}
  const todolist = {
    padding: "25px 25px",
    backgroundImage: "linear-gradient(to right, #8e2de2, #4a00e0)",
    borderRadius: "25px",
    marginBottom: "20px",
    color: "white",
    width:"fit-content",
    overflow: "auto"
  }
  return (
    <div style={pagestyle}>
      {load && <div className='loader-5 center'></div>}
      {!load && <div className='todolist' style={todolist}>
        <h1>Let's Be Done with this mate!😯</h1>
          <table>
            <tr>
              <th>Day</th>
              <th>Task</th>
              <th>Hours</th>
            </tr>
            {res.map((item)=>{
              return <tr>
                <td>{item.day}</td>
                <td>
                  <div>{item.task}</div>
                  <div>{item.des}</div>
                </td>
                <td>{Math.round(item.hrs)}</td>
              </tr>
            })}
          </table>
        </div>}
    </div>
  )
}

export default Backlog
