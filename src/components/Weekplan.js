import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Weekplan(props) {
    const history = useNavigate()
    async function checkcookie() {
        axios.defaults.withCredentials = true
        await axios.get("https://todo-api-pi-silk.vercel.app/checkCookie").then((res) => {
            if (!props.isLoggedIn && res.data !== "exits") {
                console.log(res.data)
                history('/signup')
            }
            else {
                async function login() {
                    const data = {
                        email: localStorage.getItem("email"),
                        password: localStorage.getItem("password")
                    }
                    await axios.post("https://todo-api-pi-silk.vercel.app/login", data).then((res) => {
                        props.setUserData(res.data)
                        props.setLoggedIn(true)
                    })
                }
                login()
            }
        })
    }
            useEffect(() => {
                checkcookie()
            }, [])
            const [goals, setGoal] = useState([])
            const [load, setLoad] = useState(false)
            const [loadsub, setLoadsub] = useState(false)
            const [done, setDone] = useState(false)
            const goal = useRef()
            const time = useRef()
            const subtask = useRef()
            async function getdata() {
                const res = await axios.get('https://todo-api-pi-silk.vercel.app/goals')
                setGoal(res.data)
            }
            const call = useCallback(() => {
                getdata()
            }, [])
            useEffect(() => {
                getdata()
            },)
            const pagestyle = {
                padding: "2% 7%",
                color: "white",
                fontFamily: "sans-serif"
            }
            const addgoalcss = {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }
            const imgcss = {
                width: '40px'
            }
            const bottomcss = {
                margin: '30px',
                display: 'flex',
                alignItems: 'center'
            }
            const goalcss = {
                padding: "25px 25px",
                backgroundImage: "linear-gradient(to right, magenta, purple)",
                borderRadius: '25px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }
            const postreq = async (event) => {
                event.preventDefault()
                const subtsk = subtask.current.value.split(',')
                const newdata = {
                    'id': goals.length + 1,
                    'goal': goal.current.value,
                    'subtasks': subtsk,
                    'time': time.current.value,
                    'userId': props.userData._id,
                }
                async function postdata() {
                    setLoadsub(true)
                    await axios.post('https://todo-api-pi-silk.vercel.app/goals', newdata)
                    setLoadsub(false)
                }
                postdata()
            }
            const createtodo = () => {
                setLoad(true)
                async function createtodolist() {
                    await axios.get('https://todo-api-pi-silk.vercel.app/createtodo').then((res) => {
                        console.log(res.data)
                        setLoad(false)
                        setDone(true)
                    })
                }
                createtodolist()


                // history('/todo')
            }
            return (
                <div style={pagestyle}>
                    <div className='upper' style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <div className='welcome'>
                            <h1 style={{ fontSize: "60px" }} className='welcome'>Hi!🙋‍♂️ Welcome <br />
                                To Plan B
                            </h1>
                            <h3 style={{ fontSize: "30px" }}>
                                Here you can plan your weekly goals,<br />
                                in a really easy way!
                            </h3>
                        </div>

                        <div className='addgoal' style={addgoalcss}>
                            <h1 style={{ color: 'gold' }}>Add A Goal✨</h1>
                            <form>
                                <input ref={goal} type='text' placeholder='Enter your Goal' className='inp' name='goal'></input><br />
                                <input ref={subtask} type='text' placeholder='Enter sub-tasks(use comma)' className='inp'></input>
                                <input ref={time} type='text' placeholder='Estimated time (in hours)' className='inp' name='time'></input>
                                {/* <div>
                            <input type='radio' idName='1stp' value='1' name='priority' onClick={()=>{priority=1}}></input>
                            <label for='1stp'>1st Priority</label>
                            <input type='radio' idName='2stp' value='2' name='priority' onClick={()=>{priority=2}}></input>
                            <label for='2stp'>2nd Priority</label>
                            <input type='radio' idName='3stp' value='3' name='priority' onClick={()=>{priority=3}}></input>
                            <label for='3stp'>3rd Priority</label>
                        </div> */}
                                <div>
                                    <input type='submit' className='but' onClick={postreq}></input>
                                    {/* {loadsub && <div className='loader-5 center'></div>} */}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='listofgoals' style={goalcss}>
                        <h1 style={{ color: "magenta" }}>Goals</h1>
                        <table>
                            <tr>
                                <th>Goal Name</th>
                                <th>Time</th>
                            </tr>
                            {
                                goals.map((item) => {
                                    if (item === null) return <tr></tr>
                                    return <tr>
                                        <td>{item.goal}</td>
                                        <td>{item.time}</td>
                                        <td><button className='but' onClick={() => {
                                            async function deleteitem() {
                                                await axios.get(`https://todo-api-pi-silk.vercel.app/goals/delete/${item.id}`)
                                            }
                                            deleteitem()
                                        }}>🗑️ Delete</button></td>
                                    </tr>
                                })
                            }
                        </table>
                    </div>
                    <div style={bottomcss}>
                        <button onClick={createtodo} className='but' style={{ backgroundColor: "gold", color: "black" }}>✨Generate Todo Lists For The Week✨</button>
                        {load && <div className='loader-5 center'></div>}
                        {done && <img style={imgcss} src='https://cdn-icons-png.flaticon.com/512/7799/7799536.png'></img>}
                    </div>
                </div >
            )
        }

export default Weekplan
