
function HomeNabBottom() {
  return (
    <>
      <div className="pt-16">
        <div className="bg-gradient-to-r pl-8  overflow-hidden text-center  shadow-md  flex gap-4 w-auto h-[44rem]  from-green-300  to-teal-500 via-teal-400 sm:ws md:w-screen  ">
          <div className="rounded-full   w-[50%]  flex  ">
            <div className=" pt-7 mt-6 bg-slate-50/5 rounded-full">
              <img src="/banner-img-1.png" alt="" />
            </div>
          </div>
          <div className="h-[rem] p-8   mt-20 flex-auto">
            <div className=" h-[40%] mt-6 text-start  justify-start w-[100%]">
              {/* <h1 className="text-6xl mb-5  font-extrabold  text-white">
                Improve Your Online
              </h1> */}
              <h1 className="text-6xl mb-4 font-extrabold text-white">
                Learning Experience
              </h1>
              <h1 className="text-6xl font-extrabold text-white">
                Better Instantly{" "}
              </h1>
            </div>
            <div className=" text-start  h-[10%] w-[95%]">
              <h2 className="text-xl text-white">
                we have <span className="text-yellow-300">40k+</span> Online
                courses & <span className="text-yellow-300">500K+</span> Online
                registered student.
              </h2>
              <h2 className="text-xl text-white">
                Find your desired Courses from them.
              </h2>
            </div>
            <div className=" h-[13%]  flex mt-5 w-[100%]">
              <div className=" flex mb-5 -space-x-4">
                <img
                  className="w-10 h-10 border-2 rounded-full"
                  src="/images (2).jpeg"
                  alt=""
                />
                <img
                  className="w-10 h-10 border-2 rounded-full "
                  src="/photo-1633332755192-727a05c4013d.jpeg"
                  alt=""
                />
                <img
                  className="w-10 h-10 border-2 rounded-full "
                  src="/images (1).jpeg"
                  alt=""
                />
              </div>
              <div className=" pl-5 pt-2  felx-auto">
                <h1 className="text-xl text-white">
                  500K+ People already trusted us.
                  <span className="text-yellow-300 underline pl-2">
                    View course
                  </span>
                </h1>
              </div>
            </div>
            <div className=" h-[20%]  w-[100%] flex ">
              <div className="flex-auto  shape-1 animate-off-on">
                <img src="/shape-2.svg" alt="" />
              </div>
              <img src="/shape-3 (1).svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeNabBottom;
