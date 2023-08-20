
import { Route, Routes,Navigate } from "react-router-dom";
import { useState } from "react";




export const ProtectedRoute= ({ path, element } : { path: string, element: JSX.Element }) => {
  const [currentUser] = useState(true);
  if (!currentUser) {
    return <Navigate to="/auth/login" />;
  }
  return <Routes><Route path={path} element={element} /></Routes>;
};




