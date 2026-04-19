import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'

let store = configureStore({
    reducer:{
        auth: authSlice,
    }
})
export default store