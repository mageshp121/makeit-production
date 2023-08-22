import { useDispatch } from "react-redux";
import { getUserById, udpdateuser } from "../../../utils/api/endPoints/commen";
import { useAxiosePrivate } from "../../../utils/customHooks/hook";
import { ProfileUpdation, useProfileUpdateValidate } from "../../../utils/formvalidations/CommonCode/profileedit";
import { useSelector } from "react-redux";
import { addUser } from "../../../utils/ReduxStore/slices/userSlice";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UseCommen, UseCommenError } from "../../../utils/toastify/toasty";




export interface userData {
  _id:string
  firstName : string,
  lastName: string,
  email:string,
  phone:number,
  password:string,
  roll:string
  isOtPVerified:boolean | null
  profileImage:string 
  s3ImageUrl:string 
}




const ProfileUpdate = () => {
  const { errors, handleSubmit, register } = useProfileUpdateValidate();
  const dispatch = useDispatch()
  const axiosPrivet =  useAxiosePrivate();
  const [update,setUpdate] = useState(false)
  const navigat = useNavigate()
  const [userdata, setUserData] = useState<userData>({
    _id:"",
    firstName: "",
    lastName: "",
    email: "",
    phone: 0,
    password: "",
    roll: "",
    isOtPVerified:false,
    profileImage: ""  ,
     s3ImageUrl: "",
  });

  const user: any = useSelector((store: any) => {
    return store.user.userData;
  });
  
    useEffect(()=>{
    const getuser = async()=>{
      try {
        const useRes =  await axiosPrivet.get(getUserById+user._id);
        setUserData(useRes.data);
        dispatch(addUser(useRes.data))
      } catch (error) {
        navigat('/auth/login')
      }
     
    }
    getuser()
    },[update])

  const formsubmit = async (Data:ProfileUpdation) => {
    console.log(Data, "<= profileUpdateSubmit Sumbmited data =>");
    const formData = new FormData();
    formData.append("firstName",Data.firstName);
    formData.append("lastName",Data.lastName);
    formData.append("email",Data.email);
    formData.append("userimage",Data.userimage[0]);
    formData.append("profileImage",userdata.profileImage);
    formData.append("_id",userdata._id)
    try {
      const response = await axiosPrivet.put(udpdateuser,formData,{headers:{'Content-Type': 'multipart/form-data'}});
      console.log(response,'<= ProfileUpdate  axiosPrivet.patch  =>');
      if(response.data._id){
        setUpdate(true)
        UseCommen("profile succesfull updated")
      }else{
        UseCommenError("Something went wrong try agin")
      }
    } catch (error) {
      console.log(error,'errororororo');
      
    }
   
  };
  return (
    <>
      <div>
        <div className="w-[100%] bg-white  p-5 pl-10 rounded-lg h-[38rem] ">
          <form onSubmit={handleSubmit(formsubmit)}>
            <div className="w-[100%] bg-white  p-5 gap-2 grid grid-cols-2">
              <div className="h-auto mt-5">
                <div className="mb-5">
                  {errors.firstName ? (
                    <p className="text-red-600">{errors.firstName.message}</p>
                  ) : (
                    <>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        First Name
                      </label>
                    </>
                  )}
                  <input
                    defaultValue={userdata.firstName}
                    type="text"
                    {...register("firstName")}
                    className="py-3 px-4 block  bg-slate-50 w-full border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  />
                </div>
                <div className="mb-5">
                  {errors.lastName ? (
                    <p className="text-red-600">{errors.lastName.message}</p>
                  ) : (
                    <>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Last Name
                      </label>
                    </>
                  )}
                  <input
                    defaultValue={userdata.lastName}
                    type="text"
                    {...register("lastName")}
                    className="py-3 px-4 block  bg-slate-50 w-full border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  />
                </div>
                <div className="mb-5">
                  {errors.email ? (
                    <p className="text-red-600">{errors.email.message}</p>
                  ) : (
                    <>
                      <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Email
                      </label>
                    </>
                  )}

                  <input
                    defaultValue={userdata.email}
                    type="email"
                    {...register("email")}
                    className="py-3 px-4 block  bg-slate-50 w-full border-gray-200 rounded-md text-sm focus:border-teal-500 focus:ring-teal-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                  />
                </div>
                <div className="mb-5">
                  <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                    Upload New Profile Image
                  </label>
                  {/* {errors?.ProfileImage && <p>{errors?.ProfileImage?.message}</p>} */}
                  <input
                    {...register("userimage")}
                    className="block w-full text-sm  bg-slate-50 text-gray-900 border border-gray-300 rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="user_avatar_help"
                    id="user_avatar"
                    type="file"
                  />
                </div>
              </div>
              <div className="h-auto mt-5 ml-28">
                <div className="mb-5 h-40">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    You'r previous profile image
                  </label>
                  <div className="w-60 overflow-hidden rounded-lg object-contain ">
                    <img className="h-60 w-60" src={`${userdata?.s3ImageUrl}`} alt="profile Image" />
                  </div>
                </div>
              </div>
            </div>
            <div className="m-5 ">
              <input
                type="submit"
                className="flex  shadow-2xl bg-teal-600 items-center justify-center w-full py-4 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg focus:shadow-outline focus:outline-none"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileUpdate;
