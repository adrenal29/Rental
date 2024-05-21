import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home"
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Seller from './pages/Seller';
import Buyer from './pages/Buyer';
function App() {
  const [count, setCount] = useState(0)
  const user=localStorage.getItem("email")
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage user={user}/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/seller' element={<Seller/>}></Route>
      <Route path='/buyer' element={<Buyer/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
