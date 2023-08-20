
import { Link, Navigate, useNavigate } from "react-router-dom";
import { LoginFn } from "../../../utils/api/methods/post";
import { useValidate, LoginFormData} from "../../../utils/formvalidations/Common/login";
import FormEror from "../../ErrorComponents/FormEror";
import { useState } from "react";
import { ErrorComponent } from "../../ErrorComponents/ErrorComponent";
import { UseSomthingWentWrong } from "../../../utils/toastify/toasty";
import { useGoogleSignIn } from "../../../utils/customHooks/hook";
import { Auth } from "firebase/auth";
import { authentication } from "../../../utils/config/firebase";
import { getUserByEmail } from "../../../utils/api/methods/get";
import { useDispatch } from "react-redux";
import { addUser,clearUser } from "../../../utils/ReduxStore/slices/userSlice";
import { addtoken } from "../../../utils/ReduxStore/slices/tokenSlice";


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { errors, handleSubmit, register } = useValidate();
    const [errorMessage,setErrorMessage] = useState('')
    const formSubmit=async(Data:LoginFormData)=>{
        try {
            const response:any = await LoginFn({ ...Data }); // This is the post methode
            console.log(response,'response');
            if (response.data.Message) {
            console.log("login sucesss");
            console.log(response.data.Message);
            setErrorMessage(response.data.Message[0].error)
            }else{
              if(response.data.userWithoutPassword.roll === "user"){
                dispatch(clearUser());
                dispatch(addUser(response.data.userWithoutPassword));
                dispatch(addtoken(response.data.accesToken))
                localStorage.setItem("Token",response.data.reFreshToken);
                navigate("/")
              }else{
                navigate("/tutor/login")
              }
                
            }
          } catch (error) {
            UseSomthingWentWrong();
        }
    }

  const googleSignInUser = async (auth: Auth) => {
      try {
        const response = await useGoogleSignIn(auth);
        if (response.status && response.userEmail !== null) {
          try {
            const res: any = await getUserByEmail(response.userEmail);
            if(res.status === 200){
              if(res.data.userObject.roll === "user"){
                dispatch(clearUser());
                dispatch(addUser(res.data.userObject));
                dispatch(addtoken(res.data.accesToken))
                localStorage.setItem("Token",res.data.reFreshToken);
                navigate('/');
              }else{
                navigate("/tutor/profile/login");
              } 
            }else if(res.response.status === 404){
              setErrorMessage(res.response.data.errors[0].message);
            }
          } catch (error) {
            console.log(error,'errororor');
            UseSomthingWentWrong();
          }
        }
      } catch (error) {
        console.log(error);
        UseSomthingWentWrong();
      }
    };
  return (

<>

       {/* Display error messages */}
       <FormEror errors={errors}/>
       {
        errorMessage && <ErrorComponent data={{path:'/auth',Message:errorMessage}}/>
       }

     <div className="flex justify-center min-h-screen">
        <div className="flex  justify-center  flex-1 max-w-screen-xl   sm:rounded-lg">
          <div className="flex-1 md:hidden text-center lg:flex">
            <div
              className="w-full m-12 bg-center bg-no-repeat bg-contain xl:m-16"
              style={{ backgroundImage: "url(/register-img.png)" }}
            />
          </div>
          <div className=" lg:w-1/2 xl:w-5/12 p-14 ">
    <div className="flex flex-col items-center mt-4">
      <h3 className="text-xl font-medium pb-8 xl:text-3xl">
        Sign up</h3>
      <div className="flex-1 w-full ">
        <div className="flex flex-col items-center">
          <button onClick={()=>googleSignInUser(authentication)} className="flex items-center justify-center w-full max-w-xs py-3 font-bold text-gray-500 transition-all duration-300 ease-in-out bg-neutral-200 rounded-lg shadow-sm focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
            <div className="p-2 bg-white rounded-full">
              <svg className="w-4" viewBox="0 0 533.5 544.3">
                <path
                  d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                  fill="#4285f4"
                />
                <path
                  d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                  fill="#34a853"
                />
                <path
                  d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                  fill="#fbbc04"
                />
                <path
                  d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                  fill="#ea4335"
                />
              </svg>
            </div>
            <span className="ml-4">Sign in with Google</span>
          </button>
        </div>

        <div className="my-10 text-center border-b">
          <div className="inline-block  text-sm font-medium leading-none tracking-wide text-gray-600 transform translate-y-1/2 ">
            Or sign in with e-mail
          </div>
        </div>
        <div className="max-w-xs mx-auto">
            <form   onSubmit={handleSubmit(formSubmit)}>
           
            <input
            className="w-full px-6 py-4 mt-5 text-sm font-medium placeholder-gray-500  bg-neutral-200  border border-gray-200 rounded-lg  focus:border-gray-400 focus:bg-white custom-outline-none"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
           
          <input
            className="w-full px-6 py-4 mt-5 text-sm font-medium placeholder-gray-500  bg-neutral-200  border border-gray-200 rounded-lg focus:border-gray-400 focus:bg-white custom-outline-none"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
           <input
                  type="submit"
                  className="flex shadow-2xl bg-teal-600 items-center justify-center w-full py-4 mt-9 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg focus:shadow-outline focus:outline-none"
                />
        </form>
          <p className="mt-6 text-xs text-center text-gray-600">
          <Link to={'/auth'}><span>No Account <span className="underline text-green-500">Register</span></span></Link>

          </p>
          
        </div>
      </div>
    </div>
  </div>
        </div>
      </div>
</>

   


    
  )
}

export default Login
