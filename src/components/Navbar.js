import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar(props) {
    const [drop, setDrop] = useState(false);
    const [stl, setStl] = useState({})
    const [bool, setBool] = useState(false)

    const onBurger = () => {
        if (!bool) {
            setStl({
                display: "flex",
                position: 'absolute',
                backgroundColor: '#282c34',
                top: "70px",
                left: "1%",
                borderBottomLeftRadius: "25px",
                boxShadow: "0px 0px 15px 5px black"
            })
        }
        else {
            setStl({})
        }
        setBool(!bool)
    }
    const navstyle = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundImage: "linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)",
        color: "#282c34",
        position: "sticky",
        top: "0%",
        padding: "15px",
        zIndex:'1000'
    }
    const ulstyle = {
        listStyleType: "none",
        display: "flex",
        alignItems: "center"
    }
    const linkstyle = {
        textDecoration: "none",
        color: "white",
        marginRight: "30px",
        fontSize: "18px"
    }
    const dropd = {
        backgroundColor: "rgb(252,0,252)",
        listStyleType: "none",
        display: (drop ? "block" : "none"),
    }

    return (
        <div style={navstyle}>
            <div className='burger' onClick={onBurger}><img style={{ width: '40px' }} src='https://icon-library.com/images/hamburger-icon-white/hamburger-icon-white-16.jpg'></img></div>
            <h1>🤔Plan B</h1>
            <div className='nav' style={stl}>
                <ul className='nav-ele' style={ulstyle}>
                    <li>
                        <Link to='/' style={linkstyle}>Weekly Planner</Link>
                    </li>
                    <li>
                        <div class="container" style={linkstyle}>
                            <div class="menu">
                                <button class="toggle" onClick={() => {
                                    setDrop(!drop)
                                }}>Daily Todo</button>
                                <ul style={dropd}>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={() => { props.setday(1) }}>Day 1</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={() => { props.setday(2) }}>Day 2</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={() => { props.setday(3) }}>Day 3</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={() => { props.setday(4) }}>Day 4</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={() => { props.setday(5) }}>Day 5</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={() => { props.setday(6) }}>Day 6</Link></li>
                                    <li class="list-item"><Link to='/todo' style={linkstyle} onClick={() => { props.setday(7) }}>Day 7</Link></li>
                                </ul>
                            </div>
                        </div>
                    </li>
                    <li>
                        <Link to='/backlog' style={linkstyle}>BackLog</Link>
                    </li>
                    <li>
                        <Link to='/yournotes' style={linkstyle}>Notes</Link>
                    </li>
                    {
                        props.isLoggedIn &&
                        <li>
                            <Link to='/profile' style={{...linkstyle,fontSize:'26px', color:'purple'}}>{props.userData.name}</Link>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar
