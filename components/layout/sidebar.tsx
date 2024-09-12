import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import { BiLogOut } from "react-icons/bi";
import { BsBellFill, BsHouseFill, BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import SidebarLogo from "./sidebar-logo";
import SidebarItem from "./sidebar-item";
import SidebarTweetButton from "./sidebar-tweet-button";
import SidebarCurrentUserSettings from "./sidebar-current-user-settings";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
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
    <div className="col-span-1 pr-0 md:pr-6">
      <div className=" h-full flex flex-col items-center md:items-end">
        <div className="space-y-2 lg:w-[250px] !flex flex-col justify-between h-full pb-2">
          <div className="flex lg:block flex-col items-center">
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
                onClick={() => {
                  signOut();
                  sessionStorage.clear();
                  return router.refresh();
                }}
                icon={BiLogOut}
                label="Logout"
              />
            )}

            <SidebarTweetButton />
          </div>
          <SidebarCurrentUserSettings />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
