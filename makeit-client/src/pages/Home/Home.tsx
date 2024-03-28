import Navbar from "../../components/Navabar/Navbar";
import HomeNabBottom from "../../components/NavBottom/HomeNabBottom";
import CourseCard from "../../components/Course/CourseCard";
import CardUpper from "../../components/Commoncomponents/CardUpper";
import SectionDownCourse from "../../components/Commoncomponents/SectionDownCourse";
import SectionDown4 from "../../components/Commoncomponents/SectionDown4";
import { usersProp } from "../../utils/types/types";
import { useSelector } from "react-redux";
import mixpanel from "mixpanel-browser";
// import Chat from '../../components/Chat/Chat'

function Home() {
  const userdata: usersProp = useSelector((store: any) => {
    return store.user.userData;
  });
  // if (userdata._id) {
  //   mixpanel.track("User landed home afted authentication");
  // } else {
  //   mixpanel.track("Landing page");
  // }

  return (
    <>
      {/* <Chat/> */}
      <Navbar />
      <HomeNabBottom />
      <div className="w-full shadow-2xl flex gap-5 mt-3 h-64 p-5">
        <div className="w-[25%] flex-auto ">
          <div className="flex justify-end pl-8 pt-12">
            <img className="animate-bounce " src="/footer-shape-2.png" alt="" />
          </div>
        </div>
        <div className=" w-[75%] flex-auto pt-5   ">
          <div className="flex  ml-11 mt-11 flex-col gap-5 ">
            <h1 className="flex-auto font-extralight  text-5xl">
              Expand Your Career Opportunity
            </h1>
            <h1 className="ml-32 text-5xl font-extralight text-">
              With Our Courses
            </h1>
          </div>
        </div>
      </div>
      <div className=" py-24 sm:py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CardUpper />
          <div className="w-[100%] mt-32 border-t border-gray-200  h-[44rem]">
            <CourseCard />
          </div>
        </div>
        <div className="mt-3">
          <SectionDownCourse />
        </div>
        <div className="mt-5">
          <SectionDown4 />
        </div>
      </div>
    </>
  );
}

export default Home;
