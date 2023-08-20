import { useParams } from "react-router-dom";
import { courseLessone ,getCoursebyId } from "../../utils/api/methods/get";
import { UseCommen } from "../../utils/toastify/toasty";
import { useEffect, useState } from "react";




const SingleCourseView =   () => { 
const param:any = useParams();
const [lessone,setLessone] = useState() as any
const [course, setCourse] = useState() as any
useEffect(()=>{
   
    const fetchData = async () => {
        try {
            const lessoneRes = await courseLessone(param.id) 
            const courseRes = await getCoursebyId(param.id) 
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
},[])

  return (
    <div className="w-[100%] overflow-auto flex gap-4 p-5 h-[80rem]">
      <div className="flex-auto h-[80rem] mb-5 p-2 w-[100%]">
        <div className="w-[100%]  flex-auto mb-3 h-[12rem] border border-[#d7d5d1] rounded-md shadow-md bg-[#f3f2f0]">
            <div className="flex flex-col  p-5 pl-10 ">
            <span className="text-xl">{course?.data.WorkingTitle}</span>
            <h1 className="mt-3 text-stone-500">{course?.data.ShortDescription}</h1>
            <div className="mt-4  flex-auto">
            <span className="">category:</span>    
            <span className="bg-indigo-100 ml-2 shadow-md text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">{course?.data.Category}</span>
            </div>
            </div>
        </div>
        <div className="w-[100%] border border-[#d7d5d1] flex-auto mb-3 h-[15rem] rounded-md shadow-md bg-[#f3f2f0]">
            <div className="flex flex-col  p-5 pl-10">
            <span className="text-xl">Description</span>
            <h1 className="mt-3 text-stone-500">{course?.data.Description}</h1>
            </div>
        </div>
        <div className="w-[100%]  flex-auto mb-3 h-auto rounded-md shadow-md bg-[#f3f2f0]">
          <div id="accordion-collapse" data-accordion="collapse">
            <h2 id="accordion-collapse-heading-1">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                data-accordion-target="#accordion-collapse-body-1"
                aria-expanded="true"
                aria-controls="accordion-collapse-body-1"
              >
                <span>What is Flowbite?</span>
                <svg
                  data-accordion-icon=""
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-1"
              className="hidden"
              aria-labelledby="accordion-collapse-heading-1"
            >
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is an open-source library of interactive components
                  built on top of Tailwind CSS including buttons, dropdowns,
                  modals, navbars, and more.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out this guide to learn how to{" "}
                  <a
                    href="/docs/getting-started/introduction/"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    get started
                  </a>{" "}
                  and start developing websites even faster with components on
                  top of Tailwind CSS.
                </p>
              </div>
            </div>
            <h2 id="accordion-collapse-heading-2">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                data-accordion-target="#accordion-collapse-body-2"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-2"
              >
                <span>Is there a Figma file available?</span>
                <svg
                  data-accordion-icon=""
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-2"
              className="hidden"
              aria-labelledby="accordion-collapse-heading-2"
            >
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Flowbite is first conceptualized and designed using the Figma
                  software so everything you see in the library has a design
                  equivalent in our Figma file.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Check out the{" "}
                  <a
                    href="https://flowbite.com/figma/"
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Figma design system
                  </a>{" "}
                  based on the utility classes from Tailwind CSS and components
                  from Flowbite.
                </p>
              </div>
            </div>
            <h2 id="accordion-collapse-heading-3">
              <button
                type="button"
                className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                data-accordion-target="#accordion-collapse-body-3"
                aria-expanded="false"
                aria-controls="accordion-collapse-body-3"
              >
                <span>
                  What are the differences between Flowbite and Tailwind UI?
                </span>
                <svg
                  data-accordion-icon=""
                  className="w-3 h-3 rotate-180 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>
            <div
              id="accordion-collapse-body-3"
              className="hidden"
              aria-labelledby="accordion-collapse-heading-3"
            >
              <div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700">
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  The main difference is that the core components from Flowbite
                  are open source under the MIT license, whereas Tailwind UI is
                  a paid product. Another difference is that Flowbite relies on
                  smaller and standalone components, whereas Tailwind UI offers
                  sections of pages.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  However, we actually recommend using both Flowbite, Flowbite
                  Pro, and even Tailwind UI as there is no technical reason
                  stopping you from using the best of two worlds.
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Learn more about these technologies:
                </p>
                <ul className="pl-5 text-gray-500 list-disc dark:text-gray-400">
                  <li>
                    <a
                      href="https://flowbite.com/pro/"
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Flowbite Pro
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindui.com/"
                      rel="nofollow"
                      className="text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Tailwind UI
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
        <div className="w-[100%] flex-auto mb-3 h-[10rem] border border-[#d7d5d1] rounded-md shadow-md bg-[#f3f2f0]">      </div>
        <div className="w-[100%] flex-auto mb-3 h-[10rem] border border-[#d7d5d1] rounded-md shadow-md bg-[#f3f2f0]">     </div>
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
            <span className="text-2xl text-teal-600"> {course?.data.CoursePrice}</span>
            {
             course?.data.CoursePrice ? (
              <span className="inline-flex items-center hover:shadow-md rounded-md bg-red-300 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-green-600/20">
             Drafted
            </span>
             ) :(
              <span className="inline-flex items-center hover:shadow-md rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              Course Active
            </span>
             )
            }
            
          </div>
        </div>
        <div className="w-[1000] grid grid-rows-4  border border-[#d7d5d1] shadow-md p-5 gap-3 flex-2 rounded-md bg-[#f3f2f0] h-[15rem]">
          <span>What will learn</span>
          <div className="w-[100%] shadow-md p-1 rounded-md text-start flex justify-end ">
            <span className="ml-1 flex-auto">#</span>
            <h1 className="whitespace-pre-wrap text-stone-500 flex-auto break-all">
            {course?.data.WhatWilllearn1}
            </h1>
          </div>
          <div className="w-[100%] shadow-md p-1 rounded-md text-start flex justify-end ">
            <span className="ml-1 flex-auto">#</span>
            <h1 className="whitespace-pre-wrap text-stone-500 flex-auto break-all">
            {course?.data.WhatWilllearn2}
            </h1>
          </div>
          <div className="w-[100%] shadow-md p-1 rounded-md text-start flex justify-end ">
            <span className="ml-1 flex-auto">#</span>
            <h1 className="whitespace-pre-wrap text-stone-500 flex-auto break-all">
            {course?.data.WhatWilllearn3}
            </h1>
          </div>
          <div className="w-[100%]  shadow-md p-1 rounded-md text-start flex justify-end ">
            <span className="ml-1 flex-auto">#</span>
            <h1 className="whitespace-pre-wrap text-stone-500  flex-auto break-all">
            {course?.data.WhatWilllearn4}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCourseView;
