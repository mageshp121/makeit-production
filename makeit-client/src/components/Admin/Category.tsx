import React, { useEffect, useState } from "react";
import { useCategoryValidate } from "../../utils/formvalidations/CommonCode/category";
import { CategoryFn } from "../../utils/api/methods/post";
import { UseCommen, UseCommenError } from "../../utils/toastify/toasty";
import { fetchAllCategory } from "../../utils/api/methods/get";
import { deleteCategory } from "../../utils/api/methods/delete";

function Category() {
  const { errors, handleSubmit, reset, register } = useCategoryValidate();
  const [resetpage, setResetPage] = useState(false);
  const [category, setCategory] = useState([]) as any;
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 2;
  const lastIndex = dataPerPage * currentPage;
  const firstIndex = lastIndex - dataPerPage;
  const page = Math.ceil(category.length / dataPerPage);
  const paginateddata = category.slice(firstIndex, lastIndex);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handlePrev = () => {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page != currentPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response: any = await fetchAllCategory();
      setCategory(response.data);
      return;
    };
    fetchData();
    setResetPage(false);
  }, [resetpage]);
  const formsumbit = async (data: any) => {
    const formData = new FormData();
    formData.append("category", data.category);
    const response: any = await CategoryFn(formData);
    if (response?.data?.categoryPresent) {
      UseCommenError("Sorry Category alredy exist please add new one");
      reset();
    } else {
      UseCommen("Category Added");
      reset();
      setResetPage(true);
    }
  };
  const handleCategorDelete = async (id: string) => {
    const response: any = await deleteCategory(id);
    if (response.data.courseExist) {
      UseCommenError(
        "Sorry can't delete this category , Course present in this category"
      );
    } else if (response.data.acknowledged && response.data.deletedCount === 1) {
      UseCommen("Category Succesfully deletd ");
      setResetPage(true);
    } else {
      UseCommen("Oops...! Something went wrong");
    }
  };
  return (
    <>
      <div className="mt-10 p-5 ml-5">
        <div className=" flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-[50rem] inline-block align-middle">
              <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                <div className="py-3 px-4 ">
                  <div className="relative max-w-xbgs">
                    <div
                      className=" h-10  mr-14 bg-teal-600 cursor-pointer shadow-lg  w-44 flex justify-center pt-2  rounded-md  "
                      data-hs-overlay="#hs-sign-out-alert"
                    >
                      <span
                        className="text-sm font-medium text-white"
                        data-hs-overlay="#hs-focus-management-modal"
                      >
                        Add New Category
                      </span>
                    </div>
                  </div>
                  <>
                    <div
                      id="hs-focus-management-modal"
                      className="hs-overlay hidden backdrop-blur-sm  w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                    >
                      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                            <h3 className="font-bold text-gray-800 dark:text-white">
                              Add new category
                            </h3>
                            <button
                              type="button"
                              className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center  items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                              data-hs-overlay="#hs-focus-management-modal"
                            >
                              <span className="sr-only">close</span>
                              <svg
                                className="w-3.5 h-3.5"
                                width={8}
                                height={8}
                                viewBox="0 0 8 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          </div>
                          <form onSubmit={handleSubmit(formsumbit)}>
                            <div className="p-4 overflow-y-auto">
                              {errors.category ? (
                                <p className="text-red-600">
                                  {errors.category.message}
                                </p>
                              ) : (
                                <>
                                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                                    Category Name
                                  </label>
                                </>
                              )}
                              <input
                                type="text"
                                id="input-label"
                                {...register("category")}
                                className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                                placeholder="Web-development"
                              />
                            </div>
                            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                              <button
                                type="button"
                                className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-red-600 text-white shadow-sm align-middle  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                data-hs-overlay="#hs-focus-management-modal"
                              >
                                Cancel
                              </button>
                              <input
                                type="submit"
                                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-teal-600 text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                              />
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </>
                </div>
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
                          Created
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {paginateddata?.map((data: any) => {
                        return (
                          <tr key={data?._id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                              {data?.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                              {data?.createdAt}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <>
                                <div className="text-center">
                                  <span
                                    className="text-red-500 underline cursor-pointer hover:text-red-700"
                                    data-hs-overlay={`#hs-danger-alert${data?._id}`}
                                  >
                                    Delete
                                  </span>
                                </div>
                                <div
                                  id={`hs-danger-alert${data?._id}`}
                                  className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
                                >
                                  <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto">
                                    <div className="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                                      <div className="absolute top-2 right-2">
                                        <button
                                          type="button"
                                          className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                                          data-hs-overlay={`#hs-danger-alert${data?._id}`}
                                        >
                                          <span className="sr-only">Close</span>
                                          <svg
                                            className="w-3.5 h-3.5"
                                            width={8}
                                            height={8}
                                            viewBox="0 0 8 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                                              fill="currentColor"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                      <div className="p-4 sm:p-10 overflow-y-auto">
                                        <div className="flex gap-x-4 md:gap-x-7">
                                          {/* Icon */}
                                          <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500 dark:bg-red-700 dark:border-red-600 dark:text-red-100">
                                            <svg
                                              className="w-5 h-5"
                                              xmlns="http://www.w3.org/2000/svg"
                                              width={16}
                                              height={16}
                                              fill="currentColor"
                                              viewBox="0 0 16 16"
                                            >
                                              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                            </svg>
                                          </span>
                                          {/* End Icon */}
                                          <div className="grow">
                                            <h3 className="mb-2 text-xl font-bold text-gray-800 dark:text-gray-200">
                                              Delete Category
                                            </h3>
                                            <p className="text-gray-500">
                                              Are you sure you want to delete
                                              the category{" "}
                                              <h1 className="text-black text-lg  ">{`${data?.category} ? `}</h1>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                                        <button
                                          type="button"
                                          className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                          data-hs-overlay={`#hs-danger-alert${data?._id}`}
                                        >
                                          Cancel
                                        </button>
                                        <span
                                          className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                                          onClick={() =>
                                            handleCategorDelete(data?.category)
                                          }
                                        >
                                          Yes
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="py-1 px-4">
                  <nav className="flex justify-start  items-center rounded-lg  space-x-2">
                    <span
                      className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
                      onClick={handlePrev}
                    >
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </span>
                    {Array.from({ length: page }, (_, index) => (
                      <span
                        key={index + 1}
                        className={`w-10 h-10 ${
                          currentPage === index + 1
                            ? "bg-teal-600 text-white"
                            : "text-gray-500 hover:text-teal-600"
                        } p-4 inline-flex items-center text-sm font-medium rounded-full`}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </span>
                    ))}
                    <span
                      className="text-gray-500 hover:text-teal-600 p-4 inline-flex items-center gap-2 rounded-md"
                      onClick={handleNext}
                    >
                      <span className="sr-only">Next</span>
                      <span aria-hidden="true">»</span>
                    </span>
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

export default Category;
