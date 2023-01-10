import React from 'react'
import Drawing from './Drawing'
import Writenotes from './Writenotes'

function Notes() {
  const style = {
    display:"flex"
  }
  return (
    <div style={style}>
      <Writenotes></Writenotes>
      <Drawing></Drawing>
    </div>
  )
}

export default Notes
