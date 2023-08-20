import { Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import store from '../utils/ReduxStore/store/Store';
import { UseSomthingWentWrong } from '../utils/toastify/toasty';


  



const ProtectedRoute = ({children}:{children:any}) => {
    const user = useSelector((stor:any) => stor?.token?.token); 
    if(!user) {
        UseSomthingWentWrong()
        return <Navigate to="/tutor/login"  />
    }
 return children

};


export default ProtectedRoute;



