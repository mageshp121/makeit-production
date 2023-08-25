import getPurchseHistoryUser from "./getAllPurchaseHistoryController";
import getpurchaseHistoryTutor  from "./getAllpurchaseHistoryBuyTutorIdControllr"
import getpurchasedCourseByorderIdcontroller from "./getpurchasedCourseByorderIdcontroller";



export default (dependencies:any)=>{
   return{
    getpurchseHistoryUser:getPurchseHistoryUser(dependencies),
    getpurchaseHistoryTutor:getpurchaseHistoryTutor(dependencies),
    getAllpurchasedCourseByOrderId:getpurchasedCourseByorderIdcontroller(dependencies),
   } 
}