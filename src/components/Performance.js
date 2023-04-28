import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Progress from './Progress'

function Performance(props) {
  const [data, setData] = useState([])
  const [load, setLoad] = useState(true)
  const [reward, setReward] = useState(props.userdata.rewardCollected)
  useEffect(() => {
    async function getdata() {
      await axios.get('https://todo-api-pi-silk.vercel.app//todo/perform').then((res) => {
        setData(res.data)
        setLoad(false)
      })
    }
    getdata()
  }, [])

  async function addreward() {
    await axios.post('https://todo-api-pi-silk.vercel.app//score', {score:25});
    await axios.get('https://todo-api-pi-silk.vercel.app/reward')
    props.setUserData({...props.userdata, score:props.userdata.score+25, rewardCollected:true})
    setReward(true)
  }
  const percss = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
  const weekstl = {
    width: `${data[0]} %`,
    backgroundColor: 'orange'
  }
  const message = () => {
    if (data[0] <= 33) {
      return "OOPS! Let's try again 😓"
    }
    else if (data[0] > 33 && data[0] <= 66) {
      return "Nice, Let's improve more 😉"
    }
    else if (data[0] > 66 && data[0] <= 80) {
      return "Good Going! Let's take this to 100!😃"
    }
    else return "Well Done! You are the Gangster!!🔥😎"
  }
  return (
    <div className='per' style={percss}>
      {load && <div className='loader-5 center'></div>}
      {!load && <div className='daysdiv' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className='Daily'>
          <div className='day'>
            <h1>🎆 DAY 1</h1>
            <Progress width={data[1]}></Progress>
          </div>

          <div className='day'>
            <h1>🎃 DAY 2</h1>
            <Progress width={data[2]}></Progress>
          </div>

          <div className='day'>
            <h1>🦁 DAY 3</h1>
            <Progress width={data[3]}></Progress>
          </div>

          <div className='day'>
            <h1>🍕 DAY 4</h1>
            <Progress width={data[4]}></Progress>
          </div>
        </div>
        <div>
          <div className='day'>
            <h1>🌭 DAY 5</h1>
            <Progress width={data[5]}></Progress>
          </div>

          <div className='day'>
            <h1>⚡ DAY 6</h1>
            <Progress width={data[6]}></Progress>
          </div>

          <div className='day'>
            <h1>🌟 DAY 7</h1>
            <Progress width={data[7]}></Progress>
          </div>
        </div>
      </div>}

      {!load && <div className='Weekly'>
        <h1 style={{ color: 'rgb(255, 176, 30)' }}>Weekly Performance-</h1>
        <h1 style={{ color: 'orange', fontSize: '50px' }}>{Math.round(data[0])}%</h1>
        <div style={{ color: 'rgb(255, 176, 30)', fontSize: '35px' }}>{message()}</div>
        {
          (Math.round(data[0]) >= 75 && !reward) ? <button onClick={addreward} className='reward bounce'>🎊Reward</button> : <div></div>
        }
      </div>}
    </div>
  )
}

export default Performance
