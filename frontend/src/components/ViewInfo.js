import React from 'react'
import config from '../config/config'

const ViewInfo = (props) => {
  const {info, back} = props

  const handleBack = () => {
    back()
  }
  return (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Fields</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Avatar:</td>
                    <td><img src={`${config.URL}/images/${info.avatar}`} style={{width: "50px", height: "50px", borderRadius: "50%"}} alt='profile' /></td>
                </tr>
                <tr>
                    <td>Name:</td>
                    <td>{info.name}</td>
                </tr>
                <tr>
                    <td>Email:</td>
                    <td>{info.email}</td>
                </tr>
                <tr>
                    <td>Phone Number:</td>
                    <td>{info.phone}</td>
                </tr>
                <tr>
                    <td>Position:</td>
                    <td>{info.position}</td>
                </tr>
                <tr>
                    <td>Gender:</td>
                    <td>{info.gender}</td>
                </tr>
            </tbody>
        </table>
        <br/>
        <button type='button' onClick={handleBack}>Back</button>
    </div>
  )
}

export default ViewInfo