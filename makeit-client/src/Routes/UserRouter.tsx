import { Link, Outlet, Route, Routes } from "react-router-dom";
import Register from "../components/Authentication/User/Register";
import Login from "../components/Authentication/User/Login";
// import Otp from '../components/Authentication/otp'

import Home from "../pages/Home/Home";
import OTP from "../components/Authentication/User/Otp";
import Auth from "../pages/Auth/Auth";
import { ErrorComponent } from "../components/ErrorComponents/ErrorComponent";
import SingleCourseView from "../components/Course/SingleCourseView.tutor";
import SingleCourse from "../pages/course/SingleCourse";
import UserProfile from "../pages/ProfilepageTutor/UserProfile";
import PurchasedCourses from "../components/useProfileRelsted/PurchasedCourses";
import ProfileUpdate from "../components/Forms/CommonForm/ProfileUpdate";
import ProfileImageUpdate from "../components/Forms/User/ProfileImageUpdate";
import { PurchaseHistory } from "../components/useProfileRelsted/PurchaseHistory";
import CartPage from "../pages/cart/CartPage";
import Makepayment from "../components/PurchaseRelate/Makepayment";
import PaymentPage from "../pages/MakePayment/PaymentPage";
import Lessoneview from "../pages/Lessone/Lessoneview";
import ProtectedRoute from "./ProtectedRoute";

function UserRouter() {
  return (
    <Routes>
      <Route path="auth/*" element={<Auth />}>
        <Route index element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="otp" element={<OTP />} />
        <Route
          path="*"
          element={
            <ErrorComponent
              data={{
                path: "/auth",
                Message: "Sorry the provided url is not valied",
              }}
            />
          }
        />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="/single" element={<SingleCourse />} />
      <Route path="/singleall/:id" element={ <SingleCourseView/>}/> 
      <Route
        path="/cart/:id"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <ProtectedRoute>
              <PurchasedCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="profilebasic"
          element={
            <ProtectedRoute>
              <ProfileUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="profileimage"
          element={
            <ProtectedRoute>
              <ProfileImageUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="purchasehistory"
          element={
            <ProtectedRoute>
              <PurchaseHistory />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route
        path="/lessone/:lessoneId"
        element={
          <ProtectedRoute>
            <Lessoneview />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default UserRouter;
