import { useEffect, useState } from "react";
import Navbar from "../../components/Navabar/Navbar";
import { FetchLessons_With_Courseid } from "../../utils/api/endPoints/commen";
import { useAxiosePrivate } from "../../utils/customHooks/hook";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { usersProp } from "../../utils/types/types";

const Lessoneview = () => {
  const [lessons, setLessons] = useState([]) as any;
  const [lessonUrl, setLessoneUrl] = useState(null);
  const userdata: usersProp = useSelector((store: any) => {
    return store.user.userData;
  });

  const id = useParams();
  console.log(id, "idddddd");
  const axiosePrivate = useAxiosePrivate();
  // FetchLessons_With_Courseid
  useEffect(() => {
    let isMounted: boolean = true;
    const controler = new AbortController();
    const fn = async () => {
      try {
        const lessoneRes = await axiosePrivate.get(
          FetchLessons_With_Courseid + id.lessoneId,
          {
            signal: controler.signal,
          }
        );
        if (isMounted) {
          console.log(lessoneRes.data, "adsad");

          setLessons(lessoneRes.data);
          setLessoneUrl(lessoneRes.data[0].lessoneS3UrlKey);
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

  const handleLessoneChange = (lessoneUrl: any) => {
    setLessoneUrl(lessoneUrl);
  };
  console.log(lessonUrl, "lesson");

  return (
    <>
      <Navbar />
      <div className="pt-[5rem]">
        <div className="grid  p-5 grid-cols-5 grid-rows-7 gap-x-1 gap-2">
          <div className="col-span-3 pr-5 gap-2 h-[47rem] grid-row-2 row-span-4">
            {/* Video section */}
            <div className="h-[28rem] mb-3 m- shadow-xl rounded-md">
              <video
                key={lessonUrl}
                className="w-full  max-w-full rounded-md border border-gray-200 h-[28rem] r dark:border-gray-700"
                controls
              >
                {lessonUrl != null && (
                  <source
                    src={lessonUrl}
                    onError={(e: any) => {
                      console.error("Error loading video:", e.target.error);
                    }}
                    type="video/mp4"
                  />
                )}
                Your browser does not support the video tag.
              </video>
              <span></span>
            </div>
            {/* description section */}
            <div className="h-[19rem] rounded-lg shadow-lg bg-white ">
              <h1 className="pt-5 text-xl text-teal-600 font-bold underline underline-offset-4  pl-7">
                Description :{" "}
              </h1>
              <h1 className="pt-3 text-lg text-gray-600 font-bold pl-16">
                Microfrontends with React:Microfrontends with
                React:Microfrontends with React:Microfrontends with
                React:Microfrontends with
              </h1>
              <h1 className="pt-5 text-lg text-teal-600 font-bold underline underline-offset-4 pl-7">
                Tutor :{" "}
              </h1>
              <h1 className="pt-3 text-lg  text-gray-600 font-bold pl-16">
                Magesh
              </h1>
              <h1 className="pt-5 text-lg text-teal-600 font-bold underline underline-offset-4 pl-7">
                Category :{" "}
              </h1>
              <h1 className="pt-3 text-lg  text-gray-600 font-bold pl-16">
                Web dev
              </h1>
            </div>
          </div>
          {/* lessone section */}
          <div className="col-span-2 h-[28rem] p-5 overflow-auto shadow-xl  rounded-xl bg-white row-span-7 col-start-4">
            {lessons.map((lessone: any) => {
              return (
                <>
                  <div className="mb-3" key={lessone._id}>
                    <div className="h-[4rem] w-[34.rem] border shadow-md rounded-md bg-[#f3f2f0] border-slate-100  ">
                      <div className="flex justify-between">
                        <div className="pt-2 pl-3 ml-3  mt-3 mr-2  font-medium cursor-pointer rounded-md  ">
                          <div className="flex ml-3 flex-row gap-4"></div>
                          <div className="flex pl-1 flex-row gap-4">
                            <img
                              className="h-7"
                              src="/icons8-play-64.png"
                              alt=""
                            />
                            <span className="flex-2  text-xl ">
                              {lessone.lessoneTitle}
                            </span>
                          </div>
                        </div>
                        <div className="mt-5 mr-7">
                          <span
                            onClick={() =>
                              handleLessoneChange(lessone.lessoneS3UrlKey)
                            }
                            className="text-teal-600 underline cursor-pointer"
                          >
                            Click to watch
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          {/* */}
          <div
            className="h-[16rem] w-[35rem] rounded-lg pt-12 shadow-lg p-5
           bg-white "
          >
            <ul className="space-y-4 text-gray-500 list-disc list-inside dark:text-gray-400">
              <li className="text-xl  font-bold text-black">
                What Will learn
                <ol className="pl-5 mt-2 space-y-1 font-normal text-gray-500 text-lg list-decimal list-inside">
                  <li>
                  Develop a realistic human sounding chatbot who can take on almost any task
                  </li>
                  <li>
                  Integrate ChatGPT and Eleven Labs AI into any application
                  </li>
                  <li>
                  Creating maintainable and team effective components with Typescript
                  </li>
                </ol>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Lessoneview;
