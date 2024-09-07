import React from "react";
import { IoIosLock } from "react-icons/io";

const UserPrivateUi = () => {
  return (
    <div className="h-52 w-full flex justify-center items-center">
      <div className="flex flex-col items-center">
        <IoIosLock size={35} className="text-white/90" />
        <span className="text-white mt-3 text-xl">Account is private!</span>
        <p className="text-neutral-400">
          Only followers will be able to see this...
        </p>
      </div>
    </div>
  );
};

export default UserPrivateUi;
