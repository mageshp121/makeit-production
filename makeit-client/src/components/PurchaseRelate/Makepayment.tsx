
import { useSelector } from "react-redux";
import { usersProp } from "../../utils/types/types";
import { useState } from "react";
import { useAxiosePrivate } from "../../utils/customHooks/hook";
import { GetRazorPayKet_Api, MakePayemnt_Api, Verify_Payment_Api } from "../../utils/api/endPoints/commen";
import { axiosPrivet } from "../../utils/api/baseUrl/axios.baseUrl";
import { useNavigate } from "react-router-dom";
import { UseCommen, UseCommenError } from "../../utils/toastify/toasty";
declare global {
  interface Window { // ⚠️ notice that "Window" is capitalized here
    Razorpay: any;
  }
}

const Makepayment = () => {
  const navigate = useNavigate()
  const [gatway,setPaymentGateway] = useState()
  const userdata:usersProp = useSelector((store:any)=>{
    return store.user.userData
    });
  const courseData = useSelector((store:any)=>{
    return store.cart.cartData
  })  

  const axiosePrivate = useAxiosePrivate()
console.log(courseData,'Coursedata from redux');
const arrayOfObjects = courseData.courses;
console.log(arrayOfObjects,'oject');

const newArray:any = []
arrayOfObjects.forEach((obj:any) => {
  const newObj = {
    courseId: obj._id,
    coursePrice: obj.CoursePrice,
    tutorId:obj.tutorId

  };
  newArray.push(newObj);
});
console.log(newArray);

const handlePaymentMethodChange=(event:any)=>{
  setPaymentGateway(event.target.value)
}



const initPayment = (data:any,razorPayId:any) => {
  console.log(data.amount,'emount');
  const price = data.amount
  const options = {
    key: razorPayId,
    amount: price*1000,
    order_id: data.id,
    handler: async (response:any) => {
      try {
        const {data} = await axiosPrivet.post(Verify_Payment_Api, response);
        if(data.paymentSuccess){
          UseCommen("your successfully enroled ");
          navigate("/profile");
        }else{
          UseCommenError("Payment failed try again");
        }
      } catch (error) {
        UseCommenError("Payment failed try again");
      }
    },
    theme: {
      color: "#3399cc",
    },
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};





const handleMakePayment= async ()=>{
   if(gatway){
    const option = {
      userId:userdata._id,
      courseDetails:[...newArray],
      totalemount:courseData.total,
      paymentGateway:gatway
}
 const response = await axiosePrivate.post(MakePayemnt_Api,option);
 console.log(response.data,'res dara');
 const orderData = response.data
 if(response.data.id){
   const response = await axiosPrivet.get(GetRazorPayKet_Api);
   const razorpayId = response.data
   initPayment(orderData,razorpayId)
 }
   }else{
    UseCommenError("Please Selcet the Payment Gateway")
   }
  
    
}

  return (
    <>
      <div className="ml-28 mr-28 mt-8 p-8 bg-white rounded-md h-[63rem]">
        <div className="ml-7 pt-5">
          <span className="underline text-3xl font-medium underline-offset-8 decoration-2 decoration-teal-500 dark:decoration-teal-600">
            You'r Cart
          </span>
        </div>
        <div className=" p-5 pt-16 grid grid-cols-2 gap-7">
          <div className="bg-[#f3f2f0] shadow-md border border-gray-100 p-5 gap-8 rounded-md  h-[51rem] w-[50rem] ">
          <div className="mt-7">
            <span className="ml-2   text-xl underline-offset-8 decoration-2 decoration-teal-500 underline">Select Payment method </span>
            </div>
            <div className="  mt-10 w-[47rem] p-2 pt-8 rounded-lg  bg-white shadow-md h-[11rem]">
              <div className="grid ml-6  space-y-2">
                <label
                  htmlFor="hs-vertical-radio-in-form"
                  className="max-w-xs flex p-3 border hover:border-teal-500  mb-4  w-full bg-white  border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <input
                    type="radio"
                    value={"Paytm"}
                    name="hs-vertical-radio-in-form"
                    className="shrink-0 mt-1 border-gray-200 rounded-full text-teal-600 pointer-events-none focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-teal-500 dark:checked:border-teal-500 dark:focus:ring-offset-gray-800"
                    id="hs-vertical-radio-in-form"
                    onChange={handlePaymentMethodChange}
                  />
                   <img className="h-6 ml-3" src="/razorpay (1).webp" alt="" />
                  <span className="text-sm mt-1 text-gray-500 ml-3 dark:text-gray-400">
                   Razorpay
                    <p />
                  </span>
                </label>
                {/* <label
                  htmlFor="hs-vertical-radio-checked-in-form"
                  className="max-w-xs flex p-3  w-full hover:border-teal-500 bg-white border border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <input
                    type="radio"
                    value={"Stripe"}
                    onChange={handlePaymentMethodChange}
                    name="hs-vertical-radio-in-form"
                    className="shrink-0 mt-0.5 border-gray-200 rounded-full text-teal-600 pointer-events-none focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-teal-500 dark:checked:border-teal-500 dark:focus:ring-offset-gray-800"
                    id="hs-vertical-radio-checked-in-form"
                  />
                  <img className="h-5 ml-3" src="/Stripe_logo_PNG1.png" alt="" />
                  <span className="text-sm text-gray-500 ml-3 dark:text-gray-400">
                     Stripe
                    <p />
                  </span>
                </label> */}
              </div>
            </div>
            <div className="mt-7">
            <span className="ml-2   text-xl underline-offset-8 decoration-2 decoration-teal-500 underline">You order Details</span>
            </div>
           
            <div className="overflow-hidden w-full  mt-5 h-[34rem] ">
             
              <div className="pt-5 overflow-auto rounded-lg  h-[26rem]">
              {
                arrayOfObjects.map((obj:any)=>{

                  
                   return <article className="rounded-xl  shadow-xl mb-10 border-2 border-gray-100 bg-white" key={obj._id}>
                   <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                     <a href="#" className="block shrink-0">
                       <img
                         alt="Speaker"
                         src="/icvgops1gqcosgv3dxde.jpg"
                         className="h-14 w-14 rounded-lg hover:scale-105 object-cover"
                       />
                     </a>
                     <div>
                       <h3 className="font-medium sm:text-lg">
                        <p>{obj.WorkingTitle}</p>
                       </h3>
                       <p className="line-clamp-2 text-sm text-gray-700"></p>
                       <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                         <div className="flex items-center gap-1 text-gray-500">
                           <svg
                             xmlns="http://www.w3.org/2000/svg"
                             className="h-4 w-4"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor"
                             strokeWidth={2}
                           >
                             <path
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                             />
                           </svg>
                           {/* <p className="text-xs">14 comments</p> */}
                         </div>
                         <span className="hidden sm:block" aria-hidden="true">
                           ·
                         </span>
                         <p className="hidden sm:block sm:text-xs sm:text-gray-500">
                           Created by
                           <a
                             href="#"
                             className="font-medium  ml-2 underline  hover:text-gray-700"
                           >
                             Magesh
                           </a>
                         </p>
                         
                       </div>
                       <p className="text-teal-600   font-medium text-lg">1500</p>
                      
                       </div>
                       
                    
                    
                   </div>
                 </article>
                })
              }
                
              </div>
            </div>
          </div>
          <div className="bg-[#f3f2f0] ml-60 shadow-md border p-2 border-gray-100 rounded-md h-[19rem] w-80">
            <div className=" w-full   pt-4 ml-4 mb-3  h-12">
              <p className="text-xl font-medium">Order Recap</p>
            </div>
            <div className="w-full  pl-2 gap-1 flex flex-col h-20">
              <div className="h-10  flex justify-between">
                <h1 className="ml-2 font-medium text-slate-500 mt-1">
                  Subtotal
                </h1>

                <h1 className="mr-2 font-medium text-slate-500 mt-1">₹ #</h1>
              </div>
              <div className="h-10  flex justify-between">
                <span className="ml-2 font-sm text-slate-500 mt-1">
                  Dicount
                </span>
                <span className="mr-2 font-sm text-slate-500 mt-1">₹ #</span>
              </div>
            </div>
            <div className=" w-full  flex justify-between  mb-3 mt-2 h-12">
              <span className="ml-4 font-semibold text-balck mt-1">
                Grand total
               
              </span>
              <span className="mr-2 font-sm text-black-500 mt-1">₹ { courseData.total}</span>
            </div>
            <div onClick={()=>handleMakePayment()} className="items-center">
              <span  className="pt-3 pl-24  cursor-pointer text-white h-12 flex gap-4 w-full ju bg-teal-600  shadow-2xl    font-medium rounded-lg text-md px-5 py-2.5 text-center  mb-2">
                Make Payemnt
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Makepayment;
