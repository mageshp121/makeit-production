import { useEffect, useState } from "react";
import { fetchAllUsers, getAllCourses } from "../../utils/api/methods/get";
import { UseCommenError } from "../../utils/toastify/toasty";
import UsersList from "./UsersList";

function UserTutorCount() {
  const [userCount, setUserCount] = useState();
  const [tutorCount, setTutorCount] = useState();
  const [courseCount, setCounrseCount] = useState();
  const [user, setUsers] = useState([]) as any;
  useEffect(() => {
    // geting all users and course data
    const fetchAllData = async () => {
      const response: any = await fetchAllUsers();
      if (!response) return UseCommenError("something went wrong");
      setUserCount(response.data.usersArray.length);
      setTutorCount(response.data.tutorsArray.length);
      setUsers(response.data.userdata);
      const res: any = await getAllCourses();
      if (!res) return UseCommenError("something went wrong");
      setCounrseCount(res.data.length);
    };
    fetchAllData();
  }, []);
  return (
    <div>
      <div className="pt-6 ml-7 px-4">
        <div className="grid grid-cols-1 w-[50rem] 2xl:grid-cols-2 xl:gap-4 my-4">
          <div className="bg-white shadow  w-[50rem] rounded-lg p-4 sm:p-6 xl:p-8 ">
            <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
              Entity count
            </h3>
            <div className="block w-[50rem] overflow-x-auto">
              <table className="items-center w-[50rem] bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 bg-gray-50 w-[50rem] text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                      Users
                    </th>
                    <th className="px-4  bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap">
                      Count
                    </th>
                    <th className="px-4 bg-gray-50 text-gray-700 align-middle py-3 text-xs font-semibold text-left uppercase border-l-0 border-r-0 whitespace-nowrap min-w-140-px" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="text-gray-500">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                      Learners
                    </th>
                    <td className="border-t-0 pl-9 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                      {userCount}
                    </td>
                    <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"></td>
                  </tr>
                  <tr className="text-gray-500">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                      Tutors
                    </th>
                    <td className="border-t-0 px-4 pl-9  align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                      {tutorCount}
                    </td>
                    <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"></td>
                  </tr>
                  <tr className="text-gray-500">
                    <th className="border-t-0 px-4 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                      Courses
                    </th>
                    <td className="border-t-0 pl-9 px-4 align-middle text-xs font-medium text-gray-900 whitespace-nowrap p-4">
                      {courseCount}
                    </td>
                    <td className="border-t-0 px-4 align-middle text-xs whitespace-nowrap p-4"></td>

                    <td className="border-t-0 align-middle text-xs whitespace-nowrap p-4 pb-0"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <UsersList users={user} />
    </div>
  );
}

export default UserTutorCount;
