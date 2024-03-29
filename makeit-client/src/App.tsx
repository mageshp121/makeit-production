import { Route, Routes} from "react-router-dom";
import Eor from "./pages/Error/Eor";
import UserRouter from "./Routes/UserRouter";
import TutorRouter from "./Routes/TutorRouter";
import 'flowbite';
import mixpanel from "mixpanel-browser";
import AdminRoute from "./Routes/AdminRoute";



const MIXPANELTOKEN = import.meta.env.VITE_MIX_PANEL_PROJECT_TOKEN 
mixpanel.init(MIXPANELTOKEN,{
    debug:true
})




function App() {
  
  return (
    <div className="bg-[#f3f2f0]">
    <Routes>
      <Route path="/*" element={<UserRouter />} />
      <Route path="tutor/*" element={<TutorRouter />} />
      <Route path="super/*" element={<AdminRoute/>} />
      <Route path="*" element={<Eor />} />
    </Routes>
    </div>
  ); 
}

export default App;
