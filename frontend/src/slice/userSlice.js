import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import CryptoJS from 'crypto-js'
// import config from  "../config/config"
// import axios from 'axios'

// export const getUserInfo = createAsyncThunk('auth/getUserInfo', async(token) => {
//     console.log(token, "token----");
//     const header = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     const response = await axios.get(`${config.URL}/user/info`, header)
//     if (response.data.success) {     
//         const bytes = CryptoJS.AES.decrypt(response.data.info, 'crypto-secret-key');
//         const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//         if (decryptedData.length > 0) {
//             return decryptedData
//         } else {
//             return [decryptedData]
//         }
        
//     } 
// })

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        userData: []
    },
    reducers: {
        userInfoRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        userInfoSuccess(state, action){
            return {
                loading: false,
                userData: action.payload
            }
        },
        userInfoFail(state, action){
            return {
                ...state,
                loading: false,
                userData:  action.payload
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(getUserInfo.pending,(state) => {
    //             state.loading = true
    //         })
    //         .addCase(getUserInfo.fulfilled,(state, action) => {
    //             state.loading = false
    //             state.userData = action.payload
    //         })
    //         .addCase(getUserInfo.rejected,(state, action) => {
    //             state.loading = false
    //             state.userData = action.payload
    //         })
    // }
})

export const {userInfoRequest, userInfoSuccess, userInfoFail} = userSlice.actions
export default userSlice.reducer;