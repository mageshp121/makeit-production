import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Otpfomevalue, Userdata, users } from "../../../utils/types/types";
import { useEffect, useState, useRef } from "react";
import { authentication } from "../../../utils/config/firebase";
import { useSendOtp, useVerifyOtp } from "../../../utils/customHooks/hook";
import {
  UseCommen,
  UseSomthingWentWrong,
  useOtpSubmit,
} from "../../../utils/toastify/toasty";
import { useNavigate } from "react-router-dom";
import { UsegenerateRecaptcha } from "../../../utils/customHooks/hook";
import { useSelector } from "react-redux";
import store from "../../../utils/ReduxStore/store/Store";
import React from "react";
import { number } from "zod";

function OTP() {
  const [count, setCount] = useState(1);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [userData, setUserData] = useState({}) as any;
  const [otpControler, setOtpControler] = useState(false);
  const userdata:any = useSelector((store:any)=>{
    return store.user.userData
   })
  const navigate = useNavigate();
  const isMountedRef = useRef(false);

  const phoneNumber = userdata.phone
  const number =  "+91" +phoneNumber.toString() 
  const { register, control, handleSubmit } = useForm<Otpfomevalue>();
  const resendOTP = () => {
    isMountedRef.current = false;
    setOtpControler(true);
    setMinutes(1);
    setSeconds(30);
  };

  useEffect(() => {
    console.log("recatptcha verifier useEffect");
    UsegenerateRecaptcha(authentication);
  }, []);

  useEffect(() => {
    if (!isMountedRef.current) {
      console.log("useEffect calling ");
      if (window.recaptchaVerifier) {
        let appVerifier = window.recaptchaVerifier;
        useSendOtp(authentication, number, appVerifier);
      }
      isMountedRef.current = true;
    }
  }, [otpControler, isMountedRef.current, resendOTP]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const fromSubit = async (data: Otpfomevalue) => {
    setCount(count + 1);
    if (count <= 2) {
      console.log("verification funcation");
      await useVerifyOtp(data)
        .then((response) => {
          console.log(response, "response");
          if (response.sucess) navigate("/",{replace:true});
        })
        .catch((_err) => {
          UseCommen('Invalid OTP Please check the OTP')
        });
    } else {
      useOtpSubmit("otp already submited please wait a second");
    }
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex  justify-center  flex-1 max-w-screen-xl   sm:rounded-lg">
        <div className="flex-1 md:hidden text-center lg:flex">
          <div
            className="w-full m-12 bg-center bg-no-repeat bg-contain xl:m-16"
            style={{ backgroundImage: "url(/register-img.png)" }}
          />
        </div>
        <div className=" lg:w-1/2 pt-52 xl:w-5/12 p-14 ">
          <div className="flex flex-col items-center mt-4">
            <h3 className="text-xl font-medium pb-8 xl:text-3xl">
              Otp verification
            </h3>
            <div className="flex-1 w-full ">
              <div className="max-w-xs  mx-auto">
                <form onSubmit={handleSubmit(fromSubit)} noValidate>
                  <input
                    className="w-full px-6 py-4 mt-5 text-sm font-medium placeholder-gray-500  bg-neutral-200  border border-gray-200 rounded-lg  focus:ring-teal-500 focus:border-teal-500 custom-outline-none"
                    type="email"
                    placeholder="OTP"
                    {...register("password", {
                      required: "otp is required",
                      maxLength: {
                        value: 6,
                        message: "OTP must be maximum 6 digits",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "OTP must contain only numbers",
                      },
                    })}
                  />
                  <input
                    type="submit"
                    className="flex bg-teal-600 items-center justify-center w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 ease-in-out rounded-lg focus:shadow-outline focus:outline-none"
                  />
                </form>
                <div className="countdown-text">
                  {seconds > 0 || minutes > 0 ? (
                    <p>
                      Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  ) : (
                    <p>Didn't recieve code?</p>
                  )}
                  <button
                    disabled={seconds > 0 || minutes > 0}
                    style={{
                      color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                    }}
                    onClick={resendOTP}
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            </div>
            <div id="recaptcha-container"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(OTP);
