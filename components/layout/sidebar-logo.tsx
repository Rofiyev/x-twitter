import { useRouter } from "next/router";
import { FaXTwitter } from "react-icons/fa6";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      className="rounded-full h-14 w-14 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-default transition"
    >
      <FaXTwitter size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;
