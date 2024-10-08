import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import Button from "./Button";
import Form from "./Form";

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register("email")} type="email" placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <Input {...register("user")} type="text" placeholder="User" />
      {errors.user && <p>{errors.user.message}</p>}

      <Input {...register("password")} type="password" placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}

      <Input
        {...register("confirmPassword")}
        type="password"
        placeholder="Confirm password"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <Button type="submit" disabled={isSubmitting}>
        Send
      </Button>
    </Form>
  );
}
