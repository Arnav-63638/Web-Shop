import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL :'http://localhost:8080'
})

const LoginPage = () => {   
  const history = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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

  return (
    <>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>
                  Login
                </button>
                <Link style={{'margin': '10px'}} to='/signup'>Signup</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
        {message}
    </div>
    </>
  );
};

export default LoginPage;
