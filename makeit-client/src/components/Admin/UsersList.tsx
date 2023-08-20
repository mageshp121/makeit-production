import React from "react";

function UsersList(prop:any) {
    console.log(prop);
    
  return (
    <>
      <div className="mt-10 p-5 ml-5">
        <div className=" flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          roll
                        </th> 
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                         e-mail
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 pr-9 text-right text-xs font-medium text-gray-500 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {
                       prop?.users.map((data:any)=>{
                        return <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                          {data?.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          {data?.roll}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                          {data?.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                         {data?.Phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            type="button"
                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-teal-600 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                          >
                            Block
                          </button>
                          <button
                            type="button"
                            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                          >
                            Unblock
                          </button>
                        </td>
                      </tr>
                       })
                       }
                    </tbody>
                  </table>
                </div>
                <div className="py-1 px-4">
                  <nav className="flex items-center space-x-2">
                    <a
                      className="text-gray-400 hover:text-teal-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                      href="#"
                    >
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a
                      className="w-10 h-10 bg-teal-500 text-white p-4 inline-flex items-center text-sm font-medium rounded-full"
                      href="#"
                      aria-current="page"
                    >
                      1
                    </a>
                    <a
                      className="w-10 h-10 text-gray-400 hover:text-teal-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                      href="#"
                    >
                      2
                    </a>
                    <a
                      className="w-10 h-10 text-gray-400 hover:text-teal-600 p-4 inline-flex items-center text-sm font-medium rounded-full"
                      href="#"
                    >
                      3
                    </a>
                    <a
                      className="text-gray-400 hover:text-teal-600 p-4 inline-flex items-center gap-2 font-medium rounded-md"
                      href="#"
                    >
                      <span className="sr-only">Next</span>
                      <span aria-hidden="true">»</span>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersList;
