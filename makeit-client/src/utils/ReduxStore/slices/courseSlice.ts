import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Course,CourseState } from "../../types/types";





const courseSlice = createSlice({
    name:'course',
    initialState:{
         courseData:[] as Course[]
    } as CourseState,
    reducers:{
        addCourse:(state,action:PayloadAction<Course>)=>{
            console.log(action.payload,'payloaddd');
             state.courseData.push(action.payload)
        },
        clearCourse:(state)=>{
            state.courseData = []
        },
    }

})


export const { addCourse,clearCourse} = courseSlice.actions
export default courseSlice.reducer; 