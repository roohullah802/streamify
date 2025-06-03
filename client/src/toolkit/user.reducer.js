import {createSlice} from '@reduxjs/toolkit';


const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        users: []
    },
    reducers: {
        setUser: (state, action)=>{
            state.users = action.payload
        },
        setLoading: (state, action)=>{
            state.isLoading = action.payload
        }
    }
})

export const {setUser, setLoading} = userSlice.actions
export default userSlice.reducer