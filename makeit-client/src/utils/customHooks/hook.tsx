import {
  signInWithPhoneNumber,
  ApplicationVerifier,
  Auth,
  signInWithPopup,
} from "firebase/auth";
import { UseCommen, UseCommenError, useOtpSubmit } from "../toastify/toasty";
import { Otpfomevalue, usersProp } from "../types/types";
import { RecaptchaVerifier, UserCredential } from "firebase/auth";
import { provider } from "../config/firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addtoken,cleartoken } from "../ReduxStore/slices/tokenSlice";
import { clearUser} from "../ReduxStore/slices/userSlice"
import { axiosPrivet } from "../api/baseUrl/axios.baseUrl";
import { useEffect } from "react";
import client from "../api/baseUrl/axios.baseUrl";
import { Cart_Api, getRefersh } from "../api/endPoints/commen";
import { useNavigate } from "react-router-dom";

// This hook joins the object of strings and convertes into number
export const useConvertString = (data: object) => {
  const concatenatedValue = Object.values(data).join(""); // joins all the valuee
  return concatenatedValue;
};

export const useSendOtp = (
  auth: Auth,
  number: string,
  appVerifier: ApplicationVerifier
) => {
  console.log(typeof number);
  console.log(number, "number");
  console.log(auth,"------", number," ++++++++ " ,appVerifier);
  
  signInWithPhoneNumber(auth, number, appVerifier)
  
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
    })
    .catch((error) => {
      console.log(error);
      return useOtpSubmit(
        "sorry too many attempts please try after some times"
      );
    });
};

export const UsegenerateRecaptcha = (auth: Auth) => {
  window.recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "invisible",
    },
    auth
  );
};


export const useVerifyOtp = async (data: Otpfomevalue): Promise<any> => {
  let otp = useConvertString(data);
  if (otp.length === 6) {
    console.log(otp, "otp");
    let confirmationResult = window.confirmationResult;
    return new Promise((resolve, reject) => {
      confirmationResult
        .confirm(otp)
        .then((result: any) => {
          resolve({ sucess: true, data: result });
        })
        .catch((error: any) => {
          console.log(error);
          reject({ status: false });
        });
    });
  }
};



export const useGoogleSignIn = async (auth: Auth): Promise<any> => {
  return new Promise((resolve, reject) => {
    console.log("promise entered");
    signInWithPopup(auth, provider)
      .then((result: UserCredential) => {
        console.log("working");
        resolve({
          status: true,
          userEmail: result.user.email,
          userProfileImageGooleUrl: result.user.photoURL,
        });
      })
      .catch((eror: any) => {
        console.log(eror, "error");
        reject(eror);
      });
  });
};

// custom hook for getting newaccess token using refresh token
export const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refreshtoken: any = localStorage.getItem("Token");
  const refresh = async () => {
    const headers = {
      authorization: `Bearer ${refreshtoken}`,
      "Content-Type": "application/json",
    };
    try {
      const responase: any = await client().get(getRefersh, { headers });
      dispatch(addtoken(responase.data));
      return responase.data;
    } catch (error) {
      console.log(error, "error");
    }
  };
  return refresh;
};

// axios intercepter hook
export const useAxiosePrivate = () => {
  const refersh = useRefreshToken();
  const accesToken = useSelector((store: any) => store.token.token);
  useEffect(() => {
    // request interceptor
    const requestIntercept = axiosPrivet.interceptors.request.use(
      (config: any) => {
        console.log(accesToken, "acceeeeeeeeee");

        console.log("requsrr inter");
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accesToken}`;
        }

        if (shouldAttachMultipartHeader(config)) {
          config.headers["Content-Type"] = "multipart/form-data";
          config.isMultipartHeaderAdded = true;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );
    // resposns interceptors
    const responaseIntercept = axiosPrivet.interceptors.response.use(
      (reponse) => reponse,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refersh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          if (prevRequest.isMultipartHeaderAdded) {
            prevRequest.headers["Content-Type"] = "multipart/form-data";
          }
          return axiosPrivet(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivet.interceptors.request.eject(requestIntercept);
      axiosPrivet.interceptors.response.eject(responaseIntercept);
    };
  }, [accesToken, refersh]);

  return axiosPrivet;
};

// funcation that checks the methodes and urls for ataching multipart form data hearder
const shouldAttachMultipartHeader = (config: any) => {
  const isPostMethod = config.method === "post";
  const isPatchMethod = config.method === "patch";
  const isPutMethod = config.method === "put";
  const urlIncludesMultipartEndpoint1 = config.url.includes(
    "/api/course/courses"
  );
  const urlIncludesMultipartEndpoint2 = config.url.includes(
    "/api/course/lessones"
  );
  const urlIncludesMultipartEndpoint3 = config.url.includes(
    "/api/course/updatecourse"
  );
  const urlIncludesMultipartEndpoint4 = config.url.includes(
    "/api/course/updatelessones"
  );
  const urlIncludesMultipartEndpoint5 = config.url.includes(
    "/api/users/updateprofile"
  );
  const shouldAttach =
    (isPostMethod || isPatchMethod || isPutMethod) &&
    (urlIncludesMultipartEndpoint1 ||
      urlIncludesMultipartEndpoint2 ||
      urlIncludesMultipartEndpoint3 ||
      urlIncludesMultipartEndpoint4 ||
      urlIncludesMultipartEndpoint5);
  return shouldAttach;
};

export const useAddTocart = () => {
  const userdata: usersProp = useSelector((store: any) => {
    return store.user.userData;
  });
  const axiosPrivet = useAxiosePrivate();
  const navigate = useNavigate();
  const handleAddtocart = async (courseId: string) => {
    if (userdata._id) {
      const requestData = {
        userId: userdata._id,
        cartProductId: courseId,
      };
      try {
        const response = await axiosPrivet.post(Cart_Api, requestData, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.data.created || response.data.updated) {
          return UseCommen("Corse added into cart");
        } else if (response.data.ProductPresent) {
          UseCommenError("Sorry the Course is already present in the cart");
          return navigate(`/cart/${userdata._id}`);
        } else {
        }
      } catch (error) {
        return console.log(error, "errororor");
      }
    } else {
      navigate("/auth/login");
    }
  };
  return handleAddtocart;
};

export const useLogout = () => {
  const dispatch = useDispatch()
  const SignOUt = () => {
    localStorage.removeItem("Token");
    dispatch(cleartoken());
    dispatch(clearUser())
  };
  return SignOUt;
};
