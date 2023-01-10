import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
    const [drop, setDrop] = useState(false);
    const navstyle = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#282c34",
        color: "#00DBDE",
        position: "sticky",
        top: "0%",
        padding:"15px"
    }
    const ulstyle = {
        listStyleType: "none",
        display: "flex",
        alignItems:"center"
    }
    const linkstyle = {
        textDecoration: "none",
        color: "#FC00FF",
        marginRight: "30px",
        fontSize: "18px"
    }
    const dropd = {
        position:"absolute",
        top:"70%",
        backgroundColor:"#282c34",
        listStyleType:"none",
        display: (drop?"block":"none")
    }
    
    return (
        <div style={navstyle}>
            <h1>🤔Plan B</h1>
            <div>
                <ul style={ulstyle}>
                    <li>
                        <Link to='/' style={linkstyle}>Weekly Planner</Link>
                    </li>
                    <li>
                        <div class="container" style={linkstyle}>
                            <div class="menu">
                                <button class="toggle" onClick={()=>{
                                    setDrop(!drop)
                                }}>Daily Todo</button>
                                <ul style={dropd}>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={()=>{props.setday(1)}}>Day 1</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={()=>{props.setday(2)}}>Day 2</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={()=>{props.setday(3)}}>Day 3</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={()=>{props.setday(4)}}>Day 4</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={()=>{props.setday(5)}}>Day 5</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={()=>{props.setday(6)}}>Day 6</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={()=>{props.setday(7)}}>Day 7</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to='/backlog' style={linkstyle}>BackLog</Link>
                    </li>
                    <li>
                        <Link to='/performance' style={linkstyle}>Performance</Link>
                    </li>
                    <li>
                        <Link to='/notes' style={linkstyle}>Notes</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
