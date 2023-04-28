import React, { useRef, useState } from 'react'
import axios from 'axios'

function Writenotes(props) {
  const [isUploaded, setUpload] = useState(false)
    const inpstyle = {
        backgroundColor:"rgb(59,59,59)",
        color:"white",
        border:"none",
        width:"100%",
        height:"70vh",
        paddingTop:"12px",
        paddingLeft:"12px",
        fontSize:"20px"
    }
    const titlestyle = {
      backgroundColor:"rgb(59,59,59)",
      color:"white",
      border:"none",
      width:"100%",
      height:"50px",
      paddingTop:"12px",
      paddingLeft:"12px",
      fontSize:"20px"
  }
  const butstyle = {
    border:'none',
    fontSize:'23px',
    color:'white',
    backgroundColor:'purple',
    padding:'10px'
  }
  const title = useRef()
  const content = useRef()

  async function handleUpload(){
    const data = {
      title:title.current.value,
      content:content.current.value,
      userName: props.userData.name,
    }
    await axios.post('https://todo-api-pi-silk.vercel.app/notes', data).then((res)=>{
      setUpload(true);
    })
  }
  return (
    <div className='write' style={{padding:"1%", height:""}}>
      <h2 style={{color:"white"}}>Write Notes</h2>
      <textarea ref={title} style={titlestyle} placeholder="Enter Title"></textarea>
      <textarea ref={content} style={inpstyle} placeholder='Enter Content'></textarea>
      <button style={butstyle} onClick={handleUpload}>Upload</button>
      {isUploaded && <div style={{color:'white'}}>Uploaded Successfully!</div>}
    </div>
  )
}

export default Writenotes
