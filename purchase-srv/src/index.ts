
import { app } from './app';
import { dbConnect } from "./config/db";
import dotenv from "dotenv";
import { natsWrapper } from './nats-wrapper';
import { CourseCreateListener } from './events/listeners/course-created-listener';

dotenv.config();


const start  = async() =>{
    try{
      await natsWrapper.connect('makeit', 'purchase-srv', 'http://nats-srv:4222');
     natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    new CourseCreateListener(natsWrapper.client).listen()
      await  dbConnect()
    }catch(err){
    console.error(err);
    }
console.log(process.env.ACCESS_JWT_SECRETEKEY,'jwt');
console.log(process.env.REFRESH_JWT_SECRETEKEY,'jwt');
 app.listen(5000,()=>{
 console.log("server running at 5000");
})
 
    





}
start()
