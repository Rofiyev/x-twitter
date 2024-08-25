import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface Props {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  alert?: boolean;
}

const SidebarItem: FC<Props> = ({
  href,
  icon: Icon,
  label,
  onClick,
  alert,
}) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    if (onClick) return onClick();

    if (href) router.push(href);
  }, [onClick, router, href]);

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      <div className="relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
        <Icon size={28} color={"white"} />
        {alert && (
          <BsDot size={70} className="text-sky-500 absolute -top-4 left-0" />
        )}
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={28} color={"white"} />
        <p className="hidden lg:block text-white text-xl">{label}</p>
        {alert && (
          <BsDot size={70} className="text-sky-500 absolute -top-4 left-0" />
        )}
      </div>
    </div>
  );
};

export default SidebarItem;
