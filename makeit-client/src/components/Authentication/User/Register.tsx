import {
  useRegisterValidate,
  RegisterFormData,
} from "../../../utils/formvalidations/CommonCode/register";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { RegisterFn } from "../../../utils/api/methods/post";
import { useDispatch } from "react-redux";
import FormEror from "../../ErrorComponents/FormEror";
import { ErrorComponent } from "../../ErrorComponents/ErrorComponent";
import { useState } from "react";
import { addUser } from "../../../utils/ReduxStore/slices/userSlice";
import { addtoken } from "../../../utils/ReduxStore/slices/tokenSlice";
import { UseSomthingWentWrong } from "../../../utils/toastify/toasty";

const Register = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors, handleSubmit, register } = useRegisterValidate();
  const [errorrMessage, setErrorMessage] = useState("");
  const formSubmit = async (Data: RegisterFormData) => {
    try {
      const response: any = await RegisterFn({ ...Data }); // axios post methode
      if (response.data.Message) {
        setErrorMessage(response.data.Message[0].error);
      } else {
        dispatch(addUser(response.data.userData));
        dispatch(addtoken(response.data.accesToken));
        localStorage.setItem("Token", response.data.reFreshToken);
        Navigate("otp");
      }
    } catch (error) {
      UseSomthingWentWrong();
    }
  };
  return (
    <>
      <FormEror errors={errors} />
      {errorrMessage && (
        <ErrorComponent data={{ path: "login", Message: errorrMessage }} />
      )}
      <div className="flex justify-center min-h-screen">
        <div className="flex  justify-center  flex-1 max-w-screen-xl   sm:rounded-lg">
          <div className="flex-1 md:hidden text-center lg:flex">
            <div
              className="w-full m-12 bg-center bg-no-repeat bg-contain xl:m-16"
              style={{ backgroundImage: "url(/register-img.png)" }}
            />
          </div>
          <div className=" flex-row lg:w-1/2 xl:w-5/12 p-14 ">
            <div className="flex flex-col items-center mt-4">
              <h2 className="text-xl font-semibold  xl:text-3xl">Register </h2>
              <div className="flex-1 w-full ">
                <div className="max-w-xs mx-auto">
                  <form onSubmit={handleSubmit(formSubmit)}>
                    <input
                      className="w-full hidden px-6 py-4 mt-5 text-sm font-medium placeholder-gray-500  bg-neutral-200  border border-gray-200 rounded-lg focus:border-gray-400 focus:bg-white custom-outline-none"
                      type="text"
                      value={"user"}
                      {...register("roll")}
                    />
                    <input
                      className="w-full px-6 py-4 mt-5 text-sm font-medium shadow-lg placeholder-gray-500  bg-neutral-200  focus:ring-teal-500 focus:border-teal-500 border-gray-200 rounded-lg  focus:bg-white custom-outline-none"
                      type="text"
                      placeholder="FirstName"
                      {...register("firstName")}
                    />

                    <input
                      className="w-full px-6 py-4 mt-5 text-sm font-medium shadow-lg placeholder-gray-500  bg-neutral-200  border border-gray-200 rounded-lg  focus:ring-teal-500 focus:border-teal-500 focus:bg-white custom-outline-none"
                      type="text"
                      placeholder="LastName"
                      {...register("lastName")}
                    />

                    <input
                      className="w-full px-6 py-4 mt-5 text-sm font-medium shadow-lg placeholder-gray-500  bg-neutral-200  focus:ring-teal-500 focus:border-teal-500 border-gray-200 rounded-lg  focus:bg-white custom-outline-none"
                      type=""
                      placeholder="Phone"
                      {...register("phone")}
                    />

                    <input
                      className="w-full px-6 py-4 mt-5 text-sm font-medium shadow-lg placeholder-gray-500  bg-neutral-200  border border-gray-200 rounded-lg  focus:ring-teal-500 focus:border-teal-500 focus:bg-white custom-outline-none"
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                    />

                    <input
                      className="w-full px-6 py-4 mt-5 text-sm font-medium shadow-lg placeholder-gray-500  bg-neutral-200  border border-gray-200 rounded-lg  focus:ring-teal-500 focus:border-teal-500 focus:bg-white custom-outline-none"
                      type="password"
                      placeholder="Password"
                      {...register("password")}
                    />

                    <input
                      className="w-full px-6 py-4 mt-5 text-sm font-medium shadow-lg placeholder-gray-500  bg-neutral-200  border border-gray-200 rounded-lg  focus:ring-teal-500 focus:border-teal-500 focus:bg-white custom-outline-none"
                      placeholder="Confirm Password"
                      {...register("confirmPassword")}
                    />

                    <input
                      type="submit"
                      className="flex shadow-2xl bg-teal-600 items-center justify-center w-full py-4 mt-9 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg focus:shadow-outline focus:outline-none"
                    />
                  </form>
                  <p className="mt-6 text-xs text-center text-gray-600">
                    <Link to={"login"} replace={true}>
                      <span>
                        Allready have an account{" "}
                        <span className="underline text-green-500">Login</span>
                      </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
