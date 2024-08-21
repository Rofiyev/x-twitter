import { useRouter } from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import { useLoginModal } from "@/hooks/useLoginModal";

const SidebarTweetButton = () => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const handleClick = useCallback(() => {
    // loginModal.onOpen();
  }, [loginModal]);

  return (
    <div onClick={handleClick}>
      <div className="mt-6 lg:hidden rounded-full w-12 h-12 p-4 flex items-center justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer">
        <FaFeather size={24} color="white" />
      </div>
      <div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500  transition cursor-pointer">
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Post
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
