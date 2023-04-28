import React, { useRef, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Register(props) {
    axios.defaults.withCredentials = true
    const history = useNavigate();
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const email2 = useRef();
    const password2 = useRef();
    const confirm = useRef();
    const [reg,setReg] = useState({});
    const [log,setLogin] = useState({opacity:"0.4"});
    const [confrm, setConfirm] = useState(false);
    const [incomplete, setIncomplete] = useState(false);
    const [found, setFound] = useState(false);
    function onclickreg(){
        setReg({})
        setLogin({opacity:"0.4"})
    }
    function onclicklogin(){
        setLogin({})
        setReg({opacity:"0.4"})
    }
    async function register(){
      const data = {
        name:name.current.value,
        email:email.current.value,
        password:password.current.value,
        score:0,
        imgurl:"",
        rewardCollected:false,
      }
      if(data.name==='' || data.email==='' || data.password===''){
        setIncomplete(true)
        return;
      }
      console.log(data);
      await axios.post("https://todo-api-pi-silk.vercel.app/signup",data).then((res)=>{
        console.log(res.data)
        props.setUserData(res.data)
      })
      props.setLoggedIn(true)
      history('/')
    }

    async function login(){
      const data = {
        email:email2.current.value,
        password:password2.current.value
      }
      await axios.post("https://todo-api-pi-silk.vercel.app/login",data).then((res)=>{
        console.log(res.data)
        if(res.data==="not found"){
          setFound(true);
          return;
        }
        else {
          localStorage.setItem("email",email2.current.value)
          localStorage.setItem("password",password2.current.value)
          props.setUserData(res.data)
          props.setLoggedIn(true)
          history('/')
        }
      })
    }
    function confirmpassword(){
      if(password.current.value != confirm.current.value){
        setConfirm(true);
      }
      else{
        setConfirm(false);
      }
    }
  return (
    <div className='signup'>
      <div className='register' style={reg} onClick={onclickreg}>
        <h2 style={{color:'white'}}>Create A New Account</h2>
        <input ref={name} placeholder='Name'></input>
        <input ref={email} placeholder='email'></input>
        <input type='password' ref={password} placeholder='password'></input>
        <input type='password' ref={confirm} placeholder='confirm password' onChange={confirmpassword}></input>
        {confrm && <div style={{fontSize:'23px'}}>The Password doesn't match</div>}
        {incomplete && <div style={{fontSize:'23px'}}>A field is incomplete</div>}
        <button onClick={register}>Register</button>
      </div>
      <div className='register' style={log} onClick={onclicklogin}>
        <h2 style={{color:'white'}}>Login Here</h2>
        <input ref={email2} placeholder='email'></input>
        <input type='password' ref={password2} placeholder='password'></input>
        {found && <div style={{fontSize:'23px'}}>Invalid Credentials</div>}
        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default Register
