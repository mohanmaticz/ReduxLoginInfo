import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import loginReducer from "./slice/loginSlice"
import userReducer from "./slice/userSlice"


const reducer = combineReducers({
    login: loginReducer,
    user: userReducer
})

const store = configureStore({
  reducer,
})

export default store