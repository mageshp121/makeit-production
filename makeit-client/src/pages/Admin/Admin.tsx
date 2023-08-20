import React from "react";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import { Outlet } from "react-router-dom";

function Admin() {
  return (
    <>
      <>
        {/* component */}
        {/* This is an example component */}
        <div>
          <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                  <a href="" className=" ml-1  flex items-center">
                    <img
                      src="/connection-icon-13.jpg"
                      className="h-8  bg-white mr-3"
                      alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                      MakeIt
                    </span>
                  </a>
                  <form
                    action="#"
                    method="GET"
                    className="hidden lg:block lg:pl-32"
                  >
                    <label htmlFor="topbar-search" className="sr-only">
                      Search
                    </label>
                    <div className="mt-1 relative lg:w-64">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="email"
                        id="topbar-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5"
                        placeholder="Search"
                      />
                    </div>
                  </form>
                </div>
                <div className="flex items-center">
                  <button
                    id="toggleSidebarMobileSearch"
                    type="button"
                    className="lg:hidden text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
                  >
                    <span className="sr-only">Search</span>
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="flex items-center mr-5 space-x-4">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="/docs/images/people/profile-picture-5.jpg"
                      alt=""
                    />
                    <div className="font-medium dark:text-white">
                      <div>Jese Leos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="flex overflow-hidden bg-white pt-16">
            <AdminSideBar/>
            <div
              id="main-content"
              className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
            >
              <main>
                <Outlet/>
              </main>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Admin;
