import getAllUsersController from "./getUsersController";
import getUserById from "./getUserByIdController";
import loginController from "./loginController";
import registerController from "./registerController";
import logoutController from "./logout_Controler";
import getUserByEmailController from "./getUserByEmailController";
import createRefreshController from "./createRefreshController";
import updateUserControler from "./updateUserControler";
import adminAuthControler from "./adminAuthControler";
import blockUsercontroelr from './adninUserBlockControler'
import unBlockUser from './adminUnblockUser'


export default (dependencies: any) => {
  return {
    getAllUsersController:getAllUsersController(dependencies),
    getUserById: getUserById(dependencies),
    loginController:loginController(dependencies),
    RegisterUser:registerController(dependencies),
    logutControler:logoutController(dependencies),
    getUserByEmail:getUserByEmailController(dependencies),
    createRefreshController:createRefreshController(dependencies),
    updateUserUserController:updateUserControler(dependencies),
    adminAuthController:adminAuthControler(dependencies),
    adminBlockUser:blockUsercontroelr(dependencies),
    adminUnblockUser:unBlockUser(dependencies)
  };
};
