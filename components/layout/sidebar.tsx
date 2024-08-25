import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { BsBellFill, BsHouseFill, BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import SidebarLogo from "./sidebar-logo";
import SidebarItem from "./sidebar-item";
import SidebarTweetButton from "./sidebar-tweet-button";

const Sidebar = () => {
  const { data: currentUser } = useCurrentUser();

  const sidebarItems = [
    { label: "Home", href: "/", icon: BsHouseFill },
    { label: "Search", href: "/search", icon: BsSearch },
    {
      label: "Notifications",
      href: "/notifications",
      icon: BsBellFill,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-0 md:pr-6">
      <div className="flex flex-col items-center md:items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SidebarLogo />
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              alert={item.alert}
            />
          ))}

          {currentUser && (
            <SidebarItem
              onClick={() => signOut()}
              icon={BiLogOut}
              label="Logout"
            />
          )}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
