import './App.css';
import { Routes, Route } from "react-router-dom";
import LoginForm from './components/LoginForm';
import UserForm from './components/RegistrationForm';
import UserInfo from './components/UserInfo';
import axios from "axios";
import config from "./config/config";
import { useEffect, useState } from 'react';


function App() {
  const [corsRestrict, setCorsRestrict] = useState(false)
  useEffect(() => {
    const fetch = async() => {
    const response = await axios.get(`${config.URL}/check`)
    console.log("response", response);
    setCorsRestrict(response.data.success)
    }
    fetch()
  }, [])
  return (
    <div className='App'>
      {
      corsRestrict ?
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/register' element={<UserForm />} />
        <Route path='/info' element={<UserInfo />} />
      </Routes> :
      <>
        <p>Your are Restricted</p>
      </>   
      }
    </div>
  );
}

export default App;
