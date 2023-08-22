import { Link } from "react-router-dom";


const  CardUpper = () => {
  return (
    <div className="mx-auto w-[100%] h-32 border-t  border-gray-200    flex  justify-between lg:mx-0">
      <div className="pt-5 ">
        <p className="pb-5 text-lg leading-8 text-[#12B0BE]">
          Learn how to grow your skill with our expert courses.
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Find Yours
        </h2>
        <div className=" h-24  pt-7">
          <div>
            <Link to={ "/single" }>
            <span className="pt-3 pl-6 cursor-pointer text-white h-12 flex gap-4 w-44 ju bg-teal-600  shadow-2xl hover:scale-105    font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              View More Courses
            </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-0  mt-14  bg-slate-700 ">
        <img className="" src="/courses-shape (1).png" alt=""  />
      </div>
    </div>
  );
}

export default CardUpper;
