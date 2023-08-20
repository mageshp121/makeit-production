import React from 'react'
import NavSmall from '../../components/Navabar/NavSmall'
import { useSelector } from 'react-redux'
import { usersProp } from '../../utils/types/types'
import ProfileSection from '../../components/Profile/ProfileSection'
import { Outlet } from 'react-router-dom'
import Navbottom from '../../components/NavBottom/Navbottom'

function UserProfile() {
    const userdata:usersProp = useSelector((store:any)=>{
        return store.user.userData
       })
  return (
    <>
  <div className='h-[150rem]'>
     <NavSmall users={userdata}/>
     <Navbottom Title={"Profile"} subTitle={'explore your profile'}/>
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

export default UserProfile