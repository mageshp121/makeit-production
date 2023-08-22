import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { ProfileUpdation } from '../../types/types'


export type ProfileUpdation = {
  firstName:string
  lastName:string
  email:string
  userimage?:any
}

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", " image/png", "image/webp"];

export const profileUpdateSchema  : ZodType<ProfileUpdation> = z.object({
    firstName: z
    .string()
    .min(2, {
      message: "Firstname must contain at least 2 characters",
    })
    .max(30, { message: "First Name cannot exceed 30 characters" })
    .regex(/^[A-Za-z]+$/, {
      message: "First Name must contain only alphabetic characters",
    }),
    lastName: z
      .string()
      .min(1, { message: "Lastname must contain at least 1 characters" })
      .max(30, { message: "LastName cannot exceed 30 characters" })
      .regex(/^[A-Za-z]+$/, {
        message: "Last Name must contain only alphabetic characters",
      }),
      email: z.string().email({
        message: "Please provide a valid email address",
      }),

      userimage: z
      .any()
      .refine(
        (file) =>{
            console.log(file,'fileeeeeeeeeeee');
            if (file.length === 0) {
            console.log("if log");
            
                // No validation needed if the file is not present
                return true;
              }
              console.log('if out log');
              
           return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type)
        }, 
        `Only .jpg, .jpeg, .png and .webp formats are supported.`
      ).optional().nullable(),
})


export const useProfileUpdateValidate = () => {
  const {register,handleSubmit,formState:{errors},} = useForm<ProfileUpdation>({resolver:zodResolver(profileUpdateSchema)})  
  return {
    register,
    handleSubmit,
    errors,
  }
}

// import { z, ZodType } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// export type LoginFormData = {
//   email: string;
//   password: string;
// };

// export const schema: ZodType<LoginFormData> = z.object({
//   email: z.string().email({ message: "Please provide a valid email address" }),
//   password:z.string().min(5,{message:"Please enter password"})
// });

// export const useValidate = () => {
//   const {register,handleSubmit,formState:{errors}} = useForm<LoginFormData>({resolver:zodResolver(schema)})
//   return {
//     register,
//     handleSubmit,
//     errors
//   }
// }



