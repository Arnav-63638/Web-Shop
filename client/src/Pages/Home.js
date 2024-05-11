import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Card from '../Components/Card'
import './CSS/Home.css'
// import { useNavigate } from 'react-router-dom'

const api = axios.create({
    baseURL :'http://localhost:8080',
    withCredentials: true
  })

function Home() {
    let [username, setUsername] = useState('')
    // let [auth, setAuth] = useState('')
    api.get('/')
        .then(res=>{if(res.data.auth) setUsername(res.data.username)})
    
    if(username===''){
        return (
            <Link to='/login'>Login</Link>
        )
    }
    else{
        return <>
            <Navbar />
            <div id='courses-box'>
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </>
    }
    
}

export default Home