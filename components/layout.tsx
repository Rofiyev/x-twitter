import { FC, ReactNode } from "react";
import Sidebar from "./layout/sidebar";
import FollowBar from "./layout/follow-bar";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen bg-black">
      <div className="container h-full mx-auto px-0 xl:px-30 max-w-7xl">
        <div className="grid grid-cols-7 lg:grid-cols-4 h-full">
          <Sidebar />
          <div className="col-span-6 lg:col-span-2 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
