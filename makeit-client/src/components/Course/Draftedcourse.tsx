import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FetchCourseData_With_TutorId,
  Publish_Cours,
} from "../../utils/api/endPoints/commen";
import { useAxiosePrivate } from "../../utils/customHooks/hook";
import { CourseId } from "../../utils/types/types";
import { useSelector } from "react-redux";
import { UseSomthingWentWrong } from "../../utils/toastify/toasty";
import { clearCourse } from "../../utils/ReduxStore/slices/courseSlice";
import { clearLesson } from "../../utils/ReduxStore/slices/lessoneSlice";
import { useDispatch } from "react-redux";

// import { useAxiosePrivate } from "../../utils/customHooks/hook";

const DraftedCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const userdata:any = useSelector((store:any)=>{
    return store.user.userData
   })
  const axiosPrivet = useAxiosePrivate();
  const dispatch = useDispatch();
  //   const publish = usePublilsh()
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted: boolean = true;
    const controler = new AbortController();
    const fn = async () => {
      const tutorId = userdata._id;
      try {
        const courseRes = await axiosPrivet.get(
          FetchCourseData_With_TutorId + tutorId,
          {
            signal: controler.signal,
          }
        );
        if (isMounted) {

          const draftedData = courseRes.data.filter(
            (course: { drafted: boolean }) => course.drafted
          );
          console.log(draftedData, "drafeteddtedeededed");
          setCourseData(draftedData);
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
  }, []);
  if (courseData) {
    console.log(courseData, "course data");
  }

  const publishCourse = async (id: string) => {
    try {
      const response = await axiosPrivet.patch(Publish_Cours + id);
      if (!response) {
        UseSomthingWentWrong();
      } else {
        dispatch(clearCourse());
        dispatch(clearLesson());
        navigate("/tutor/profile/drafted");
      }
    } catch (error) {
      UseSomthingWentWrong();
    }
  };

  return (
    <>
      {courseData.length > 0 ? (
        <div className="w-[100%] grid overflow-auto h-[60rem]    grid-cols-1 gap-5">
          {courseData &&
            courseData.map((item: any) => {
              return (
                <div className="block  p-8 border-gray-200 bg-black h-[33rem] hover:shadow-xl border rounded-lg ml-6 mr-6">
                  <div className="flex flex-row gap-5  ">
                    <Link to={`/tutor/profile/courseview/${item._id}`}
                    key={item._id}>
                    <div className=" mb-6 w-[95%] rounded-lg flex justify-center h-[18rem]  bg-center bg-no-repeat p-2 ">
                      <img
                        className=" h-[18rem] w-[55rem] rounded-lg "
                        src={item.thumbNailImageS3UrlKey}
                        alt=""
                      />
                    </div>
                    </Link>
                    <div className="flex flex-col  gap-3 justify-center">
                      <div className="">
                        <span className="inline-flex mr-5 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                          Drafted
                        </span>
                        <span className="inline-flex items-center rounded-md bg-cyan-50-400 px-2 py-1 text-xs font-medium text--700 ring-1 ring-inset ring-indigo-700-">
                          Category : {item.Category}
                        </span>
                      </div>
                      <span className="text-2xl ">{item.WorkingTitle}</span>
                      <h1 className="text-lg text-gray-600">
                        {item.ShortDescription}
                      </h1>
                      <span className="text-lg text-gray-600">
                        69,697 students enrolled
                      </span>

                      <div className="flex w-96  h-12 justify-between flex-row">
                        <span className="text-2xl mt-3 text-teal-600">
                          ₹{item.CoursePrice}
                        </span>

                        <div className="ml-5 mr-5">
                          <div className="text-center">
                            <button
                              data-hs-overlay="#hs-sign-out-alert"
                              className="py-2.5 px-4 w-28 inline-flex justify-center items-center gap-2 rounded-md border border-teal-600 font-medium bg-teal-700 text-white shadow-sm align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-teal-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                            >
                              Publish
                            </button>
                          </div>
                          <div
                            id="hs-sign-out-alert"
                            className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                          >
                            <div className="hs-overlay-open:mt-48  hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                              <div className="relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800">
                                <div className="absolute top-2 right-2">
                                  <button
                                    type="button"
                                    className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                                    data-hs-overlay="#hs-sign-out-alert"
                                  >
                                    <span className="sr-only">Close</span>
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
                                <div className="p-4 sm:p-10 text-center overflow-y-auto">
                                  <img
                                    className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full  "
                                    src="/wired-outline-1140-error.gif"
                                    alt=""
                                  />
                                  {/* End Icon */}
                                  <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                                    publish
                                  </h3>
                                  <p className="text-gray-500">
                                    Are you sure you want to publish the course?
                                  </p>
                                  <div className="mt-6 flex justify-center gap-x-4">
                                    <button
                                      type="button"
                                      className="  cursor-pointer py-2.5   px-4 inline-flex  justify-center items-center gap-2 rounded-md border text-red-700 border-red-700 font-medium   shadow-sm align-middle  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-teal-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                      data-hs-overlay="#hs-sign-out-alert"
                                    >
                                      Not Yet
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => publishCourse(item?._id)}
                                      className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold  bg-teal-600 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:bg-teal-600 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                      data-hs-overlay="#hs-sign-out-alert"
                                    >
                                      Publish
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="  pt-3 flex flex-col  gap-4">
                      <Link
                        to={`/tutor/profile/courseupdate/${item._id}`}
                        key={item._id}
                      >
                        <span className=" h-14 cursor-pointer py-2.5 w-full  px-4 inline-flex  justify-center items-center gap-2 rounded-md border text-red-700 border-red-700 font-medium   shadow-sm align-middle  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-teal-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                          Update Course Basic Info
                        </span>
                      </Link>
                      <Link to={`/tutor/profile/lessonupdate/${item._id}`} key={item._id}>
                        <span className=" h-14 cursor-pointer py-2.5 w-full  px-4 inline-flex  justify-center items-center gap-2 rounded-md border text-red-700 border-red-700 font-medium   shadow-sm align-middle  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-teal-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
                          Update Course Lesson
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <>
        {/* shimmer ui*/}
          <div className="ml-72  mt-32">
              <img  className="h-[20rem] " src="/empty-box.png" alt="" />
          </div>
            {/* shimmer ui end */}
        </>
      )}
    </>
  );
};

export default DraftedCourse;
