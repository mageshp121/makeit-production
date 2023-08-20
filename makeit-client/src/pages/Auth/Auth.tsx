import Navbottom from "../../components/NavBottom/Navbottom";
import Navbar from "../../components/Navabar/Navbar";
import { Outlet } from "react-router-dom";







const AuthPage = () => {
  return (
    <>
    <Navbottom Title={"Authenticaton"} subTitle={'create your acoount'} /> 
    <Outlet/>
    </>
  );
};
export default AuthPage
