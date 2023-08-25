import { Request, Response } from "express";
export default (dependencies: any) => {
  const {
    useCase: { unBlockUser_useCase },
  } = dependencies;
  const unBlockBlockUser = async (req: Request, res: Response) => {
    const id = req.params;
    console.log(id,'id contll');
    
    const blockRes = await unBlockUser_useCase(dependencies).exicutefunction(id);
    res.send(blockRes).status(200);
  };
  return unBlockBlockUser;
};
