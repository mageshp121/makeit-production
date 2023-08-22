import { Route,Routes } from 'react-router-dom'
import { ErrorComponent } from '../components/ErrorComponents/ErrorComponent';
import Register from '../components/Authentication/User/Register'
import Login from '../components/Authentication/User/Login'
import Auth from '../pages/Auth/Auth'
import CartPage from '../pages/cart/CartPage'
import Admin from '../pages/Admin/Admin'
import UserTutorCount from '../components/Admin/UserTutorCount'



import Category from '../components/Admin/Category'
import Adminlogin from '../pages/Admin/Adminlogin';
function AdminRoute() {
  return (
    <Routes>
    <Route path="auth/*" element={<Adminlogin/>}>
      <Route path='*' element={<ErrorComponent data={{path:'/auth',Message:'Sorry the provided url is not valied'}} />}/>
    </Route>
    <Route path="admin/*"  element={<Admin/>}>
    <Route   index element={<UserTutorCount/>}/>
    <Route   path='users' element={<UserTutorCount/>}/>
    <Route path='category' element={<Category/>} />
    <Route path='addcategory' element={<CartPage/>} />
    </Route>
 </Routes>
  )
}

export default AdminRoute