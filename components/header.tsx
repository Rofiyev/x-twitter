import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface Props {
  label: string;
  showBackArrow?: boolean;
}

const Header: FC<Props> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-4">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleClick}
            size={20}
            color="white"
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-white text-xl pt-1 font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
