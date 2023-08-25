export const getPurchasedCoursebyOrderId_useCase = (dependencies:any) =>{
    const {
        repository: { purchaseRespository },
      } = dependencies;
 const exicutefunction = async (orderId:string)=>{
    const purchaseCourseByorderId = await purchaseRespository.getpurchasedCourse(orderId);
    console.log(purchaseCourseByorderId,"This history at get purhaese useCase");
    
    return purchaseCourseByorderId

}
return {exicutefunction}

}