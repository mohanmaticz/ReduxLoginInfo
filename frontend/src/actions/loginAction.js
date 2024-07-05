import CryptoJS from 'crypto-js'
import config from  "../config/config"
import axios from 'axios'
import { loginRequest, loginSuccess, loginFail } from '../slice/loginSlice'

export const login = (data) => async (dispatch) => {

    try {
        dispatch(loginRequest())
        console.log(data, "data----");
        const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'crypto-secret-key').toString();
        const response = await axios.post(`${config.URL}/user/login`, {encryptedData})
        dispatch(loginSuccess(response.data))
    } catch (error) {
        dispatch(loginFail(error.message))
    }

}