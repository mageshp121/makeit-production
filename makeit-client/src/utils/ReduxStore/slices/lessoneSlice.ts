import { createSlice} from "@reduxjs/toolkit";






const lessonSlice = createSlice({
    name:'lesson',
    initialState:{
         lessoneDataOrder:1
    } ,
    reducers:{
        addLessone:(state)=>{
             state.lessoneDataOrder=state.lessoneDataOrder+1
        },
        clearLesson:(state)=>{
            state.lessoneDataOrder = 1
        },
    }

})


export const { addLessone,clearLesson} = lessonSlice.actions
export default lessonSlice.reducer; 