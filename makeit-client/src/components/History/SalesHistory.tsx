import React, { useEffect, useState } from "react";
import { useAxiosePrivate } from "../../utils/customHooks/hook";
import { useSelector } from "react-redux";
import { GetPurhcaseHistoryTutor_Api } from "../../utils/api/endPoints/commen";
import { usersProp } from "../../utils/types/types";
import { Link } from "react-router-dom";

const SalesHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]) as any;
  const userdata: usersProp = useSelector((store: any) => {
    return store.user.userData;
  });
  const axiosePrivate = useAxiosePrivate();
  useEffect(() => {
    const getPurchaseHistory = async () => {
      const response: any = await axiosePrivate.get(
        GetPurhcaseHistoryTutor_Api + userdata._id
      );
      if (response.data) {
        console.log(response.data, "ResponseDatatatta");
        setPurchaseHistory(response.data);
      }
    };
    getPurchaseHistory();
  }, []);
  return (
    <>
      <div className="rounded-md">
        <div
          className="flex bg-white rounded-lg
    flex-col"
        >
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                <div className="py-3 px-4">
                  <div className="mb-5">
                    <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {purchaseHistory.length} Courses
                    </span>
                  </div>
                  <div className="relative max-w-xs">
                    <label htmlFor="hs-table-search" className="sr-only">
                      Search
                    </label>
                    <input
                      type="text"
                      name="hs-table-search"
                      id="hs-table-search"
                      className="p-3 pl-10 block w-full border-gray-200 rounded-lg text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                      placeholder="Search for items"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-4">
                      <svg
                        className="h-3.5 w-3.5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="py-3 px-4 pr-0"></th>
                        <th
                          scope="col"
                          className="px-16 py-6 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Course Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Total Price
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {purchaseHistory.map((obj: any) => {
                        const status = obj.status; // Replace this with the actual value of obj.status

                        const statusDisplay =
                          status === "Pending" ? (
                            <span className="text-red-600">Pending</span>
                          ) : status === "success" ? (
                            <span className="text-green-400">Success</span>
                          ) : (
                            <span className="text-yellow-500">Failed</span>
                          );
                        return (
                          <>
                            <tr key={obj._id} className="hover:bg-slate-50">
                              <td className="py-3 pl-4">
                                <div className="flex items-center h-5">
                                  <img
                                    className="h-7 ml-7"
                                    src="/wired-outline-146-basket-trolley-shopping-card.gif"
                                    alt=""
                                  />
                                </div>
                              </td>
                              <td className="px-16    text-sm font-medium text-gray-800 dark:text-gray-200">
                                <div className=" overflow-hidden">
                                  <span className="">{obj.orderId}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <div className=" overflow-hidden">
                                  {statusDisplay}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {obj.date}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                {obj.totalemount}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                <Link to={"/"}>
                                  <span className=" rounded-lg  cursor-pointer  bg-teal-600 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900">
                                    <span
                                      className="text-sm"
                                      aria-hidden="true"
                                    >
                                      courses
                                    </span>
                                  </span>
                                </Link>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesHistory;
