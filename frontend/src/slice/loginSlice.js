import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import CryptoJS from 'crypto-js'
// import config from  "../config/config"
// import axios from 'axios'

// export const loginUser = createAsyncThunk('auth/loginUser', async(data) => {
//     console.log(data, "data----");
//     const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'crypto-secret-key').toString();
//     const response = await axios.post(`${config.URL}/user/login`, {encryptedData})
//     return response.data
// })

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loading: false,
        response: {}
    },
    reducers: {
        loginRequest(state, action){
            return {
                ...state,
                loading: true,
            }
        },
        loginSuccess(state, action){
            return {
                loading: false,
                response: action.payload
            }
        },
        loginFail(state, action){
            return {
                ...state,
                loading: false,
                response:  action.payload
            }
        }
    }
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginUser.pending,(state) => {
    //             state.loading = true
    //         })
    //         .addCase(loginUser.fulfilled,(state, action) => {
    //             state.loading = false
    //             state.response = action.payload
    //         })
    //         .addCase(loginUser.rejected,(state, action) => {
    //             state.loading = false
    //             state.response = action.payload
    //         })
    // }
})

// export const {loginAction} = loginSlice.actions;

export const {loginRequest, loginSuccess, loginFail} = loginSlice.actions
export default loginSlice.reducer;