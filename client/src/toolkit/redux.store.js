import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './user.reducer.js'
import authSlice from './auth.reducer.js'


const rootReducer = combineReducers({
    auth: authSlice,
    user: userReducer
})

const store = configureStore({
    reducer: rootReducer
})

export {store}