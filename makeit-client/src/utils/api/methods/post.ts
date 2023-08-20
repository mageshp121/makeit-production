
import client  from "../baseUrl/axios.baseUrl"
import { Category, Login_Api, Register_Api} from "../endPoints/commen";
 
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