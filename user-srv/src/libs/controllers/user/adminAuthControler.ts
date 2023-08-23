import { Request, Response } from "express";

export default (dependencies: any) => {
  const adminAuth = (req: Request, res: Response) => {
    const {
      useCase: { adminAuth_UseCase },
    } = dependencies;
    const authRes = adminAuth_UseCase().exicutefunction(req.body);
    res.send(authRes).status(200);
  };

  return adminAuth;
};
