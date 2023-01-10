import React from 'react'

function Progress(props) {
    const style = {
        color:'white',
        width:`${props.width}%`,
        backgroundImage:'linear-gradient(to right, blue, purple)',
        borderRadius:'25px',
        fontSize:'20px',
        padding:'7px'
    }
  return (
    <div className='progstyle'>
      <div style={style}>{Math.round(props.width)}%</div>
    </div>
  )
}

export default Progress
