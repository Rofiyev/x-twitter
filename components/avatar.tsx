import { FC, useCallback } from "react";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/router";
import userImage from "@/public/images/user.png";
import { MdVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa";

interface Props {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  notClicked?: boolean;
  isSmall?: boolean;
}

const Avatar: FC<Props> = ({
  userId,
  hasBorder,
  isLarge,
  notClicked,
  isSmall,
}) => {
  const router = useRouter();
  const { data: fetchedUser } = useUser(userId);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (notClicked) return;

      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId, notClicked]
  );

  return (
    <div
      className={`
      ${hasBorder && "border-4 border-black"}
      ${isLarge ? "h-32" : "h-12"}
      ${isLarge ? "w-32" : "w-12"}
      ${isSmall && "h-8"}
      ${isSmall && "w-8"}
      rounded-full hover:opacity-90 transition cursor-pointer relative
      `}
    >
      <Image
        src={fetchedUser?.profileImage || userImage}
        onClick={onClick}
        fill
        style={{ objectFit: "cover", borderRadius: "100%" }}
        alt="Avatar"
        className="bg-black"
      />
      {fetchedUser?.username === process.env.NEXT_PUBLIC_ADMIN_KEY && (
        <MdVerified
          size={isLarge ? 32 : isSmall ? 12 : 16}
          className={`absolute z-10 
            ${isLarge ? "bottom-1" : "bottom-0"}
            ${isLarge ? "right-1" : "right-0"}
             text-sky-500`}
        />
      )}
      {fetchedUser?.username === process.env.NEXT_PUBLIC_SOCIAL_KEY && (
        <FaStar
          size={isLarge ? 32 : isSmall ? 12 : 16}
          className={`absolute z-10 
            ${isLarge ? "bottom-1" : "bottom-0"}
            ${isLarge ? "right-1" : "right-0"}
             text-yellow-500`}
        />
      )}
    </div>
  );
};

export default Avatar;
