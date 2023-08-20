// import { useEffect, useState } from "react";
// import Tutordetails from "./Tutordetails";
// import { getAllCourses } from "../../utils/api/methods/get";
// import Shimmer from "../common/Shimmer";

// const SingleCourseHome =  (prop:any)  => {
// // console.log(prop,'propsssss');

// //   const [courses, setCourses] = useState([]) as any;
// //   useEffect(() => {
// //     const fetData = async () => {
// //       const course: any = await getAllCourses();
// //       console.log(course.data);
// //       setCourses(course.data.slice(0,3));
// //     };
// //     fetData();
// //   }, []);






//   return (
//     <>
//     <div className="mt-4  h-[47rem]">
//       <div className="mx-auto sm:grid-cols-4  grid max-w-2xl grid-cols-1 overflow-auto gap-x-8 gap-y-16 pt-5  lg:mx-0 lg:max-w-none lg:grid-cols-3">
//         {courses?.length !== 0 ? (
//           courses?.map((course: any) => (
//             // <article
//             //   key={course?._id}
//             //   className="flex max-w-xl  flex-col items-start justify-between"
//             // >
//             //   <div className="rounded-lg mb-6">
//             //     <img
//             //       className="rounded-lg hover:shadow-xl"
                 
//             //       src={course?.thumbNailImageS3UrlKey}
//             //       alt="Thumbnail image"
//             //     />
//             //   </div>
//             //   <div className="flex items-center gap-x-4 text-xs">
//             //     <time dateTime="Mar 16, 2020" className="text-gray-500">
//             //       2020-03-16
//             //     </time>
//             //     <span className=" rounded-full bg-gray-50 px-3 py-1.5 shadow-md font-medium text-gray-600 hover:bg-gray-100">
//             //       {course?.Category}
//             //     </span>
//             //   </div>
//             //   <div className="group">
//             //     <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//             //       {course?.WorkingTitle}
//             //     </h3>
//             //     <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
//             //       {course?.Description}
//             //     </p>
//             //   </div>
//             //   <div className="flex w-[100%]">
//             //     <Tutordetails data={course?.tutorId} />
//             //     <div className="w-[25%]  ml-24">
//             //       <img
//             //         className="pt-4  w-16"
//             //         src="wired-outline-20-love-heart.gif"
//             //         alt="wishlist icon"
//             //       />
//             //     </div>
//             //   </div>
//             //   <div className="flex justify-start ml-2 w-[100%]">
//             //     <h3 className="text-2xl font-semibold leading-6 text-teal-600 group-hover:text-gray-600">
//             //       ₹ {course?.CoursePrice}
//             //     </h3>
//             //   </div>
//             //   <div className="w-[100%] flex mt-5 ">
//             //     <div className="w-[70%]">
//             //       <button className="hover:shadow-2xl bg-teal-600 items-center justify-center w-full py-4 font-semibold tracking-wide text-gray-100 rounded-lg">
//             //         Enroll now
//             //       </button>
//             //     </div>
//             //     <div className="w-[20%] h-14 ml-9 rounded-lg pl-3 border shadow-md border-gray-400">
//             //       <img
//             //         className="w-[80%] m"
//             //         src="shopping-bag.png"
//             //         alt="cart-image"
//             //       />
//             //     </div>
//             //     <div></div>
//             //   </div>
//             // </article>
//             <a href="#" className="group block">
//   <img
//     src="https://images.unsplash.com/photo-1592921870789-04563d55041c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
//     alt=""
//     className="h-[350px] w-full object-cover sm:h-[450px]"
//   />
//   <div className="mt-3 flex justify-between text-sm">
//     <div>
//       <h3 className="text-gray-900 group-hover:underline group-hover:underline-offset-4">
//         Small Headphones
//       </h3>
//       <p className="mt-1.5 max-w-[45ch] text-xs text-gray-500">
//         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nobis,
//         quia soluta quisquam voluptatem nemo.
//       </p>
//     </div>
//     <p className="text-gray-900">$299</p>
//   </div>
// </a>
//           ))
//         ) : (
//         <Shimmer/>
//         )}
//       </div>
//       <div className="bg-black mt-20 w-[100%] h-10">

// </div>
//     </div>
  
//    </>
//   );
  
// }

// export default SingleCourseHome;