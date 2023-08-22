import { Link, Outlet, Route,Routes } from 'react-router-dom'

import { ProtectedRoute } from '../Routes/ProtectedRoute'
import Register from '../components/Authentication/User/Register'
import Login from '../components/Authentication/User/Login'
// import Otp from '../components/Authentication/otp'

import Home from '../pages/Home/Home'
import OTP from '../components/Authentication/User/Otp'
import Auth from '../pages/Auth/Auth'
import { ErrorComponent } from '../components/ErrorComponents/ErrorComponent';
import SingleCourseView from '../components/Course/SingleCourseView.tutor'
import SingleCourse from '../pages/course/SingleCourse'
import UserProfile from '../pages/ProfilepageTutor/UserProfile'
import PurchasedCourses from '../components/useProfileRelsted/PurchasedCourses'
import ProfileUpdate from '../components/Forms/CommonForm/ProfileUpdate'
import ProfileImageUpdate from '../components/Forms/User/ProfileImageUpdate'
import { PurchaseHistory } from '../components/useProfileRelsted/PurchaseHistory'
import CartPage from '../pages/cart/CartPage'
import Makepayment from '../components/PurchaseRelate/Makepayment'
import PaymentPage from '../pages/MakePayment/PaymentPage'
import Lessoneview from '../pages/Lessone/Lessoneview'


function UserRouter() {
  return (
    <Routes>
      <Route path="auth/*" element={<Auth/>}>
        <Route index element={<Register />} />
        <Route path='login'element={<Login/>}/>
        <Route path='otp' element={<OTP/>}/>
        <Route path='*' element={<ErrorComponent data={{path:'/auth',Message:'Sorry the provided url is not valied'}} />}/>
      </Route>
      <Route path="/"  element={<ProtectedRoute path="/" element={<Home/>} />}/>
      <Route path="/single" element={<SingleCourse/>}/>
      <Route path='/cart/:id' element={<CartPage/>} />
      <Route path='/cart/payment' element={<PaymentPage/>} />
      <Route path='/profile' element={<UserProfile/>}>
      <Route index  element={<PurchasedCourses/>} />
      <Route path='profilebasic'  element={<ProfileUpdate/>} />
      <Route path='profileimage'  element={<ProfileImageUpdate/>} />
      <Route path='purchasehistory'  element={<PurchaseHistory/>} />
      </Route>
      <Route path="/lessone/:lessoneId" element={<Lessoneview/>}/>
   </Routes>
  )
}

export default UserRouter