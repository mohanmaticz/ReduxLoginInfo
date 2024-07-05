import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
// import axios from 'axios'
// import CryptoJS from 'crypto-js'
// import config from "../config/config"
// import { loginAction } from '../slice/loginSlice';
// import { loginUser } from '../slice/loginSlice';
import { login } from '../actions/loginAction';
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {response} = useSelector((state) => state.login)
  const token = localStorage.getItem('jwtToken')
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState({})
  console.log(response, "--login response");

  useEffect(() => {
    const checkToken = () => {
      if (token) {
        navigate("/info")
        return
    }
    }
    checkToken()
  },[])

  useEffect(() => {
    const loginSuccess = () => {
      if (response.success) {
        localStorage.setItem('jwtToken', response.token)
        navigate("/info")
      } else if (response.success === false) {
        setError((prev) => ({...prev, response: response.error}))
      }
    }
    loginSuccess()
  },[response])

  const submitLoginForm = async () => {
      const userInfo = {
        "email": userData.email,
        "password": userData.password,
      }
      dispatch(login(userInfo))
    }

  const handleInput = (e) => {
    const {name, value} = e.target
    setUserData(prev => ({...prev, [name]:value}))
  }

  const validateForm = () => {
    const filedErrors = {}
    if (!userData.email) {
        filedErrors.email = "Email shound not be empty"
      } else if (!(userData.email.trim().match("[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}"))) {
        filedErrors.email = "Invalid email"
      }
    
    if (!userData.password) {
    filedErrors.password = "Password shound not be empty"
    }
    return filedErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError({})
    
    validateForm()
    const isErrorExist = validateForm()
    console.log(error, "submit");

    setError(isErrorExist)
    
    if (Object.keys(isErrorExist).length === 0) {
      submitLoginForm()
    }
  }

  const handleRegister = () => {
    navigate("/register")
  }

  return (
    <>
    <h1>Login Form</h1>
    <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor='email'>Email: </label>
      <input type='text' value={userData.email} placeholder='Enter email' name='email' id='email' onChange={handleInput} />
      {error.email && <p style={{color: "red", fontSize: "12px", margin: "3px"}}>{error.email}</p>}
    </div>
    <br/>
    <div>
      <label htmlFor='password'>Password: </label>
      <input type='password' value={userData.password} name='password' id='password' onChange={handleInput} />
      {error.password && <p style={{color: "red", fontSize: "12px", margin: "3px"}}>{error.password}</p>}
    </div>
    <br />
    <button type='submit'style={{marginRight: "10px"}}>Login</button>
    <button type='submit' onClick={handleRegister}>Register</button>
    {error.response && <p style={{color: "red", fontSize: "12px", margin: "3px"}}>{error.response}</p>}
    </form>
    </>
  )
}

export default LoginForm