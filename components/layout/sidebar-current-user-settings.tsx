import useCurrentUser from "@/hooks/useCurrentUser";
import Avatar from "../avatar";
import { IoIosLock } from "react-icons/io";
import { Menu, MenuButton, MenuItems, Switch } from "@headlessui/react";
import { CiMenuKebab } from "react-icons/ci";
import usePrivate from "@/hooks/usePrivate";

const SidebarCurrentUserSettings = () => {
  const { data: currentUser } = useCurrentUser();
  const { hasPrivate, togglePrivate, isLoading } = usePrivate();

  return (
    <>
      {currentUser && (
        <Menu>
          <MenuButton>
            <div className="text-white p-2 hover:bg-slate-300 hover:bg-opacity-10 transition rounded-full cursor-pointer">
              <div className="flex gap-2 items-center px-1">
                <div className="hidden md:block">
                  <Avatar userId={currentUser.id} notClicked />
                </div>
                <div className="hidden lg:flex flex-col gap-0 items-start flex-1">
                  <div className="flex gap-1 w-full">
                    <p className="font-semibold leading-6 line-clamp-1">
                      {currentUser?.name}
                    </p>
                    {hasPrivate && <IoIosLock size={20} className="" />}
                  </div>
                  <p className="text-neutral-500 text-sm leading-5">
                    @{currentUser?.username}
                  </p>
                </div>
                <CiMenuKebab className="size-4 fill-white/60 rotate-90 mx-auto" />
              </div>
            </div>
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom end"
            className="w-56 origin-top-right rounded-xl shadow-md border border-white/5 bg-white/5 px-3 py-2 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div className={`${isLoading && "opacity-80 cursor-not-allowed"}`}>
              <span className="w-full mb-2 text-neutral-400 block font-semibold">
                Account Settings
              </span>
              <div className="flex justify-between gap-1">
                <span>Private</span>
                <Switch
                  disabled={isLoading}
                  checked={hasPrivate}
                  onChange={togglePrivate}
                  className="group relative flex h-6 w-12 cursor-pointer rounded-full bg-white/10 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/80"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-6 group-data-[checked]:bg-sky-500"
                  />
                </Switch>
              </div>
            </div>
          </MenuItems>
        </Menu>
      )}
    </>
  );
};

export default SidebarCurrentUserSettings;
