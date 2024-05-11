import React from 'react'
import './CSS/Navbar.css'
import logo from '../Images/logo.png'

function Navbar() {
  return (<>
    <div id='navbar'>
        <div id='image' class='item'></div>
        <img id='logo' class='item' src={logo}></img>
        <div id='name' class='item'>Eduvation</div>
    </div>
  </>
    
  )
}

export default Navbar