import { Link } from "react-router-dom";
import { usersProp } from "../../utils/types/types";
import mixpanel from "mixpanel-browser";
import { useLogout } from "../../utils/customHooks/hook";
import { useEffect, useState } from "react";
import { set } from "animejs";
import { useSelector } from "react-redux";
import { object } from "zod";

function Navbar() {
  const logout = useLogout();
  const [log,setLog]=useState(false);
  const users:usersProp = useSelector((store:any)=>{
    return store.user.userData
   })
console.log(users,"users data form ");

  useEffect(()=>{

  },[log])
  const catchEvent=()=>{
    mixpanel.track("Clicked course Search")
  };
  const handleLoguot=()=>{
        setLog(true);
        logout();

  }
 


  return (
    <>
    <nav className="bg-white p-0  fixed  right-0 left-0  shadow-xl border-gray-200  dark:bg-gray-900">
        <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="" className="  flex items-center">
            <img
              src="/connection-icon-13.jpg"
              className="h-8  bg-white mr-3"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MakeIt
            </span>
          </a>
          <div className="relative  hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >

                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <Link to={"/single"}>
            <input
              type="text"
              onClick={
                catchEvent
              }
              id="search-navbar"
              className="block w-[30rem] shadow-xl p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
              placeholder="Search Courses"
            />
            </Link>
          </div>
          
          <div className="flex items-center  md:order-2">
            {users?._id ? (
              <>
              <div className="hs-dropdown rounded-full overflow-hidden relative inline-flex">
                <button
                  id="hs-dropdown-with-dividers"
                  type="button"
                  className="hs-dropdown-toggle  inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                >
                 <img className="h-10 w-10 object-fill"  src={`${users.s3ImageUrl}`} alt=" profile image " />
                </button>
                <div
                  className="hs-dropdown-menu hidden shadow-lg transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 min-w-[15rem] bg-white border-gray-500  rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
                  aria-labelledby="hs-dropdown-with-dividers"
                >
                  <div className="py-2 first:pt-0 last:pb-0">
                  <Link to={'/profile'}
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                     
                    >
                     My Learnings
                     </Link>
                  </div>
                 
                  <div className="py-2 first:pt-0 last:pb-0">
                    {
                      users.roll === "tutor" ? <Link to={'/tutor/profile'}
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      
                    >
                      Account 
                    </Link> :    <Link to={'/profile'}
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      
                    >
                      Account 
                    </Link>
                    }
                 
                    <div
                      className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      onClick={handleLoguot}
                    >
                      Sign out
                    </div>
                  </div>
                </div>
              </div>
            </>
            
            ) : (
              <>
              <Link to={"/auth/login"}>
              
               <div className="">
             <span
        
            className="rounded-full  bg-teal-600 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <span aria-hidden="true">Sign in    →</span>
          </span>
        </div>
        </Link>
              </>
              
            )}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col font-medium p-1 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-500 md:p-0 md:dark:text-teal-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <Link 
                to={"/single"}
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-teal-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Courses
                </Link>
              </li>
              <li> 
                {
                  Object.keys(users).length === 0  ?  <Link to={'/tutor'}> <span className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-500 md:p-0 dark:text-white md:dark:hover:text-teal-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"> Become An instructor</span></Link> : <p className="text-green-500  underline underline-offset-2">Active  {users.roll === "tutor" ? "Tutor" :"User"} </p>                                                  
                }
                
              </li>
              <li className="">
              </li>
            </ul>
            {
              users._id && <Link to={`/cart/${users._id}`}>
              <div className="ml-4">
              <img className="h-12" src="/wired-outline-146-basket-trolley-shopping-card.gif" alt="" />
              </div>
              </Link>
            }
            
          </div>
        </div>
      </nav>

     
    </>
  );
}

export default Navbar;
