import React, { useEffect, useState ,useRef} from "react";
import { useParams } from "react-router-dom";
import {
  Create_lessoneApi,
  FetchLessons_With_Courseid,
} from "../../utils/api/endPoints/commen";
import { useAxiosePrivate } from "../../utils/customHooks/hook";
import { useCourselessoneValidate } from "../../utils/formvalidations/TurtorCourse/lessone";
import { UseCommen, UseSomthingWentWrong } from "../../utils/toastify/toasty";
import { useSelector } from "react-redux";

const Lessoneupdate = () => {
  const userdata:any = useSelector((store:any)=>{
    return store.user.userData
   })
 
    const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { id } :any = useParams();
  console.log(id,'idid');
  
  const axiosPrivet = useAxiosePrivate();
  console.log(id, "isidididid");
  const [lessons, setLessons] = useState([]) 
  const [newLessone, setNewlesson] = useState(false);
  const { errors, handleSubmit, register, reset } = useCourselessoneValidate();
  const { lessoneContent, lessoneTitle } = errors;
  const [isadded, setIsadded] = useState() as any;

  // FetchLessons_With_Courseid
  useEffect(() => {
    setIsadded(true);
    let isMounted: boolean = true;
    const controler = new AbortController();
    const fn = async () => {
      try {
        const lessoneRes = await axiosPrivet.get(
          FetchLessons_With_Courseid + id,
          {
            signal: controler.signal,
          }
        );
        if (isMounted) {
          console.log(
            lessoneRes,
            " <=l essone comminng   Lessoneupdate = () => { =>"
          );
          setLessons(lessoneRes.data);
          
        }
      } catch (error) {
        //   navigate("/tutor/login")
        console.log(error);
      }
    };
    fn();
    return () => {
      isMounted = false;
      controler.abort();
    };
  }, [newLessone]);

  
  const addnewLessone = async (data: any) => {
    console.log(data,'okooooo');
    console.log(lessons,'lessons');
    const lessonecopy:any = [...lessons];
    const order = lessonecopy.length
    
    if (isadded) {
      const formData = new FormData();
      formData.append("lessoneContent", data.lessoneContent[0]);
      formData.append("lessoneTitle", data.lessoneTitle);
      formData.append("lessoneOrder", order+1 );
      formData.append("tutorId",userdata._id );
      formData.append("courseId", id);
      console.log(data, "<= addnewLessone =>");
      setIsadded(false);
      const response: any = await axiosPrivet.post(
        Create_lessoneApi,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response, "responseeeee");

      if (response.status === 200) {
        UseCommen("lessone successfully ad")
        reset()
        if (closeButtonRef.current) {
            closeButtonRef.current.click();
          }
        setNewlesson(true);
      } else if (response.status === 400) {
        UseSomthingWentWrong();
        setTimeout(() => {
          setNewlesson(true);
        }, 6000);
      }
    }
  };
  return (
    <div className="w-full h-[65rem] p-5   rounded-md ">
      <div className="w-full flex ">
        <div className=" h-12  mr-14 bg-teal-600 cursor-pointer shadow-lg  w-72 flex justify-center pt-2  rounded-md  "
         data-hs-overlay="#hs-sign-out-alert">
          <span
            className="text-lg font-medium text-white"
           
          >
            Add New Lesson
          </span>
        </div>

        <>
          <div
            id="hs-sign-out-alert"
            className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
          >
            <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
              <div className="relative flex flex-col bg-[#f3f2f0] shadow-lg rounded-xl dark:bg-gray-800">
                <div className="absolute top-2 right-2">
                  <button
                  ref={closeButtonRef}
                    type="button"
                    onClick={()=>{
                        reset()
                    }}
                    className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                    data-hs-overlay="#hs-sign-out-alert"
                  >
                    <span  className="sr-only">Close</span>
                    <svg
                      className="w-3.5 h-3.5"
                      width={8}
                      height={8}
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4  sm:p-10 text-center overflow-y-auto">
                  <form onSubmit={handleSubmit(addnewLessone)} >
                    <div className="grid gap-y-4">
                      {/* Form Group */}
                      <div>
                        {/* <label className="text-black m-1 mb-5" htmlFor="">
                            Add new Intro
                          </label> */}
                         <div className="flex">


                        {lessoneTitle?.message ? (
                          <label className="text-red-600">
                            {lessoneTitle.message}
                          </label>
                        ) : (
                          <label className="text-black m-1 " htmlFor="">
                            Add new Intro
                          </label>
                        )}
                        </div>
                        <div className="relative">
                          <input
                            {...register("lessoneTitle")}
                            className="py-3 mt-2 px-4 block w-full shadow-md text-black border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex ">
                        {lessoneContent?.message ? (
                          <label className="text-red-600">
                            {lessoneContent.message.toString()}
                          </label>
                        ) : (
                          <label className="text-black m-1 " htmlFor="">
                           Add new lessone Content
                          </label>
                        )}
                        </div>
                        <div className="relative mb-5">
                          <input
                            type="file"
                            {...register("lessoneContent")}
                            className="mt-2 block w-full text-black bg-white shadow-md border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                          />
                        </div>
                      </div>
                      {/* End Form Group */}
                      <input
                        type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-teal-600 text-white focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <div className="w-full h-[55rem] mt-8  overflow-auto flex flex-col gap-5 p-8 rounded-md bg-white">
        {/* lessson section satart */}

        {lessons?.length !== 0 ? (
          lessons?.map((lesson: any) => (
            <>
              <div className="h-[13rem] flex flex-col p-5 gap-1 shadow-md rounded-md bg-[#f3f2f0]">
                <div className="h-[5rem] border shadow-md rounded-md bg-white border-slate-300  ">
                  <div className="flex justify-between">
                    <div className="pt-2 pl-3 ml-3  mt-3 mr-2  font-medium cursor-pointer rounded-md  ">
                      <div className="flex ml-3 flex-row gap-4">
                        <span className="text-xl">{lesson?.lessoneOrder}</span>
                        <span className="flex-2 text-xl ">
                          {lesson?.lessoneTitle}
                        </span>
                      </div>
                    </div>
                    <div className=" h-12 mt-4 mr-8   text-red-700 border-red-700 border font-medium cursor-pointer shadow-md  w-28 flex justify-center pt-2  rounded-md  ">
                      <span
                        className="text-lg  text-red  "
                        data-hs-overlay="#hs-modal-recover-account1"
                      >
                        Update
                      </span>
                      <>
                        {/* pop from modal start update lesson */}
                        <div
                          id="hs-modal-recover-account1"
                          className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                        >
                          <div className="hs-overlay-open:mt-60 hs-overlay-open:ml-[38rem] hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                            <div className="bg-[#f3f2f0] border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                              <div className="p-4 sm:p-7">
                                <div className="text-center">
                                  <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    Update Lesson
                                  </h2>
                                </div>
                                <div className="mt-5">
                                  {/* Form */}
                                  <form>
                                    <div className="grid gap-y-4">
                                      {/* Form Group */}
                                      <div>
                                        <label
                                          className="text-black m-1 mb-5"
                                          htmlFor=""
                                        >
                                          Add new Intro
                                        </label>
                                        <div className="relative">
                                          <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="py-3 mt-2 px-4 block w-full shadow-md text-black border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                          />
                                        </div>
                                        <p
                                          className="hidden text-xs text-red-600 mt-2"
                                          id="email-error"
                                        >
                                          Please include a valid email address
                                          so we can get back to you
                                        </p>
                                      </div>
                                      <div>
                                        <label
                                          className="text-black m-1 mb-5"
                                          htmlFor=""
                                        >
                                          update the lesson
                                        </label>
                                        <div className="relative">
                                          <input
                                            type="file"
                                            id="email"
                                            name="email"
                                            className="mt-2 block w-full text-black bg-white shadow-md border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                          />
                                        </div>
                                        <p
                                          className="hidden text-xs text-red-600 mt-2"
                                          id="email-error"
                                        >
                                          Please include a valid email address
                                          so we can get back to you
                                        </p>
                                      </div>
                                      {/* End Form Group */}
                                      <button
                                        type="submit"
                                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-teal-600 text-white focus:outline-none focus:ring-2  focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </form>
                                  {/* End Form */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* pop from modsl end update lesson */}
                      </>
                    </div>
                  </div>
                </div>
                <div className="h-[5rem] pt-5 pl-6 rounded-md border  border-slate-300 bg-white ">
                  <div className="flex pl-1 flex-row gap-4">
                    <img className="h-7" src="/icons8-play-64.png" alt="" />
                    <span className="flex-2 text-xl ">Video name</span>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <>
            <div>no data</div>
          </>
        )}

        {/* lessson section end */}
      </div>
    </div>
  );
};

export default Lessoneupdate;
