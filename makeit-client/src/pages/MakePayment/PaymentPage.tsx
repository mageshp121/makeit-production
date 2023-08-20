import React from 'react'
import Makepayment from '../../components/PurchaseRelate/Makepayment'
import Navbottom from '../../components/NavBottom/Navbottom'
import Navbar from '../../components/Navabar/Navbar'
import { useSelector } from 'react-redux'
import { usersProp } from '../../utils/types/types'

const PaymentPage = () => {
    const userdata:usersProp = useSelector((store:any)=>{
        return store.user.userData
    });
  return (
    <>
      <div className='flex flex-col'>
       <div className='bg-blue-50 h-7'>
       <Navbar users={userdata}/>
       </div>
       <div className=''>
       <Navbottom />
       </div>
       <div className='  h-[71rem]'>
        <Makepayment />
       </div>
    </div>
   </>
  )
}

export default PaymentPage