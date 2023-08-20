import React, { useEffect, useState } from "react";
import {
  CourseUpload,
  useCourseBasicValidate,
} from "../../../utils/formvalidations/TurtorCourse/courseBasic";
import FormEror from "../../ErrorComponents/FormEror";
import { useDispatch } from "react-redux";
import { addCourse } from "../../../utils/ReduxStore/slices/courseSlice";
import { useNavigate } from "react-router-dom";
import { useAxiosePrivate } from "../../../utils/customHooks/hook";
import { Create_Course_Api } from "../../../utils/api/endPoints/commen";
import { UseCommenError } from "../../../utils/toastify/toasty";
import { useSelector } from "react-redux";
import {Category} from "../../../utils/api/endPoints/commen";

const CourseBasicForm = () => {
  const { errors, handleSubmit, register } = useCourseBasicValidate();
  const userdata:any = useSelector((store:any)=>{
   return store.user.userData
  });
  const [categories,setCategories] = useState([]) as any
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const axiosPrivet = useAxiosePrivate();
  useEffect(()=>{
       const getAllCategory =async () =>{
          const response:any =  await axiosPrivet.get(Category);
          setCategories(response.data)
       }
       getAllCategory()
  },[])
  const formSubmit = async (Data: CourseUpload) => {
    console.log(Data,'Form dataa');
    const formData = new FormData();
    formData.append('WorkingTitle',Data.WorkingTitle);
    formData.append('Category',Data.Category);
    formData.append('Description',Data.Description);
    formData.append('CoursePrice',Data.CoursePrice);
    formData.append('ShortDescription',Data.ShortDescription);
    formData.append('WhatWilllearn1',Data.WhatWilllearn1);
    formData.append('WhatWilllearn2',Data.WhatWilllearn2);
    formData.append('WhatWilllearn3',Data.WhatWilllearn3);
    formData.append('WhatWilllearn4',Data.WhatWilllearn4);
    formData.append('WhoIsThiscourseFor',Data.WhoIsThiscourseFor);
    formData.append('prerequesties1',Data.prerequesties1);
    formData.append('prerequesties2',Data.prerequesties2);
    formData.append('ThumbnailImage',Data.ThumbnailImage[0]);
    formData.append('tutorId',userdata._id)
    console.log(formData,'formDatatttttt');
    try {
      const response:any = await axiosPrivet.post(Create_Course_Api,formData,{headers:{'Content-Type': 'multipart/form-data'}})
      console.log(response,'response');
      console.log(response.data);
      dispatch(addCourse(response.data._id));
      navigate('/tutor/profile/courselesson')
    } catch (error:any) {
       if(error?.response?.status === 400){
        UseCommenError("please logi")
        navigate('/tutor/login') 
       } 
    }
  };
  return (
    <>
    <FormEror errors={errors}/>
    <div className="w-[100%] bg-white h-[51rem] ">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="w-[100%] bg-white  p-5 gap-2 grid grid-cols-2">
          <div className="h-auto mt-5">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Add a working titile
              </label>
              <input
                
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("WorkingTitle")}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select category
              </label>
              <select
                id="countries"
                {...register("Category")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option >Select one</option>
                {
                  categories.map((obj:any)=>{
                    return <>
                     <option>{obj.category}</option>
                    </>
                  })
                }
              </select>
            </div>
            <div className="mb-5 ">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                What will students learn in your course
              </label>
              <input
                id="email"
                {...register("WhatWilllearn1")}
                className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                {...register("WhatWilllearn2")}
                id="email"
                className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                {...register("WhatWilllearn3")}
                id="email"
                className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                {...register("WhatWilllearn4")}
                id="email"
                className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Course Price
              </label>
              <input
                {...register("CoursePrice")}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Upload thubmnail image
              </label>
              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="user_avatar_help"
                id="user_avatar"
                type="file"
                {...register("ThumbnailImage")}
              />
            </div>
          </div>
          <div className="h-auto mt-5">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Add course description
              </label>
              <textarea
                id="message"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
                {...register("Description")}
              ></textarea>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Add short description
              </label>
              <textarea
                id="message"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
                {...register("ShortDescription")}
              ></textarea>
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                What are the requirements or prerequisites for taking your
                course
              </label>
              <input
                {...register("prerequesties1")}
                id="email"
                className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <input
                {...register("prerequesties2")}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select category
              </label>
              <select
                id="countries"
                {...register("WhoIsThiscourseFor")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option>Beginer</option>
                <option>Intermediat</option>
                <option>Advanced</option>
              </select>
            </div>
            
          </div>
          
        </div>
        <div className="m-5 ">
        <input
          type="submit"
          className="flex  shadow-2xl bg-teal-600 items-center justify-center w-full py-4 mt-9 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg focus:shadow-outline focus:outline-none"
        />
        </div>
       
      </form>
    </div>
    </>
  );
};

export default CourseBasicForm;
