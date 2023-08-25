import { NotFoundError } from "@makeitcmn/comon";
import { Request,Response } from "express"


export default (dependencies:any)=>{
    const { useCase: { getPurchasedCoursebyOrderId_useCase  }} = dependencies;
     const getPurchaseCoursesByCourseIdControllerTutor =  async (req:Request,res:Response) =>{
            const orderId = req.params.orderId;
            if(!orderId) throw new NotFoundError()
            const  { exicutefunction } = getPurchasedCoursebyOrderId_useCase(dependencies);
            const purchaseRes = await  exicutefunction(orderId);
            console.log(purchaseRes,'purchase Res at controler');
            res.send(purchaseRes).status(200)
     }

    return getPurchaseCoursesByCourseIdControllerTutor

}