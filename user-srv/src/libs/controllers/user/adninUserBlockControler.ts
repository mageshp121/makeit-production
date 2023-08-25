import { Request, Response } from "express";

export default (dependencies: any) => {
  const {
    useCase: { blockUser_useCase },
  } = dependencies;
  const BlockUser = async (req: Request, res: Response) => {
    const id = req.params;
    console.log(id,'id contr');
    
    const blockRes = await blockUser_useCase(dependencies).exicutefunction(id);
    res.send(blockRes).status(200);
  };
  return BlockUser;
};
