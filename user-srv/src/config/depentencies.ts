import { getAllUser_useCase,createUser_useCase,  getUserBy_Id_useCase,loginUser_usecase,getUserByEmail_useCase,CreateRefresh_usecase,updateUser_usecase,adminAuth_UseCase } from "../libs/useCase";
import { userRepository } from '../libs/app/repository/index'

const useCase:any = {
    createUser_useCase,
    getAllUser_useCase,
    getUserBy_Id_useCase,
    loginUser_usecase,
    getUserByEmail_useCase,
    CreateRefresh_usecase,
    updateUser_usecase,
    adminAuth_UseCase
}


const repository:any={
      userRepository
}

export default { useCase, repository }