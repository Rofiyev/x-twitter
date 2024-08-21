import Image from "next/image";
import { FC } from "react";
import useUser from "@/hooks/useUser";
import Avatar from "../avatar";

interface Props {
  userId: string;
}

const UserHero: FC<Props> = ({ userId }) => {
  const { data: fetchedUser } = useUser(userId);

  return (
    <div className="bg-neutral-700 h-44 relative">
      {fetchedUser?.coverImage && (
        <Image
          src={fetchedUser?.coverImage}
          style={{ objectFit: "cover" }}
          fill
          alt="Cover image"
        />
      )}
      <div className="absolute -bottom-16 left-4">
        <Avatar userId={userId} isLarge hasBorder />
      </div>
    </div>
  );
};

export default UserHero;
