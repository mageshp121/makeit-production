
import { app } from './app';
import { dbConnect } from "./config/db";
import dotenv from "dotenv";
dotenv.config();
const start  = async() =>{
    try{
      await  dbConnect()
    }catch(err){
    console.error(err,"users");
    }
// registerConsumer("REGISTER");
// loginCosumer('LOGIN');
 app.listen(3000,()=>{
console.log("server started at 3000");
})
}
start()

