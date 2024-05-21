import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "../styles/Login.scss"

function Login() {    

    const [email, setEmail] = useState("Enter email")
    const [password, setPassword] = useState("Enter Password")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("https://rental-kg16.onrender.com/login", { email, password })
        .then(result => {
            console.log(result)
            if(result.data.status === "Success" && result.data.userType=="seller"){
                localStorage.setItem("email",result.data.email)
                navigate("/seller")
            }else if(result.data.status === "Success" && result.data.userType=="buyer"){
                localStorage.setItem("email",result.data.email)
                navigate("/buyer")
            }
            else{
                navigate("/register")
                alert("You are not registered to this service")

            }
       
        })
        .catch(err => console.log(err))
    }

    const testSignIn=()=>{
        setEmail('test1@gmail.com')
        setPassword('123')
    }


  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded ">
            <h2><center>Login</center></h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input type="text" 
                    placeholder={email} 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0' 
                    onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input type="password" 
                    placeholder={password} 
                    name='password' 
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
                </form>
                <p style={{color:"red",cursor:"pointer"}} onClick={testSignIn}>Sign In with test credentials</p>
                <p>Don't have an account?</p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Sign Up
                </Link>
            
        </div>
    </div>
  );
}

export default Login;