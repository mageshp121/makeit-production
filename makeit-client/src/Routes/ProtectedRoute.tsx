
import { Route, Routes,Navigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UseSomthingWentWrong } from "../utils/toastify/toasty";

const ProtectedRoute = ({children}:{children:any}) => {
  const user = useSelector((stor:any) => stor?.token?.token); 
  if(!user) {
      UseSomthingWentWrong()
      return <Navigate to="/auth/login"  />
  }
return children

};


export default ProtectedRoute;


