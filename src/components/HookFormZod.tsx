import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function HookFormZod() {
  const signUpSchema = z
    .object({
      email: z.string().email().toLowerCase(),
      user: z
        .string()
        .min(3, { message: "User must be at least 3 characters" })
        .regex(/^[a-zA-Z0-9]+$/, { message: "User must be alphanumeric" }),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  type SignUpForm = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="px-4 py-2 rounded"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <input
        {...register("user")}
        type="text"
        placeholder="User"
        className="px-4 py-2 rounded"
      />
      {errors.user && <p>{errors.user.message}</p>}
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="px-4 py-2 rounded"
      />
      {errors.password && <p>{errors.password.message}</p>}
      <input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm password"
        className="px-4 py-2 rounded"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Send
      </button>
    </form>
  );
}
