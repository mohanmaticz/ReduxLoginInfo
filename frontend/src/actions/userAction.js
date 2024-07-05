import CryptoJS from 'crypto-js'
import config from  "../config/config"
import axios from 'axios'
import { userInfoRequest, userInfoSuccess, userInfoFail } from '../slice/userSlice'

export const getUserInfo = (token) => async (dispatch) => {
    console.log(token, "--action token");
    try {
        dispatch(userInfoRequest())
        const header = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        const response = await axios.get(`${config.URL}/user/info`, header)
        if (response.data.success) {     
            const bytes = CryptoJS.AES.decrypt(response.data.info, 'crypto-secret-key');
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if (decryptedData.length > 0) {
                dispatch(userInfoSuccess(decryptedData))
            } else {
                dispatch(userInfoSuccess([decryptedData]))
            }
            
        }
    } catch (error) {
        dispatch(userInfoFail(error.message))
    }

}