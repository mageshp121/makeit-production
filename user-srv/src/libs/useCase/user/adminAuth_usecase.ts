import dotenv from "dotenv";
dotenv.config()
export const adminAuth_UseCase =()=>{
    const exicutefunction =(credentials:any)=>{
          if(process.env.ADMIN_EMAIL===credentials.email && process.env.ADMIN_PASS === credentials.password){
             return { authSuccess : true }
          } else{
            return { authSuccess :false }
          }
    }

    return {exicutefunction}
}