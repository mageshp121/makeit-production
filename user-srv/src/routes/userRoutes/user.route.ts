import express  from "express"
import { profileController } from "../../libs/controllers";
import { RegistrationDataValidation } from "../../libs/utils/validations/formDataValidation";
import multer from 'multer'
import { validateRequest,jwtauthentication } from "@makeitcmn/comon";
import dotenv from 'dotenv'
dotenv.config()
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

const secret:any = {
        refreshToken : process.env.REFRESH_JWT_SECRETEKEY,
        accessToken : process.env.ACCESS_JWT_SECRETEKEY
        
    }



export default (dependencies:any)=>{
    const router =  express.Router();
    const {getAllUsersController,getUserById,loginController,RegisterUser,logutControler,getUserByEmail,createRefreshController,updateUserUserController,adminAuthController,adminUnblockUser,adminBlockUser} = profileController(dependencies)
    // Get Methodes
    router.get("/allusers",getAllUsersController);
    router.get('/logout',logutControler);
    router.get("/users/:id",getUserById);
    router.get("/user/email",getUserByEmail);
    router.get('/refresh',createRefreshController);
    // Post Methods
    router.post('/login',loginController);
    router.post('/register',RegistrationDataValidation,validateRequest,RegisterUser);
    router.post('/admin/auth',adminAuthController);
    router.post('/admin/user/block/:id',adminBlockUser);
    // Put Methods
    router.put("/updateprofile",jwtauthentication(secret),upload.single("userimage"),updateUserUserController);
    // patch Methods
    router.patch("/admin/user/unBlock/:id",adminUnblockUser)
    return router
} 