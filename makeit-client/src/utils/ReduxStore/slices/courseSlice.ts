import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { Course,CourseState } from "../../types/types";





const courseSlice = createSlice({
    name:'course',
    initialState:{
         courseData:[] as Course[]
    } as CourseState,
    reducers:{
        addCourse:(state,action:PayloadAction<Course>)=>{
             state.courseData.push(action.payload)
        },
        clearCourse:(state)=>{
            state.courseData = []
        },
    }

})


export const { addCourse,clearCourse} = courseSlice.actions
export default courseSlice.reducer; 