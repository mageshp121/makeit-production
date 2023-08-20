import { configureStore  } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import courseSlice from "../slices/courseSlice";
import lessoneSlice from "../slices/lessoneSlice";
import tokenSlice from "../slices/tokenSlice"
import cartSlice from "../slices/cartSlice";


const store = configureStore({
    reducer:{
        user : userSlice,
        course:courseSlice,
        lessone:lessoneSlice,
        token : tokenSlice,
        cart:cartSlice
    }
});

export default store