import { useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useUser from "./useUser";

const useView = (userId: string) => {
  const { data: currentUser } = useCurrentUser();
  const { data: user } = useUser(userId);

  const isAllowed = useMemo(() => {
    if (!user?.isPrivate || currentUser.id === userId) return true;

    const currentUserFollowers = currentUser?.followingIds || [];

    const isExist = currentUserFollowers.find(
      (item: string) => item === userId
    );

    return isExist ?? false;
  }, [currentUser, user, userId]);

  return {
    isAllowed,
  };
};

export default useView;
