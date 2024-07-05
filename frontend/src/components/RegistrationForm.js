import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import { useNavigate } from "react-router-dom";
import config from '../config/config';

const RegistrationForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    'name': '',
    'email': '',
    'phone': '',
    'position': '',
    'gender': '',
    'password': '',
    'confirmPassword': ''
  })
  const [error, setError] = useState({})
  const [response, setResponse] = useState("")


  const handleInput = (e) => {
    const {name, value} = e.target
    setFormData(prev => ({...prev, [name]:value}))
  }

  const registerEmployee = async () => {
    const {name, email, phone, position, gender, password} = formData
    const data = {
      name,
      email,
      phone,
      position,
      gender,
      password
    }
    console.log(data, "data..");
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'crypto-secret-key').toString();
    console.log(encryptedData, "--encrypted");
    const response = await axios.post(`${config.URL}/user/register`, {encryptedData})
    const responseData = response.data
    if (responseData.success) {
      console.log(responseData);
      setFormData({
        'name': '',
        'email': '',
        'phone': '',
        'position': '',
        'gender': '',
        'password': '',
        'confirmPassword': ''
      })
      setResponse(JSON.stringify(responseData.message))
      navigate("/")

    }  else {
      setError(responseData.error)
    }
  }

  const validateForm = () => {
    const filedErrors = {}

    if (!formData.name) {
      filedErrors.name = "Name shound not be empty"
    } else if (!(formData.name.trim().match("^[a-zA-Z]*$"))) {
      filedErrors.name = "Name should not contain special character"
    }

    if (!formData.email) {
      filedErrors.email = "Email shound not be empty"
    } else if (!(formData.email.trim().match("[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}"))) {
      filedErrors.email = "Invalid email"
    }

    if (!formData.phone) {
      filedErrors.phone = "Phone number shound not be empty"
    } else if (!(formData.phone.match("^[0-9]{10}$"))) {
      filedErrors.phone = "Phone number should contain 10 digits"
    }

    if (!formData.position) {
      filedErrors.position = "Position shound not be empty"
    }

    if (!formData.password) {
      filedErrors.password = "Password shound not be empty"
    } else if (formData.password.length < 8) {
      filedErrors.password = "Password shound contain minimun 8 characters"
    }

    if (!formData.confirmPassword) {
      filedErrors.confirmPassword = "Confirm Password shound not be empty"
    } else if (formData.password !== formData.confirmPassword) {
      filedErrors.confirmPassword = "Password and Confirm Password should be same"
    }

    if (!formData.gender) {
      filedErrors.gender = "Gender shound not be empty"
    }

    return filedErrors

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setResponse("")
    setError({})
    
    const isErrorExist = validateForm()
    console.log(error, "submit");

    setError(isErrorExist)
    
    if (Object.keys(isErrorExist).length === 0) {
      registerEmployee()
    }
  }
  return (
    <>
    <h1>Registration Form</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor='name'>Name: </label>
            <input type='text' value={formData.name} placeholder='Enter name' name='name' id='name' onChange={handleInput}/>
            {error.name && <p style={{color: "red", fontSize: "12px", margin: "3px"}}>{error.name}</p>}
        </div>
        <br/>
        <div>
            <label htmlFor='email'>Email: </label>
            <input type='text' value={formData.email} placeholder='Enter email' name='email' id='email' onChange={handleInput}/>
            {error.email && <p style={{color: "red", fontSize: "12px", margin: "3px"}}>{error.email}</p>}
        </div>
        <br/>
        <div>
             <label htmlFor='phone'>Phone: </label>
             <input type='number' value={formData.phone} placeholder='Enter phonenumber' name='phone' id='phone' onChange={handleInput}/>
             {error.phone && <p style={{color: "red", fontSize: "12px", margin: "3px"}}>{error.phone}</p>}
        </div>
        <br/>
        <div>
            <label htmlFor='position'>Position: </label>
            <select value={formData.position} name='position' id='position' onChange={handleInput}>
              <option value="">--SELECT--</option>
              <option value="hr">HR</option>
              <option value="developer">Developer</option>
              <option value="admin">Admin</option>
              <option value="teamLead">Team Lead</option>
            </select>
            {error.position && <p style={{color: "red", fontSize: "12px", margin: "3px"}}>{error.position}</p>}
        </div>
        <br/>
        <div>
          <label>Gender:</label>
          <input type='radio' id='male' name='gender' value="male" checked={formData.gender === 'male'} onChange={handleInput}/>
          <label htmlFor='male'>Male</label>
          <input type='radio' id='female' name='gender' value='female' checked={formData.gender === 'female'} onChange={handleInput}/>
          <label htmlFor='female'>Female</label>
          {error.gender && <p style={{color: "red", fontSize: "12px", margin: "3px"}}>{error.gender}</p>}
        </div>
        <br />
        <div>
            <label htmlFor='password'>Password: </label>
            <input type='password' value={formData.password} name='password' id='password' onChange={handleInput}/>
            {error.password && <p style={{color: "red", fontSize: "12px", margin: "3px"}}>{error.password}</p>}
        </div>
        <br />
        <div>
            <label htmlFor='confirmPassword'> Confirm Password: </label>
            <input type='password' value={formData.confirmPassword} name='confirmPassword' id='confirmPassword' onChange={handleInput}/>
            {error.confirmPassword && <p style={{color: "red", fontSize: "12px", margin: "3px"}}>{error.confirmPassword}</p>}
        </div>
        <br/>
        <button type='submit'>Submit</button>
    </form>
    {error.length > 0 && <p style={{color: 'red'}}>{`error: ${error}`}</p>}
    {response && <p style={{color: 'green'}}>{`Status: ${response}`}</p>}
    </>
  )
}

export default RegistrationForm