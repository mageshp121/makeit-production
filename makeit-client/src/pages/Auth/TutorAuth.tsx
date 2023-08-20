import React from 'react'
import Navbar from '../../components/Navabar/Navbar'
import Navbottom from '../../components/NavBottom/Navbottom'
import { Outlet } from 'react-router-dom'

function TutorAuth() {
  return (
    <>
    <Navbottom Title={"Authentication"} subTitle={'create your tutor account'} />
    <Outlet/>
    </>
  )
}

export default TutorAuth