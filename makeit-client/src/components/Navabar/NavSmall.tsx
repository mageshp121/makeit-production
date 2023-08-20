import { useNavigate } from "react-router-dom";
import { usersProp } from "../../utils/types/types";

function NavSmall({users}:{users:usersProp}) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className=" overflow-hidden bg-green-100 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div className="flex justify-between">
        <div className="ml-9">
          <span
            onClick={handleGoBack}
            className=" rounded-full cursor-pointer bg-teal-600 px-3.5 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
          >
            <span aria-hidden="true">←</span> Back
          </span>
        </div>
        {
           users?.roll === "tutor" && ( <>
            <div  className="flex cursor-pointer">
        <span className="mr-2">Log out</span> <img className="h-6 mr-5" src="/exit.png" alt="Log out png" />
        </div>
           </> )
        }
      </div>
    </div>
  );
}

export default NavSmall;
