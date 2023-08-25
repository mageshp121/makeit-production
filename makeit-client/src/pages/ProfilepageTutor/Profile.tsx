import { useSelector } from 'react-redux'
import Navbar from '../../components/Navabar/Navbar'
import NavSmall from '../../components/Navabar/NavSmall'
import Navbottom from '../../components/NavBottom/Navbottom'
import ProfileSection from '../../components/Profile/ProfileSection'
import { Outlet } from 'react-router-dom'
import { usersProp } from '../../utils/types/types'



function Profile() {
  const userdata:usersProp = useSelector((store:any)=>{
    return store.user.userData
   })
  return (
    <>
    <div className=' h-[60rem]'>
    {/* <Navbar/> */}
    <NavSmall />
    <Navbottom Title={"Profile"} subTitle={'explore your profile'} />
    <div className='flex mt-8  ml-12'>
    <ProfileSection  users={userdata} />
   <div className='flex-auto overflow-auto justify-center mt-1 ml-8 mr-12 '>
     <Outlet/>
   </div>
    </div>
    </div>
    </>
  )
}

export default Profile