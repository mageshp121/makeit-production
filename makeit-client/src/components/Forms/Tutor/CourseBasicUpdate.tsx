import { useEffect, useState } from "react";
import FormEror from "../../ErrorComponents/FormEror";
import {
  CourseUpdate,
  useCourseBasicUpdateValidate,
} from "../../../utils/formvalidations/TurtorCourse/courseBasicupdate";
import { useNavigate, useParams } from "react-router-dom";
import { FetchCourse_By_Id, Update_course } from "../../../utils/api/endPoints/commen";
import { useAxiosePrivate } from "../../../utils/customHooks/hook";

const CourseBasicUpdate = () => {
  const [coursedata, setCourseData] = useState({}) as any;
  const { errors, handleSubmit,register,setValue} = useCourseBasicUpdateValidate();
  const params: any = useParams();
  const axiosPrivet = useAxiosePrivate();
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted: boolean = true;
    const controler = new AbortController();
    const fn = async () => {
      try {
        const courseRes: any = await axiosPrivet.get(
          FetchCourse_By_Id + params.id,
          {
            signal: controler.signal,
          }
        );
        console.log(
          courseRes,
          "<=  FetchLessons_With_Courseid+params.id,        =>"
        );
        isMounted && setCourseData(courseRes);
        // setValue("WorkingTitle",coursedata?.WorkingTitle)
        console.log(coursedata, "datattatatta");
      } catch (error) {
        console.log(error);
      }
    };
    fn();
    return () => {
      isMounted = false;
      controler.abort();
    };
  }, []);

  const formSubmit = async (Data: CourseUpdate) => {
    console.log(Data,'datrattatattata');
    
    console.log(Data, "Form dataa");
    const formData = new FormData();
    formData.append("WorkingTitle", Data.WorkingTitle);
    formData.append("Category", Data.Category);
    formData.append("Description", Data.Description);
    formData.append("CoursePrice", Data.CoursePrice);
    formData.append("ShortDescription", Data.ShortDescription);
    formData.append("WhatWilllearn1", Data.WhatWilllearn1);
    formData.append("WhatWilllearn2", Data.WhatWilllearn2);
    formData.append("WhatWilllearn3", Data.WhatWilllearn3);
    formData.append("WhatWilllearn4", Data.WhatWilllearn4);
    formData.append("WhoIsThiscourseFor", Data.WhoIsThiscourseFor);
    formData.append("prerequesties1", Data.prerequesties1);
    formData.append("prerequesties2", Data.prerequesties2);
    formData.append("ThumbnailImage", Data.ThumbnailImage[0]);
    formData.append("imageName", coursedata.data.imageName);
    formData.append("_id",coursedata.data._id)
    console.log(formData, "formDatatttttt");
    try {
       const response:any = await axiosPrivet.put(Update_course,formData,{headers:{'Content-Type': 'multipart/form-data'}})
        console.log(response,'response');
        if (response.data.matchedCount === 1) {
              navigate("/tutor/profile/drafted")
        }
    } catch (error: any) {
         if(error?.response?.status === 400){
          console.log(error,'errrrorororororor');
         }
    }
  };

  return (
    <>
      <FormEror errors={errors} />
      <div className="w-[100%] bg-white rounded-lg  h-[50rem] ">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="w-[100%] bg-white rounded-lg  p-5 gap-2 grid grid-cols-2">
            <div className="h-auto mt-5">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Add a working titile
                </label>
                <input
                  defaultValue={coursedata?.data?.WorkingTitle}
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("WorkingTitle")}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select category
                </label>
                <select
                  id="categoru"
                  defaultValue={coursedata?.data?.category}
                  {...register("Category")}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Germany</option>
                </select>
              </div>
              <div className="mb-5 ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  What will students learn in your course
                </label>
                <input
                  id=""
                  defaultValue={coursedata?.data?.WhatWilllearn1}
                  {...register("WhatWilllearn1")}
                  className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                  defaultValue={coursedata?.data?.WhatWilllearn2}
                  {...register("WhatWilllearn2")}
                  id=""
                  className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                  defaultValue={coursedata?.data?.WhatWilllearn3}
                  {...register("WhatWilllearn3")}
                  id=""
                  className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                  defaultValue={coursedata?.data?.WhatWilllearn4}
                  {...register("WhatWilllearn4")}
                  id=""
                  className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Course Price
                </label>
                <input
                  defaultValue={coursedata?.data?.CoursePrice}
                  {...register("CoursePrice")}
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload thubmnail image if you want to change the prev one
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
                  defaultValue={coursedata?.data?.Description}
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
                  defaultValue={coursedata?.data?.ShortDescription}
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
                  defaultValue={coursedata?.data?.prerequesties1}
                  {...register("prerequesties1")}
                  id=""
                  className="bg-gray-50 border mb-3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <input
                  defaultValue={coursedata?.data?.prerequesties2}
                  {...register("prerequesties2")}
                  id=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select category
                </label>
                <select
                  defaultValue={coursedata?.data?.WhoIsThiscourseFor}
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

export default CourseBasicUpdate;
