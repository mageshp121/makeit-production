import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export type category = {
  category: string;
};

export const schema: ZodType<category> = z.object({
  category: z
    .string()
    .min(5, { message: "category Name atleast 5 character" })
    .max(20, { message: "category Name cannot excced" }),
});
export const useCategoryValidate = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<category>({ resolver: zodResolver(schema) });
  return {
    register,
    handleSubmit,
    errors,
    reset
    
  };
};
