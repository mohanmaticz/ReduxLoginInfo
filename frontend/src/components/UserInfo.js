import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import ViewInfo from './ViewInfo';
import config from '../config/config'
// import { getUserInfo } from '../slice/userSlice';
import { getUserInfo } from '../actions/userAction';
import { useDispatch, useSelector } from "react-redux";


  const UserInfo = () => {
  const token = localStorage.getItem('jwtToken')
  const dispatch = useDispatch()
  const {userData} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [infoData, setInfoData] = useState([])
  const [viewData, setViewData] = useState({}) 
  const [response, setResponse] = useState("")
  const [error, setError] = useState("")
  const [image, setImage] = useState("")

  console.log(useSelector((state) => state.user), "--user response");

  useEffect(() => {
    const fetchData = async () => {
        if (!token) {
            navigate("/")
            return
        }
        dispatch(getUserInfo(token))
    }
    fetchData()
  }, [navigate, token])

  // const reloadData = async () => {
  //   const header = {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   }
  //   const response = await axios.get(`${config.URL}/user/info`, header)
  //   const responseData = response.data
  //   if (responseData.success) {     
  //       const bytes = CryptoJS.AES.decrypt(responseData.info, 'crypto-secret-key');
  //       const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  //       if (decryptedData.length > 0) {
  //           setInfoData(decryptedData)
  //       } else {
  //           setInfoData([decryptedData])
  //       }  
  //   }  else {
  //   setError(responseData.error)
  //   }
  // }

  const handleView = (item) => {
    setViewData(item)
  }

  const handleCancelView = () => {
    setViewData({})
  }

  const handleFile = (e, id) => {
    setError("")
    setResponse("")
    const imageFile = e.target.files[0]
    setInfoData(prev => prev.map(item => {
      if (item._id === id) {
          return {...item, ["avatar"]:imageFile }
      }
      return item
    }))
    setImage(imageFile)
  }

  const handleSave = async (userData) => {
    setError("")
    setResponse("")
    var formData = new FormData()
    for (var key in userData) {
      formData.append(key, userData[key])
    }

    const response = await axios.post(`${config.URL}/user/update/${userData._id}`, formData)
    const responseData = response.data
    if (responseData.success) {
      console.log(responseData.message);
      setResponse(responseData.message)
      }  else {
      console.log(responseData.error);
      setError(responseData.error)
      }

    // reloadData()
    setImage("")
  }
  
  return (
    <div>
    <h1>User Info</h1>
    {image && <img src={URL.createObjectURL(image)} style={{width: "200px"}} alt='preview' />}
    {error && <p style={{color: "red", fontSize: "16px", margin: "3px"}}>{error}</p>}
    {response && <p style={{color: "green", fontSize: "16px", margin: "3px"}}>{response}</p>}
    {Object.keys(viewData).length === 0 ? 
      (
        <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Gender</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {userData.map((item,index) => {
                return(
                    <tr key={index}>
                        <td>
                            <img src={`${config.URL}/images/${item.avatar}`} style={{width: "50px", height: "50px", borderRadius: "50%"}} alt='profile' />
                            <br/>
                            <input type='file' onChange={(e) => handleFile(e, item._id)}/>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.position}</td>
                        <td>{item.gender}</td>
                        <td>
                            {/* <button type='button'>Edit</button> */}
                            <button type='button' style={{marginRight: "10px"}} onClick={() => handleSave(item)}>Save</button>
                            <button type='button' onClick={() => handleView(item)}>View</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
    </table>
      )  : (
        <ViewInfo info={viewData} back={handleCancelView} />
      )
  }
    </div>
  )
  } 

export default UserInfo