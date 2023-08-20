

import { createSlice} from "@reduxjs/toolkit";




const lessonSlice = createSlice({
    name:'token',
    initialState:{
         token: ""
    } ,
    reducers:{
        addtoken:(state,action)=>{
             state.token = action.payload
        },
        cleartoken:(state)=>{
            state.token = ""
        },
    }

})

export const { addtoken,cleartoken} = lessonSlice.actions
export default lessonSlice.reducer; 