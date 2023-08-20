import { Link } from "react-router-dom";
import { usersProp } from "../../utils/types/types";
import { useEffect, useState } from "react";



function ProfileSection({users}:{users:usersProp}) {
  const [height,setHeight] = useState() as any
  useEffect(()=>{
    if(users?.roll === "tutor"){
      setHeight(35)
  }else{
    setHeight(30)
  }
  },[])


    // /profilebasic

  return (
    <>
      <div className={`flex rounded-2xl justify-center border w-80  bg-white hover:shadow-lg border-spacing-1   h-[${height}rem]`}>
        <div className="flex-row p-5 justify-center">
          <div className=" shadow-lg ml-10 cursor-pointer w-40 h-40  border rounded-full  overflow-hidden">
            <img className="" src={`${users?.s3ImageUrl}`}  />
          </div>
          <div className="flex  justify-center">
            <div className="mt-6 flex-row justify-center ">
              <div className="w-60 mt-1 flex justify-center h-11">
                <h1 className="text-lg">{users?.email}</h1>
              </div>
              <Link to={'profilebasic'}>
              <div className="w-60 mt-3  py-2 flex justify-center bg-[#faf7f3] border hover:scale-105 rounded-lg shadow-md  h-11">
               <h1 className="hover:text-teal-500 cursor-pointer">Profile</h1>
              </div>
              </Link>
              {
                users?.roll === "tutor" ? (
              <>
              <Link to={'/tutor/profile/courses'}>
              <div   className="w-60 mt-3  py-2 flex justify-center bg-[#faf7f3] border hover:scale-105 rounded-lg shadow-md  h-11">
              <h1  className="hover:text-teal-500 cursor-pointer">published courses</h1>
              </div>
              </Link>
              <Link to={'/tutor/profile/sales'}>
              <div   className="w-60 mt-3  py-2 flex justify-center bg-[#faf7f3] border hover:scale-105 rounded-lg shadow-md  h-11">
              <h1  className="hover:text-teal-500 cursor-pointer">Sales History</h1>
              </div>
              </Link>
              <Link to={'/tutor/profile/drafted'}>
              <div   className="w-60 mt-3  py-2 flex justify-center bg-[#faf7f3] border hover:scale-105 rounded-lg shadow-md  h-11">
              <h1  className="hover:text-teal-500 cursor-pointer">Drafted Courses</h1>
              </div>
              </Link>
              <Link to={'/tutor/profile/coursebasic'} >
              <div className="w-60 mt-4  py-2 flex justify-center  bg-teal-600 border hover:scale-105 rounded-lg shadow-md  h-11">
              <h1 className=" text-white  cursor-pointer">Create new course</h1>
              </div>
              </Link>
                </>
                ):(
                  <>
                  <Link to={'/profile/purchasehistory'} >
                  <div className="w-60 mt-4  py-2 flex justify-center  bg-[#faf7f3] border hover:scale-105 rounded-lg shadow-md  h-11">
                  <h1 className=" hover:text-teal-500  cursor-pointer">Purchase</h1>
                  </div>
                  </Link>
                  <Link to={'/profile'} >
                  <div className="w-60 mt-4  py-2 flex justify-center  bg-[#faf7f3] border hover:scale-105 rounded-lg shadow-md  h-11">
                  <h1 className=" hover:text-teal-500  cursor-pointer">My learnings</h1>
                  </div>
                  </Link>
                  </>
                  )
                }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileSection;
