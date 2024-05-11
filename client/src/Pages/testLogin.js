import React, { useState } from 'react'
import './CSS/testLogin.css'
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL :'http://localhost:8080'
})



function TestLogin() {

  let [logintext, setLogintext] = useState('0%')
  let [loginform, setLoginform] = useState('0%')
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const loginclicked = ()=>{
    setLogintext('0%');
    setLoginform('0%');
  }
  
  const signupclicked = ()=>{
    setLogintext('-50%');
    setLoginform('-50%');
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try{
        await api.post('/login', {username: username, password: password})
            .then(res=> {
                if(res.data.auth){
                    history('/')
                }
                else{
                    alert("Incorrect Username or Password");
                }
            })
            .catch(err=>setMessage(err.message));
    } catch(e){
        console.log(e);
    }
  };
  
  return (<>
    <div id='loginpagebody'>
      <div className="wrapper">
        <div className="title-text">
          <div style={{marginLeft: logintext}} className="title login">Login Form</div>
          <div className="title signup">Signup Form</div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input type="radio" name="slide" id="login" checked/>
            <input type="radio" name="slide" id="signup"/>
            <label htmlFor="login" onClick={loginclicked} className="slide login">Login</label>
            <label htmlFor="signup" onClick={signupclicked} className="slide signup">Signup</label>
            <div className="slider-tab"></div>
          </div>
          <div className="form-inner">
            <form style={{marginLeft: logintext}} action="#" className="login">
              <div className="field">
                <input type="text" value={username} onChange={handleUsernameChange} placeholder="Username" required/>
              </div>
              <div className="field">
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" required/>
              </div>
              <div className="pass-link"><a href="#">Forgot password?</a></div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" onClick={handleLogin} value="Login"/>
              </div>
            </form>
            <form action="#" className="signup">
              <div className="field">
                <input type="text" placeholder="Username" required/>
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required/>
              </div>
              <div className="field">
                <input type="password" placeholder="Confirm password" required/>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Signup"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default TestLogin