import React from 'react'

function Writenotes() {
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
  return (
    <div className='write' style={{padding:"1%", height:""}}>
      <h2 style={{color:"white"}}>Write Notes</h2>
      <textarea style={inpstyle}></textarea>
    </div>
  )
}

export default Writenotes
