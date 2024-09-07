import { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import Modal from "../modal";
import Input from "../input";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { registerSchema } from "@/schema/validation";

const RegisterModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, isLoading, loginModal]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof registerSchema>) => {
      try {
        setIsLoading(true);

        await axios.post("/api/register", {
          ...data,
          username: data.username.toLowerCase(),
        });

        await signIn("credentials", {
          email: data.email,
          password: data.password,
        });

        registerModal.onClose();
        toast.success("Account created successfully!");
        return router.push("/");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [registerModal, router]
  );

  const bodyContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        type="email"
        disabled={isLoading}
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        placeholder="Full Name"
        type="text"
        disabled={isLoading}
        {...register("name")}
        error={errors.name?.message}
      />
      <Input
        placeholder="Username"
        type="text"
        disabled={isLoading}
        {...register("username")}
        error={errors.username?.message}
      />
      <Input
        placeholder="Password"
        type="password"
        disabled={isLoading}
        {...register("password")}
        error={errors.password?.message}
      />
    </form>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center ml-4">
      <p>
        Alredy have an account?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      footer={footerContent}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
