import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './user.reducer.js'


const rootReducer = combineReducers({
    user: userReducer
})

const store = configureStore({
    reducer: rootReducer
})

export {store}