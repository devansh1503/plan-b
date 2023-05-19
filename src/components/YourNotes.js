import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function YourNotes() {
  const [data, setData] = useState([])
  const [currNotes, setCurrNotes] = useState("")
  const search = useRef()
  const call = useCallback(() => {
    (async function () {
      await axios.get('http://localhost:6969/notes').then((res) => {
        setData(res.data)
      })
    })()
  }, [])
  useEffect(() => {
    (async function () {
      await axios.get('http://localhost:6969/notes').then((res) => {
        setData(res.data)
      })
    })()
  }, [])

  async function searchdata() {
    await axios.get(`http://localhost:6969/searchnotes/?search=${search.current.value}`).then((res) => {
      setData(res.data)
    })
  }

  const inpstl = {
    border: 'none',
    background: 'none',
    borderBottom: '2px solid white',
    padding: '10px',
    fontSize: '25px',
    color: 'white',
    width: '30vw'
  }
  return (
    <div>
      <div style={{ backgroundColor: 'black', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div style={{color:'white', fontSize:"25px", cursor:'pointer'}} onClick={()=>{call()}}>Your Notes</div>
        <button className='newnote'><Link to='/notes'>New Note +</Link></button>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input ref={search} style={inpstl} placeholder='Search Notes'></input>
          <div style={{ fontSize: '35px', cursor: 'pointer' }} onClick={searchdata}>🔍</div>
        </div>

      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: '60%' }}>
          {data.map((item) => {
            return <div onClick={() => {
              setCurrNotes(item)
            }} style={{ margin: '30px', cursor: 'pointer' }}>
              <h1 style={{ fontSize: '80px' }}>📝</h1>
              <p style={{ fontSize: '18px', width: '100px', color: 'white' }}>{item.title}</p>
            </div>
          })}
        </div>


        <div style={{
          height: '68vh',
          borderLeft: '2px solid white',
          padding: '30px',
          width: '50%',
          color: 'white',
          overflow: 'auto',
          backgroundColor: 'rgb(5,8,27)'
        }}>
          {
            (currNotes === "") ? <h1 style={{ color: 'white', fontSize: '70px' }}>YOUR NOTES</h1> : <div>
              <h1 style={{ marginBottom: '20px' }}>{currNotes.title}</h1>
              <p style={{ fontSize: '23px' }}>{currNotes.content}</p>
              <p style={{ color: 'rgb(30,144,255)', fontSize: '23px', marginTop: '20px' }}>{currNotes.userName}</p>
            </div>
          }
        </div>
      </div>

    </div>
  )
}

export default YourNotes
