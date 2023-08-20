import client from "../baseUrl/axios.baseUrl";
import { useAxiosePrivate } from "../../customHooks/hook";
import {
  FetchLessons_With_Courseid,
  FetchCourse_By_Id,
  Fetch_all_Courses,
  getUserById,
  getUserByemail,
  getRefersh,
  getAllusers,
  Category
} from "../endPoints/commen";


export const courseLessone = async (id: string) => {
    console.log(id,'iddddddd');
  try {
    const data = await client().get(FetchLessons_With_Courseid + id);
    return data;
  } catch (error) {
    return error;
  }
};


export const getCoursebyId = async (id: string) => {
    console.log(id,'iddddddd');
  try {
    const data = await client().get(FetchCourse_By_Id + id);
    return data;
  } catch (error) {
    return error;
  }
};

export const getAllCourses =async () =>{
try {
 const data = await client().get(Fetch_all_Courses);
 return data
} catch (error) {
   return error
}
}

export const getuserBYId = async (id:string) =>{
  try {
    const data = await client().get(getUserById+id);
    return data
  } catch (error) {
    return error
  }

}

export const getUserByEmail =async(email:string)=>{
  const Useremail = encodeURIComponent(email);
  console.log(Useremail,'encoded email');
    try {
      const data = await client().get(getUserByemail+Useremail);
      console.log(data,'  <= user data => getUserByEmail ');
      return data
    } catch (error) {
      return error
    }
}

export const getRefreshToken = async (token:string) =>{
  console.log(token,'tokennnn');
  const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
      try {
        const data = await client().get(getRefersh,{headers});
        console.log(data,'  <= access token => getRfresh ');
        return data
      } catch (error) {
        return error
      }

}

export const fetchAllUsers = async () =>{
       try {
        const data = await client().get(getAllusers);
        console.log(data,'  <=  fetchAllUsers => ');
        return data
       } catch (error) {
          return error
       }
}


export const fetchAllCategory =async () =>{
   try {
     const data = await client().get(Category);
     console.log(data);
      return data
   } catch (error) {
      return error
   }

}