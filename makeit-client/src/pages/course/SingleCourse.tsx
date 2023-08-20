import React from 'react'
import Navbar from '../../components/Navabar/Navbar'
import SingleCourseViewUser from '../../components/Course/singleCourseView.user'
import Navbottom from '../../components/NavBottom/Navbottom'
import { useSelector } from 'react-redux'
import { usersProp } from '../../utils/types/types'
import mixpanel from 'mixpanel-browser'

function SingleCourse() {
  const userdata:usersProp = useSelector((store:any)=>{
    return store.user.userData
   })
   mixpanel.track("Course page")
   
  return (
    <>
   
    <Navbar users={userdata}/>
    <Navbottom Title={"Courses"} subTitle={'Explore our courses'}/>
    <div className='pl-8 pt-24  h-[88rem] '>
    <SingleCourseViewUser/>
    </div>
    </>
      
  )
}

export default SingleCourse