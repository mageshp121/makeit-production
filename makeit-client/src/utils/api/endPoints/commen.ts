



 // user_microservice related api endpoints
export const Register_Api = "/api/user/register"
export const Login_Api = "/api/user/login"
export const getUserById = "/api/user/users/"
export const getUserByemail = "/api/user/user/email?email="
export const getRefersh = "/api/user/refresh"
export const udpdateuser = "/api/user/updateprofile"
export const getAllusers = "/api/user/allusers"
export const AdminAuth = "/api/user/admin/auth"
export const BlockUser = '/api/user/admin/user/block/'
export const UnblockUser = "/api/user/admin/user/unBlock/"
// course_microservice related api endpoints
export const Create_Course_Api ="/api/course/courses"
export const FetchCourseData_With_TutorId = "/api/course/courses/"
export const Create_lessoneApi ="/api/course/lessones"
export const FetchLessons_With_Courseid = "/api/course/lessones/"
export const FetchCourse_By_Id = "/api/course/course/"
export const Fetch_all_Courses = "/api/course/courses/"
export const Publish_Cours = "/api/course/pub/"
export const Update_course = "/api/course/updatecourse"
export const Category = "/api/course/category"
export const Delete_Category = "/api/course/deletcategory/"
// purchase_microservice related api endpoints
export const Cart_Api = "/api/purchase/cart"
export const Cart_Get_Api = "/api/purchase/cart/get/"
export const Remove_From_Cart_Api = "/api/purchase/cart/remove"
export  const MakePayemnt_Api = "/api/payment/checkout"
export const GetRazorPayKet_Api = "/api/payment/getway"
export const Verify_Payment_Api = "/api/payment/verify"
export const GetPurhcaseHistoryUser_Api = "/api/history/user/purchase/get/"
export const GetPurhcaseHistoryTutor_Api = "/api/history/tutor/purchase/get/"
export const GetPurchasedCourse_Api = "/api/history/user/purchase/get/course/"