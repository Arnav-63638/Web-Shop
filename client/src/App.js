import './App.css';
import Login from './Pages/Login.js'
import Signup from './Pages/Signup.js'
import Home from './Pages/Home.js'
import Test from './Pages/testLogin.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/test' element={<Test />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/' element={<Home />}/>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
