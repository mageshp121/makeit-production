import { OK, z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Course basic data uploading form data type
export type CourseUpdate = {
  WorkingTitle: string;
  Category: string;
  WhatWilllearn1: string;
  WhatWilllearn2: string;
  WhatWilllearn3: string;
  WhatWilllearn4: string;
  CoursePrice: string;
  ThumbnailImage?:any;
  Description: string;
  ShortDescription: string;
  prerequesties1: string;
  prerequesties2: string;
  WhoIsThiscourseFor: string;
};


const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", " image/png", "image/webp"];

// Zod validation schema
const schema: ZodType<CourseUpdate> = z.object({
  WorkingTitle: z.string() .min(20, {
    message: "Working title must contain at least 20 characters",
  })
  .max(35, {
    message: "Working title cannot exceed 35 characters",
  }),
  Category: z.string().min(1, {
    message: "Category is required",
  }),
  WhatWilllearn1: z.string().min(5, {
    message: "Must contain at least 5 characters",
  })
  .max(20, {
    message: "Cannot exceed 20 characters",
  }),
  WhatWilllearn2: z.string().min(5, {
    message: "Must contain at least 5 characters",
  })
  .max(20, {
    message: "Cannot exceed 20 characters",
  }),
  WhatWilllearn3: z.string().min(5, {
    message: "Must contain at least 5 characters",
  })
  .max(20, {
    message: "Cannot exceed 20 characters",
  }),
  WhatWilllearn4: z.string().min(5, {
    message: "Must contain at least 5 characters",
  })
  .max(20, {
    message: "Cannot exceed 20 characters",
  }),
  CoursePrice: z.string(),
  ThumbnailImage: z
  .any()
  .refine(
    (file) =>{
        console.log(file,'fileeeeeeeeeeee');
        
        if (file.length === 0) {
            // No validation needed if the file is not present
            return true;
          }
       return ACCEPTED_IMAGE_TYPES.includes(file[0]?.type)
    }, 
    `Only .jpg, .jpeg, .png and .webp formats are supported.`
  ).optional().nullable(),
  Description: z.string().min(50, {
    message: "Description must contain at least 50 characters",
  })
  .max(500, {
    message: "Cannot exceed 500 characters",
  }),
  ShortDescription: z.string().min(50, {
    message: "Short description must contain at least 50 characters",
  })
  .max(100, {
    message: "Cannot exceed 100 characters",
  }),
  prerequesties1: z.string().min(10, {
    message: "Prerequisites must contain at least 10 characters",
  })
  .max(40, {
    message: "Cannot exceed 40 characters",
  }),
  prerequesties2: z.string().min(10, {
    message: "Prerequisites must contain at least 10 characters",
  })
  .max(40, {
    message: "Cannot exceed 40 characters",
  }),
  WhoIsThiscourseFor: z.string().min(1, {
    message: "Who is this course for is required",
  }),
  
});



// Custom Hook
export const useCourseBasicUpdateValidate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<CourseUpdate>({ resolver: zodResolver(schema) });
  return {
    register,
    handleSubmit,
    errors,
    setValue
  };
};
