import { Work_Sans } from "next/font/google";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import Image from "next/image";
import { signIn } from "next-auth/react";

const work_sans = Work_Sans({ weight: "700", subsets: ["latin"] });

const Form = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="text-white px-4 md:px-0">
      <div className="block md:hidden mb-2">
        <Image
          width={50}
          height={50}
          src="/images/x-logo.png"
          alt="X-logo"
          className="cursor-pointer"
          style={{
            objectFit: "contain",
            filter:
              "brightness(0) saturate(100%) invert(97%) sepia(54%) saturate(223%) hue-rotate(176deg) brightness(98%) contrast(88%)",
          }}
        />
      </div>
      <h1
        className={`text-gray-300 text-6xl md:text-7xl font-bold mb-4 md:mb-12 ${work_sans.className} -tracking-wider`}
      >
        Happening now
      </h1>
      <h3
        className={`text-gray-300 text-2xl md:text-4xl ${work_sans.className}`}
      >
        Join today.
      </h3>
      <div className="w-full mx-auto md:mx-0 md:w-3/4">
        <div className="w-full mt-8 flex flex-col gap-2">
          <button
            onClick={() => signIn("google")}
            className="rounded-full w-full bg-gray-100 hover:opacity-85 py-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FcGoogle size={24} />
            <span className="text-black font-semibold">
              Sign up with Google
            </span>
          </button>
          <button
            onClick={() => signIn("github")}
            className="rounded-full w-full bg-gray-100 hover:opacity-85 py-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaGithub size={24} className="text-gray-950" />
            <span className="text-black font-semibold">
              Sign up with Github
            </span>
          </button>
        </div>
        <div className="flex flex-row gap-2 mt-2 items-center">
          <div className="h-[1px] bg-neutral-700 w-full" />
          <span className="text-gray-400 font-semibold">or</span>
          <div className="h-[1px] bg-neutral-700 w-full" />
        </div>
        <div className="mt-4">
          <button
            onClick={registerModal.onOpen}
            className="rounded-full font-semibold w-full bg-sky-500 hover:opacity-85 py-2 cursor-pointer"
          >
            Create Account
          </button>
        </div>
        <div className="text-neutral-400 mt-[6px]">
          <p className="text-sm font-medium">
            Already have an account?{" "}
            <span
              onClick={loginModal.onOpen}
              className="text-sky-500 font-semibold cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Form;
