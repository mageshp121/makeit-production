import { useNavigate, useParams } from "react-router-dom";
import { courseLessone ,getCoursebyId } from "../../utils/api/methods/get";
import { UseCommen, UseCommenError } from "../../utils/toastify/toasty";
import { useEffect, useState } from "react";
import Navbar from "../Navabar/Navbar";
import { useSelector } from "react-redux";
import { usersProp } from "../../utils/types/types";
import { useAxiosePrivate } from "../../utils/customHooks/hook";
import { Cart_Api } from "../../utils/api/endPoints/commen";




const SingleCourseView =   () => { 
const param:any = useParams();
console.log(param,'adsadasd');
const userdata: usersProp = useSelector((store: any) => {
  return store.user.userData;
});
const navigate = useNavigate()
const axiosPrivet = useAxiosePrivate()
const [lessone,setLessone] = useState() as any
const [course, setCourse] = useState() as any
useEffect(()=>{
   
    const fetchData = async () => {
        try {
            const lessoneRes:any = await courseLessone(param.id) 
            const courseRes:any = await getCoursebyId(param.id) 
            // Handling the fetched data 
           console.log(lessoneRes,' <= fetched lessones =>');
           console.log(courseRes,'<= courses =>');
           setCourse(courseRes);
           setLessone(lessoneRes);
        } catch (error) {
            const message ='something went wrong'
          UseCommen(message)
        }
       
      };
      fetchData();
},[]);


const handleAddtocart= async (courseId:string)=>{
  if(userdata._id){
    const requestData = {
      userId: userdata._id,
      cartProductId: courseId,
    };
    try {
      const response = await axiosPrivet.post(Cart_Api,requestData,{headers:{'Content-Type': 'application/json'}});
     console.log(response,'<= handleAddtocart =>');
    if(response.data.created || response.data.updated){
       return UseCommen("Corse added into cart")
    }else if(response.data.ProductPresent){
       UseCommenError("Sorry the Course is already present in the cart");
       return navigate(`/cart/${userdata._id}`)
    }else{
    }
    } catch (error) {
      return console.log(error,'errororor');
    }
  }else{
    navigate("/auth/login")
  }
 }

  return (
    <>
    <Navbar/>
    <div className="w-[100%] pt-32 overflow-auto flex gap-4 p-5 h-screen">
      <div className="flex-auto h-screen mb-5 p-2 w-[100%]">
        <div className="w-[100%]  flex-auto mb-3 h-[9rem] border border-white rounded-md shadow-md">
            <div className="flex flex-col bg-white  p-5 pl-10 ">
            <span className="text-xl font-bold">{course?.data.WorkingTitle}</span>
            <h1 className="mt-3 text-stone-500">{course?.data.ShortDescription}</h1>
            <div className="mt-4   flex-auto">
            <span className="font-bold">category:</span>    
            <span className="bg-white ml-2 shadow-md text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{course?.data.Category}</span>
            </div>
            </div>
        </div>
        <div className="w-[100%] border  flex-auto mb-3 h-[10rem] rounded-md shadow-md bg-white">
            <div className="flex flex-col  p-5 pl-10">
            <span className="text-xl font-bold">Description : </span>
            <h1 className="mt-3 ml-5 text-stone-500">{course?.data.Description}</h1>
            </div>
        </div>
        <div className="w-[100%]  flex-auto mb-3 h-auto rounded-md shadow-md bg-white">
        <div className="col-span-2 h-[18rem] p-5 pt-4 overflow-auto shadow-xl  rounded-xl bg-white row-span-7 col-start-4">
            {lessone?.data.map((lessone: any) => {
              return (
                <>
                  <div className="mb-3" key={lessone._id}>
                    <div className="h-[4rem] w-[34.rem] border shadow-md rounded-md bg-[#f3f2f0] border-slate-100  ">
                      <div className="flex justify-between">
                        <div className="pt-2 pl-3 ml-3  mt-3 mr-2  font-medium cursor-pointer rounded-md  ">
                          <div className="flex ml-3 flex-row gap-4"></div>
                          <div className="flex pl-1 flex-row gap-4">
                            <img
                              className="h-7"
                              src="/icons8-play-64.png"
                              alt=""
                            />
                            <span className="flex-2  text-xl ">
                              {lessone.lessoneTitle}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex-auto flex-row  w-[70%] h-[48rem] p-1">
        <div className="w-[1000] flex-1 rounded-md shadow-md border border-[#d7d5d1] bg-[#f3f2f0] mb-2 p-4 h-[22rem]">
          <div className="w-[1000] mb-1 flex-2 rounded-md    bg-slate-300 h-[15rem]">
            <img
              className="w-full rounded-md   h-full object-cover"
              src={course?.data.thumbNailImageS3UrlKey}
              alt="course image"
            />
          </div>
          <div className="w-[1000] p-5 flex  justify-between flex-2 h-[5rem]">
            <span className="text-2xl pt-3 text-teal-600"> ₹ {course?.data.CoursePrice}</span>
            <div className="flex    justify-between w-[10rem]">
                          <div className="w-[100%] ">
                            <button onClick={()=>{
                              console.log(course._id,'iddidididididid');
                              
                              handleAddtocart(course?._id)}
                              } className="hover:shadow-2xl ml-5 bg-teal-600 items-center justify-center w-full py-4 font-semibold tracking-wide text-gray-100 rounded-lg">
                              Add to Cart 
                            </button>
                          </div>
                          
                        </div>
          </div>
        </div>
        <div className="w-[1000] grid grid-rows-4  border border-[#d7d5d1] shadow-md p-5 gap-3 flex-2 rounded-md bg-[#f3f2f0] h-[15rem]">
          <span className="font-bold">What will learn</span>
          <div className="w-[100%] shadow-md p-1 rounded-md text-start flex justify-start ">
            <span className="ml-1 ">#</span>
            <h1 className="whitespace-pre-wrap text-stone-500  ml-5 break-all">
            {course?.data.WhatWilllearn1}
            </h1>
          </div>
          <div className="w-[100%] shadow-md p-1 rounded-md text-start flex justify-start ">
            <span className="ml-1 ">#</span>
            <h1 className="whitespace-pre-wrap ml-5 text-stone-500  break-all">
            {course?.data.WhatWilllearn2}
            </h1>
          </div>
          <div className="w-[100%] shadow-md p-1 rounded-md text-start flex justify-start ">
          <span className="ml-1 ">#</span>
            <h1 className="whitespace-pre-wrap ml-5 text-stone-500  break-all">
            {course?.data.WhatWilllearn2}
            </h1>
          </div>
          <div className="w-[100%]  shadow-md p-1 rounded-md text-start flex justify-start ">
          <span className="ml-1 ">#</span>
            <h1 className="whitespace-pre-wrap ml-5 text-stone-500  break-all">
            {course?.data.WhatWilllearn2}
            </h1>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SingleCourseView;
