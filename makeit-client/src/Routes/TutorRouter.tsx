import { Route, Routes } from "react-router-dom";
import TutorLogin from "../components/Authentication/Tutor/Tutor.Login";
import TutorOtp from "../components/Authentication/Tutor/Tutor.Otp";
import { ErrorComponent } from "../components/ErrorComponents/ErrorComponent";
import TutorRegister from "../components/Authentication/Tutor/Tutor.Register";
import TutorAuth from "../pages/Auth/TutorAuth";
import Profile from "../pages/ProfilepageTutor/Profile";
import Course from "../components/Course/Course.tutor";
import CourseBasicForm from "../components/Forms/Tutor/CourseBasicForm";
import LessoneForm from "../components/Forms/Tutor/LessoneForm";
import SingleCourseView from "../components/Course/SingleCourseView.tutor";
import TutorProtectedRoute from "./TutorProtected";
import SalesHistory from "../components/History/SalesHistory";
import DraftedCourse from "../components/Course/Draftedcourse";
import CourseBasicUpdate from "../components/Forms/Tutor/CourseBasicUpdate";
import UpdateLesson from "../components/Forms/Tutor/UpdateLessonForm";
import Lessoneupdate from "../components/Course/Lessoneupdate";
import ProfileUpdate from "../components/Forms/Common/ProfileUpdate";

function TutorRouter() {
  return (
    <Routes>
      <Route path="/" element={<TutorAuth />}>
        <Route index element={<TutorRegister />} />
        <Route path="login" element={
       
        <TutorLogin />
       
        } />
        <Route path="otp" element={<TutorOtp />} />
        <Route
          path="*"
          element={
            <ErrorComponent
              data={{
                path: "/tutor",
                Message: "Sorry the provided url is not valied",
              }}
            />
          }
        />
      </Route>

      <Route>
        <Route path="/profile" element={
        <TutorProtectedRoute>
       <Profile />
      </TutorProtectedRoute>
        }>
          <Route index  element={
           <TutorProtectedRoute>
            <SalesHistory/>

         </TutorProtectedRoute>
          } />
          <Route
            path="coursebasic"
            element={
              <TutorProtectedRoute>
                <CourseBasicForm />
              </TutorProtectedRoute>
            }
          />
          <Route
            path="courselesson"
            element={
              <TutorProtectedRoute>
                <LessoneForm />
              </TutorProtectedRoute>
            }
          />
        
          <Route
            path="courseview/:id"
            element={
              <TutorProtectedRoute>
                <SingleCourseView />
              </TutorProtectedRoute>
            }
          />
          <Route
            path="profilebasic"
            element={
              <TutorProtectedRoute>
                <ProfileUpdate/>
              </TutorProtectedRoute>
            }
          />
          <Route
            path="courseupdate/:id"
            element={
              <TutorProtectedRoute>
               <CourseBasicUpdate/>
              </TutorProtectedRoute>
            }
          />
          <Route  path="courses"  element={
            <TutorProtectedRoute>
            <Course />
          </TutorProtectedRoute>
          }/>
          <Route  path="sales"  element={
            <TutorProtectedRoute>
           <SalesHistory/>
          </TutorProtectedRoute>
          }/>
          <Route  path="drafted"  element={
            <TutorProtectedRoute>
            < DraftedCourse/>
          </TutorProtectedRoute>
          }/>
          <Route  path="lessonupdate/:id"  element={
            <TutorProtectedRoute>
            <Lessoneupdate/>
          </TutorProtectedRoute>
          }/>
        </Route>
      </Route>
    </Routes>
  );
}
// courseupdate

export default TutorRouter;
