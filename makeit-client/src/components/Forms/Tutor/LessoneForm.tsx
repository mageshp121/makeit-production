import { useCourselessoneValidate } from "../../../utils/formvalidations/TurtorCourse/lessone";
import FormEror from "../../ErrorComponents/FormEror";

import { useSelector } from "react-redux";
import { CourseId, lessonState } from "../../../utils/types/types";
import { useDispatch } from "react-redux";
import {
  addLessone,
  clearLesson,
} from "../../../utils/ReduxStore/slices/lessoneSlice";

import { clearCourse } from "../../../utils/ReduxStore/slices/courseSlice";
import { ErrorComponent } from "../../ErrorComponents/ErrorComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  UseCommen,
  UseCommenError,
  UseSomthingWentWrong,
} from "../../../utils/toastify/toasty";
import { useAxiosePrivate } from "../../../utils/customHooks/hook";
import { Create_lessoneApi, Publish_Cours } from "../../../utils/api/endPoints/commen";

function LessoneForm() {
  const couseId = useSelector((store: CourseId) => store.course?.courseData);
  const lessones = useSelector(
    (store: lessonState) => store.lessone?.lessoneDataOrder
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivet = useAxiosePrivate();

  const courseid = [...couseId];
  const [control, setControl] = useState(0);
  const [errroMessage, setErrorMessage] = useState("");
  const { errors, handleSubmit, reset, register } = useCourselessoneValidate();

  useEffect(() => {
    if (!courseid[0]) {
      UseCommenError("Please Add course basic");
      navigate("/tutor/profile/courseBasic");
    }
  }, []);

  // lessone uploadiung form submit

  const fromSubmit = async (data: any) => {
    if (control === 0) {
      setControl(1)
      if (couseId.length > 0) {
        const formData:FormData = new FormData();
        formData.append("lessoneContent", data.lessoneContent[0]);
        formData.append("lessoneTitle", data.lessoneTitle);
        formData.append("lessoneOrder", lessones);
        formData.append("tutorId", "64acf4006742357551e55edd");
        formData.append("courseId", courseid[0]);
        const response: any = await axiosPrivet.post(Create_lessoneApi,formData,{headers:{'Content-Type': 'multipart/form-data'}})
        if (response.data) {
          dispatch(addLessone());
          setControl(0);
          reset();
          UseCommen(`succesfuly created your ${lessones} th lesson`);
        }
      } else {
        console.log("invalied");
        const message =
          "Alredy completed the upload or invalied credentials . If you want plaese create new Course OR Edite the current course ";
        setErrorMessage(message);
      }
    } else {
      UseCommenError("please wait course is adding ");
    }
  };

  // clearing course data from store
  const handleReredux = () => {
    dispatch(clearCourse());
    dispatch(clearLesson());
    navigate("/tutor/profile");
  };

  //publising the course
  const publishCourse = async () => {
    try {
      const response = await axiosPrivet.patch(Publish_Cours+courseid[0],{headers:{'Content-Type': 'multipart/form-data'}});
      if (!response) {
        UseSomthingWentWrong();
      } else {
        dispatch(clearCourse());
        dispatch(clearLesson());
        navigate("/tutor/profile");
      }
    } catch (error) {
      UseSomthingWentWrong();
    }
  };

  return (
    <>
      {errroMessage && (
        <ErrorComponent
          data={{ path: "/tutor/profile", Message: errroMessage }}
        />
      )}
      <FormEror errors={errors} />
      <div className="w-[100%] bg-white h-[30rem] ">
        <form onSubmit={handleSubmit(fromSubmit)}>
          <div className="w-[100%] bg-white h-[18rem] p-5 gap-2 grid grid-cols-1">
            <div className="h-auto mt-5">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Lessone title
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("lessoneTitle")}
                />
              </div>
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Upload lessones content
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="user_avatar_help"
                  type="file"
                  {...register("lessoneContent")}
                />
              </div>
              <div className="mb-5">
                <input
                  type="submit"
                  className="flex shadow-2xl bg-teal-600 items-center justify-center w-full py-4 mt-9 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg focus:shadow-outline focus:outline-none"
                />
              </div>
            </div>
          </div>
        </form>
        <div className="ml-5 mr-5">
          <div className="text-center">
            <button
              type="button"
              className="flex shadow-2xl bg-teal-600 items-center justify-center w-full py-4 mt-9 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg focus:shadow-outline focus:outline-none"
              data-hs-overlay="#hs-sign-out-alert"
            >
              Complet your Upload
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
                      className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-teal-700 font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-teal-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                      data-hs-overlay="#hs-sign-out-alert"
                      onClick={handleReredux}
                    >
                      Not yet
                    </button>
                    <button
                      type="button"
                      className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold  bg-teal-600 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:bg-teal-600 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                      data-hs-overlay="#hs-sign-out-alert"
                      onClick={publishCourse}
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
    </>
  );
}

export default LessoneForm;
