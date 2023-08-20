import { useEffect, useState } from "react";
import Tutordetails from "./Tutordetails";
import { getAllCourses } from "../../utils/api/methods/get";
import Shimmer from "../common/Shimmer";
import { useSelector } from "react-redux";
import { usersProp } from "../../utils/types/types";
import { Cart_Api } from "../../utils/api/endPoints/commen";
import { UseCommen, UseCommenError } from "../../utils/toastify/toasty";
import { useNavigate } from "react-router-dom";
import { useAxiosePrivate } from "../../utils/customHooks/hook";



const CourseCard =  ()  => {
  const userdata:usersProp = useSelector((store:any)=>{
    return store.user.userData
   })
  const [courses, setCourses] = useState([]) ;
  const navigate = useNavigate()
  const axiosPrivet = useAxiosePrivate()
  useEffect(() => {
    const fetData = async () => {
      const course: any = await getAllCourses();
      console.log(course.data,'jkjk');
      if(course?.data?.length > 0  ){
        console.log("ok working");
        setCourses(course.data.slice(0,6));
        console.log(courses,'dsdsds');
      }else{
       
      }
      
    };
    fetData();
  }, []);




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
console.log(courses.length,'lengthhhh');



 return (
    <div className="mt-4 overflow-auto h-[44rem]">
      <div className="mx-auto sm:grid-cols-4  grid max-w-2xl grid-cols-1 overflow-auto gap-x-8 gap-y-16 pt-5  lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {courses.length > 0 ? (
          courses.map((course: any) => (
            <article
              key={course?._id}
              className="flex max-w-xl  flex-col items-start justify-between"
            >
              <div className="rounded-lg mb-6">
                <img
                  className="rounded-lg hover:shadow-xl"
                  src={course?.thumbNailImageS3UrlKey}
                  alt="Thumbnail image"
                />
              </div>
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="Mar 16, 2020" className="text-gray-500">
                  2020-03-16
                </time>
                <span className=" rounded-full bg-gray-50 px-3 py-1.5 shadow-md font-medium text-gray-600 hover:bg-gray-100">
                  {course?.Category}
                </span>
              </div>
              <div className="group">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                  {course?.WorkingTitle}
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {course?.Description}
                </p>
              </div>
              <div className="flex w-[100%]">
                <Tutordetails data={course?.tutorId} />
                <div className="w-[25%]  ml-24">
                  <img
                    className="pt-4  w-16"
                    src="wired-outline-20-love-heart.gif"
                    alt="wishlist icon"
                  />
                </div>
              </div>
              <div className="flex justify-start ml-2 w-[100%]">
                <h3 className="text-2xl font-semibold leading-6 text-teal-600 group-hover:text-gray-600">
                  ₹ {course?.CoursePrice}
                </h3>
              </div>
              <div className="w-[100%] flex mt-5 ">
                <div className="w-[70%]">
                  <button onClick={()=>handleAddtocart(course._id)} className="hover:shadow-2xl bg-teal-600 items-center justify-center w-full py-4 font-semibold tracking-wide text-gray-100 rounded-lg">
                  <span className="pr-2">✚</span> Add to Cart
                  </button>
                </div>
                <div className="w-[20%] h-14 ml-9 rounded-lg pl-3 border shadow-md border-gray-400">
                  <img
                    className="w-[80%] m"
                    src="shopping-bag.png"
                    alt="cart-image"
                  />
                </div>
                <div></div>
              </div>
            </article>
          ))
        ) : (
        <Shimmer/>
        )}
      </div>
    </div>
  );
  
}

export default CourseCard;