import React from "react";
import { Link } from "react-router-dom";

function AdminSideBar() {
  return (
    <div>
      <aside
        id="sidebar"
        className="fixed  z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
        aria-label="Sidebar"
      >
        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-1 px-3 bg-white divide-y space-y-1">
              <ul className="space-y-2 pb-2 mt-8">
                <li>
                  <Link
                    to={"category"}
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <img
                      className="h-8 ml-2"
                      src="/categories.png"
                      alt="user icon"
                    />
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Category
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"users"}
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <img
                      className="h-12"
                      src="/wired-outline-268-avatar-man.gif"
                      alt="user icon"
                    />
                    <span className="ml-3 flex-1 whitespace-nowrap">Users</span>
                  </Link>
                </li>
                <li className="ml-3">
                  <Link
                    to={"signout"}
                    className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 flex items-center p-2 group "
                  >
                    <img className="h-8" src="/log-out.png" alt="user icon" />
                    <span className="ml-3 flex-1 whitespace-nowrap">
                      Sign out
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default AdminSideBar;
