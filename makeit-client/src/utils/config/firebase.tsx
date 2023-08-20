
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAudBDTaYPZYSpU7MhLS6ilEhv1qK4ot-Q",
  authDomain: "makeit-client.firebaseapp.com",
  projectId: "makeit-client",
  storageBucket: "makeit-client.appspot.com",
  messagingSenderId: "905352299094",
  appId: "1:905352299094:web:0cd1e2b55aedfaefc6f1f7",
  measurementId: "G-ZQ82JB89V4"
};


export const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app)
export  const provider  = new GoogleAuthProvider()
