import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import axios from "axios";
import {Link} from 'react-router-dom'

const api = axios.create({
    baseURL: 'http://localhost:8080'
  })

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = () => {
    api.post('./signup', {username: username, password: password})
        .then(res=>setMessage(res.data.mes))
        .catch(err=>setMessage(err.message));
  };

  return (
    <>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
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
                <button type="button" className="btn btn-primary" onClick={handleSignup}>
                  Sign Up
                </button>
                <Link style={{'margin': '10px'}} to='/login'>Login</Link>
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

export default SignupPage;
