import { RecaptchaVerifier } from "firebase/auth";
import { RegisterFormData } from "../formvalidations/CommonCode/register";
import { FieldErrors } from "react-hook-form";

export type Otpfomevalue = {
  password: string;
};

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: any;
  }
}

export interface userSlice {
  user: { userData: { firstName?: string } };
}

export interface propsType {
  errors: FieldErrors<RegisterFormData>;
}

export interface ErrorData {
  path: string;
  Message: string;
}

export interface ErrorComponentProps {
  data: ErrorData;
}

export interface Course {
  _id: string;
}

export interface CourseState {
  courseData: Course[];
}

export interface CourseId {
  course: {
    courseData: [];
  };
}

export interface lessone {
  order: number;
}

export interface lessoneDataOrder {
  lessoneDataOrder: lessone;
}

export interface lessonState{
  lessone:{
    lessoneDataOrder:any
  }
}


export interface LessoneType {
  _id:string,
  lessoneS3UrlKey:string,
  lessoneTitle:string,
  lessoneOrder:number,
  tutorId:string,
  courseId:string

}

export interface CourseRes  {
_id:string
WorkingTitle:string,
ShortDescription:string,
Description:string,
Category:string,
tutorId:string,
thumbNailImageS3UrlKey:string,
WhatWilllearn1:string,
WhatWilllearn2:string,
WhatWilllearn3:string,
WhatWilllearn4:string,
WhoIsThiscourseFor:string,
prerequesties1:string,
prerequesties2:string,
CoursePrice:number,
drafted:boolean
}   

export interface Userdata {
  _id :string, 
  firstName : string,
  lastName: string,
  email:string,
  phone:number,
  password:string,
  roll:string
  isOtPVerified:boolean
}

export interface users {
  user:{
    userData:{}
  }
}

export interface googleData{
  status : boolean
  userEmail: string | null
  userProfileImageGooleUrl : string | null
}

export type usersProp =  {
  _id:string;
  firstName:string;
  lastName:string;
  email:string;
  phone:number;
  password:string;
  roll:string;
  otpVerify:boolean
  profileImage:string
  s3ImageUrl:string
} 


