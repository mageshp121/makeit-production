import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navabar/Navbar'
import { usersProp } from '../../utils/types/types'
import { useSelector } from 'react-redux'
import Navbottom from '../../components/NavBottom/Navbottom'
import Cart from '../../components/PurchaseRelate/Cart'


const CartPage = ()  =>{
    const userdata:usersProp = useSelector((store:any)=>{
        return store.user.userData
    });
   
  return (
   <>
   <div className='flex flex-col'>
       <div className='bg-blue-50 h-7'>
       <Navbar />
       </div>
       <div className=''>
       <Navbottom />
       </div>
       <div className='  h-[48rem]'>
        <Cart />
       </div>
    </div>
   </>
  )
}

export default CartPage