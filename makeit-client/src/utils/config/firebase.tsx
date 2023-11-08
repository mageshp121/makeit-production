
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyAudBDTaYPZYSpU7MhLS6ilEhv1qK4ot-Q",
//   authDomain: "makeit-client.firebaseapp.com",
//   projectId: "makeit-client",
//   storageBucket: "makeit-client.appspot.com",
//   messagingSenderId: "905352299094",
//   appId: "1:905352299094:web:0cd1e2b55aedfaefc6f1f7",
//   measurementId: "G-ZQ82JB89V4"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDv4w8L5sURwzGjsvSPIw09WBAeZfg2idY",
  authDomain: "makeit-b3f20.firebaseapp.com",
  projectId: "makeit-b3f20",
  storageBucket: "makeit-b3f20.appspot.com",
  messagingSenderId: "367181709182",
  appId: "1:367181709182:web:eaf76ff51179620db13d2f",
  measurementId: "G-RPVJJX68LQ"
};
export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)
export  const provider  = new GoogleAuthProvider()
