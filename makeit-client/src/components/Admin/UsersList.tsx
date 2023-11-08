import React, { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import { AdminBlockUser, UnBlockUser } from "../../utils/api/methods/post";
import { fetchAllUsers, getAllCourses } from "../../utils/api/methods/get";
import { UseCommen, UseCommenError } from "../../utils/toastify/toasty";
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
};
interface UsersResponse {
  users: User[];
}
function UsersList() {
  const [user, setUsers] = useState([]) as any;
  const [currentPage,setCurrentPage] = useState(1);
  const [change,setChange] = useState(false)
  const dataPerPage = 2
  const lastIndex = currentPage*dataPerPage;
  const firstIndex = lastIndex-dataPerPage;
  const page = Math.ceil(user.length / dataPerPage);
  const paginateddata = user.slice(firstIndex,lastIndex);

  useEffect(() => {
    setChange(false)
    // geting all users and course data
    const fetchAllData = async () => {
      const response: any = await fetchAllUsers();
      if (!response) return UseCommenError("something went wrong");
      setUsers(response.data.userdata);
    };
    fetchAllData();
  }, [change]);



  const handlePageChange = (pageNumber:number) =>{
    setCurrentPage(pageNumber)
}
const handlePrev=()=>{
   if(currentPage != 1){
       setCurrentPage((prev)=>prev-1)
   }
}
  
const handleNext = () =>{
 if(page != currentPage){
   setCurrentPage((prev)=> prev+1)
 }
  
};

const handleBlockUser =async(id:string)=>{
      const blockRes:any = await AdminBlockUser(id);
      if(blockRes?.data.acknowledged && blockRes?.data.matchedCount===1 && blockRes?.data.modifiedCount===1){
        UseCommen("User successfully blocked ");
        setChange(true);
     }else{
       UseCommenError("Something went wrong")
     }
      
}
  
const handleUnBlockUSer =async(id:string)=>{
  const unblockRes = await UnBlockUser(id);
   if(unblockRes?.data.acknowledged && unblockRes?.data.matchedCount===1 && unblockRes?.data.modifiedCount===1){
      UseCommen("User successfully unblocked");
      setChange(true);
   }else{
     UseCommenError("Something went wrong")
   }
  

}

  return (
    <>
      <div className="mt-10 p-5 ml-5">
        <div className=" flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="border rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                <div className="overflow-hidden rounded-lg">
                  <table className="min-w-full divide-y rounded-lg divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 rounded-lg dark:bg-gray-700">
                      <tr className="bg-gray-300  h-14">
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
                       paginateddata?.map((data:any)=>{
                        console.log(data);
                        
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
                         {data?.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {
                            data?.isBlock ? (<div
                              onClick={()=>handleUnBlockUSer(data._id)}
                             className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-teal-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                           >
                             Unblock
                           </div>):(<div
                              onClick={()=>handleBlockUser(data._id)}
                              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-red-600 text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                            >
                              Block
                            </div>)
                          }
                          
                        </td>
                      </tr>
                       })
                       }
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
                    {index+1 }
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

export default UsersList;
