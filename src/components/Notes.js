import React from 'react'
import Drawing from './Drawing'
import Writenotes from './Writenotes'

function Notes(props) {
  const style = {
    display:"flex"
  }
  return (
    <div className='notes' style={style}>
      <Writenotes userData={props.userData}></Writenotes>
      <Drawing></Drawing>
    </div>
  )
}

export default Notes
