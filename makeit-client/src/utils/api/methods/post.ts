
import { circIn } from "framer-motion";
import client  from "../baseUrl/axios.baseUrl"
import { AdminAuth, BlockUser, Category, Login_Api, Register_Api, UnblockUser} from "../endPoints/commen";
 
export const RegisterFn= async (data:object)=>{  
      try{
        return client().post(Register_Api,data)
      }catch(error){
        return error
      }
}


export const LoginFn = async (data:object)=>{
    try{
        return client().post(Login_Api,data);
    }catch(error){
        return error
    }
}

export const CategoryFn = async (data:object)=>{
try{
 return client().post(Category,data,{headers:{"Content-Type":"application/json"}})
}catch(error){
 return error 
}

}

export const adminAuth =async (data:any)=>{
  try {
    return client().post(AdminAuth,data,{headers:{"Content-Type":"application/json"}})
  } catch (error) {
    return error
  }
}

export const AdminBlockUser =async(id:any)=>{
  try {
    return client().post(BlockUser+id,{headers:{"Content-Type":"application/json"}})
  } catch (error) {
    return error
  }
}

export const UnBlockUser =async(id:any)=>{
  try {
    return client().patch(UnblockUser+id,{headers:{"Content-Type":"application/json"}})
  } catch (error) {
    
  }
}