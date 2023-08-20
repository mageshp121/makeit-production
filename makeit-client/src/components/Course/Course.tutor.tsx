import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FetchCourseData_With_TutorId } from "../../utils/api/endPoints/commen";
import { useAxiosePrivate } from "../../utils/customHooks/hook";
import { useSelector } from "react-redux";
// import { useAxiosePrivate } from "../../utils/customHooks/hook";

function Course() {
  const [courseData, setCourseData] = useState([]);
  const userdata:any = useSelector((store:any)=>{
    return store.user.userData
   })
 
  const axiosPrivet = useAxiosePrivate();
  const navigate = useNavigate();
  useEffect(() => {
    let isMounted: boolean = true;
    const controler = new AbortController();
    const fn = async () => {
      // const courseRes:any = await useAllCourses_by_tutorId(controler);
      const tutorId = userdata._id;
      try {
        const courseRes = await axiosPrivet.get(
          FetchCourseData_With_TutorId + tutorId,
          {
            signal: controler.signal,
          }
        );
        if (isMounted) {
          const publishedCourses = courseRes.data.filter(
            (course: { drafted: boolean }) => !course.drafted
          );
          setCourseData(publishedCourses);
        }
      } catch (error) {
        navigate("/tutor/login");
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
  return (
    <>
      <div className="w-[100%] grid h-[54rem] grid-cols-1 gap-5">
        {courseData &&
          courseData.map((item: any) => {
            return (
              <div className="block  p-8 border-gray-200 h-[29rem] overflow-hidden hover:shadow-xl border bg-white rounded-lg ml-6 mr-6">
                <div className="flex flex-row gap-5  ">
                  <Link
                    to={`/tutor/profile/courseview/${item._id}`}
                    key={item._id}
                  >
                    <div
                      className={`w-[28rem] rounded-md flex justify-center h-[16rem] bg-cover bg-center bg-no-repeat p-2 `}
                    >
                      <img className="rounded-md" src={item.thumbNailImageS3UrlKey} alt="" />
                    </div>
                  </Link>
                  <div className="flex flex-col  gap-3 justify-center">
                    <div className="">
                      <span className="inline-flex mr-5 items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Course Active
                      </span>
                      <span className="inline-flex items-center rounded-md bg-cyan-50-400 px-2 py-1 text-xs font-medium text--700 ring-1 ring-inset ring-indigo-700-">
                        Category : {item.Category}
                      </span>
                    </div>
                    <h1 className="text-2xl ">{item.WorkingTitle}</h1>
                    <h1 className="text-lg text-gray-600">
                      {item.ShortDescription}
                    </h1>
                    <div className="flex  h-12 justify-between flex-row">
                      <span className="text-2xl mt-8 text-teal-600">
                        ₹{item.CoursePrice}
                      </span>
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
    </>
  );
}

export default Course;
