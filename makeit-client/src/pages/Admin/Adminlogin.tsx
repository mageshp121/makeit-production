import React from "react";
import { useValidate } from "../../utils/formvalidations/CommonCode/login";
import { adminAuth } from "../../utils/api/methods/post";
import { useNavigate } from "react-router-dom";
import { UseCommen, UseCommenError } from "../../utils/toastify/toasty";

const Adminlogin = () => {
  const { errors, handleSubmit, register } = useValidate();
  const naviagte = useNavigate()
  const adminLoginFormSubmit = async (data: any) => {
    const response:any = await adminAuth(data);
    if(response.data.authSuccess){
       naviagte("/super/admin");
    }else{
      UseCommenError("sorry invalied credentials")
    }
    
  };

  return (
    <div className="h-screen  pt-32">
      <>
        <div className="">
          <div className="container  mx-auto rounded-xl shadow-xl p-4 bg-white">
            <div className="w-full md:w-1/2   lg:w-1/3 mx-auto my-12">
              <div className="flex flex-row ml-14">
                <img
                  src="/connection-icon-13.jpg"
                  className="h-8  bg-white mr-3"
                  alt="Flowbite Logo"
                />
                <h1 className="text-2xl font-bold"> makeit Admin Login</h1>
              </div>
              <form
                onSubmit={handleSubmit(adminLoginFormSubmit)}
                className="flex mt-5 flex-col "
              >
                {errors.email && (
                  <p className="text-red-600 mb-3 ml-1">
                    {errors.email.message}
                  </p>
                )}
                <input
                  type="email"
                  className="px-4 py-3 w-full shadow-md rounded-md bg-gray-100 border-transparent focus:border-teal-600 focus:bg-white focus:ring-0 text-sm"
                  placeholder="Email address"
                  {...register("email")}
                />
                {errors.password && (
                  <p className="text-red-600 mt-3 ml-1">
                    {errors.password.message}
                  </p>
                )}
                <input
                  {...register("password")}
                  type="password"
                  className="px-4 py-3 mt-4 w-full shadow-md rounded-md bg-gray-100 border-transparent focus:border-teal-600 focus:bg-white focus:ring-0 text-sm"
                  placeholder="Password"
                />
                <input
                  type="submit"
                  className="mt-4 px-4 py-3 shadow-md leading-6 text-base rounded-md border border-transparent  bg-teal-700 text-white hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
                />
              </form>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Adminlogin;
