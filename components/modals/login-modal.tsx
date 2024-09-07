import { useLoginModal } from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Modal from "../modal";
import Input from "../input";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/validation";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onToggle = useCallback(() => {
    if (isLoading) return;

    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, isLoading, loginModal]);

  const onSubmit = useCallback(
    async (data: z.infer<typeof loginSchema>) => {
      try {
        setIsLoading(true);

        const response = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (response?.error)
          return toast.error("User information is incorrect!");

        loginModal.onClose();
        toast.success("Log in successfully");
        return router.push("/");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    },
    [loginModal, router]
  );

  const bodyContent = (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="Email"
        type="email"
        disabled={isLoading}
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        type="password"
        placeholder="Password"
        disabled={isLoading}
        {...register("password")}
        error={errors.password?.message}
      />
    </form>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center ml-4">
      <p>
        First time using Twitter?{" "}
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign In"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
