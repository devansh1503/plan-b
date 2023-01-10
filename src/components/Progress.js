import React from 'react'

function Progress(props) {
    const mainstyle = {
        width : '15vw',
        border: '3px solid black',
        borderRadius: '25px'
    }
    const style = {
        color:'white',
        width:`${props.width}%`,
        backgroundImage:'linear-gradient(to right, blue, purple)',
        borderRadius:'25px',
        fontSize:'20px',
        padding:'3px'
    }
  return (
    <div style={mainstyle}>
      <div style={style}>{Math.round(props.width)}%</div>
    </div>
  )
}

export default Progress
