import { Request, Response } from "express";

export default (dependencies: any) => {
  const deleteCategory_controller = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    console.log(categoryId,'idd');
    
    const {
      useCase: { deleteCatogory_useCase },
    } = dependencies;
    const { exicutefunction } = await deleteCatogory_useCase(dependencies);
    const categoryRes = await exicutefunction(categoryId);
    console.log(categoryRes,'category Res');
    
    res.send(categoryRes).status(200);
  };

  return deleteCategory_controller;
};
