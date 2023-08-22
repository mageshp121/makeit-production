import React from "react";

function SectionDownCourse() {
  return (
    <div className="h-[35rem] shadow-lg bg-white">
      <div className="flex flex-row   ">
        <div className="ml-12 mt-14  h-[29rem] p-2 gap-5 flex flex-col  w-[35%] flex-auto ">
          <div className="bg-white h-[10rem]">
            <div className=" w-[100%] flex pt-12 pl-10">
              <img className="h-28" src="/shape-3 (1).svg" alt="" />

              <img className="h-28 animate-bounce " src="/teaching-img-shape (1).png" alt="" />
            </div>
          </div>
          <div className="  pt-5 pl-10 h-[14rem] ">
            <h1 className="text-5xl font-semibold">
              Transform Your Life Through Online Education
            </h1>
            <h1 className="mt-2">
              Instructors from around the world teach millions of students on
              Makeit. We provide the tools and{" "}
            </h1>
            <h1>
              skills to teach what you love. And you can also achieve your goal
            </h1>
          </div>
        </div>
        <div className="p-9 h-[39rem] mr-8  overflow-hidden w-[20%] flex-auto">
          <div className=" bg-green-50 pt-10 pl-4 ml-4 h-[32rem]   rounded-full ">
            <img className="ml-11" src="/transform-img.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionDownCourse;
