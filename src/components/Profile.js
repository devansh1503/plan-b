import React, { useRef, useState } from 'react'
import Performance from './Performance'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Profile(props) {
  const [imgurl, setUrl] = useState(props.userdata.imgurl)
  const [file, setFile] = useState()
  const inputimg = useRef(null)
  const handleChange = async (event) => {
    setFile(event.target.files[0])
    const data = new FormData()
    data.append("file", event.target.files[0])
    data.append("upload_preset", "planbapplication")
    // data.append("cloud_name", "dklbu3ywu")

    const response = await fetch("https://api.cloudinary.com/v1_1/dklbu3ywu/image/upload", {
      method: "post",
      body: data,
      mode:'cors'
    })
    if(!response.ok){
      throw new Error('Upload failed')
    }
    const dat = await response.json();
    setUrl(dat.url)
    props.setUserData({...props.userdata, imgurl:dat.url})
    await axios.post("https://todo-api-pi-silk.vercel.app/image", { url: dat.url })
  }
  const editimg={
    width:'50px',
    position:'absolute',
    top:'38%',
    left:'26%'
  }
  const butstl = {
    backgroundColor:'tomato',
    borderRadius:'25px',
    padding:'10px',
    fontSize:'25px',
    border:'none',
    marginTop:'20px'
  }
  return (
    <div>
      <div className='details'>
        <img className='profileimg' style={{borderRadius:'50%', border:'solid 7px black'}} src={imgurl === "" ? 'https://cdn-icons-png.flaticon.com/512/6522/6522516.png' : imgurl}></img>
        <img src='https://cdn-icons-png.flaticon.com/512/182/182942.png' style={editimg}  onClick={() => inputimg.current.click()}></img>
        <input type='file' onChange={handleChange} ref={inputimg} style={{ display: 'none' }}></input>
        <div className='detail'>
          <div style={{ display: "flex", alignItems: "center" }}><h1>👤 Name:</h1><h1>{props.userdata.name}</h1></div>
          <div style={{ display: "flex", alignItems: "center" }}><h1>📧 Email:</h1><h1>{props.userdata.email}</h1></div>
          <div style={{ display: "flex", alignItems: "center" }}><h1>👾 Score:</h1><h1>{props.userdata.score}</h1></div>
          <div style={{ display: "flex", alignItems: "center" }}><button style={butstl}><Link to='/signup'>Logout</Link></button></div>
        </div>
      </div>
      <div className='performance'>
        <h1 style={{ margin: '20px', color: 'orange' }}>🔥 Your Performance</h1>
        <Performance userdata={props.userdata} setUserData={props.setUserData}></Performance>
      </div>
    </div>
  )
}

export default Profile
