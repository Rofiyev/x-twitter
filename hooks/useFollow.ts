import { useCallback, useMemo, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import { useLoginModal } from "./useLoginModal";
import useUser from "./useUser";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);
  const [isLoading, setIsLaoding] = useState<boolean>(false);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    try {
      setIsLaoding(true);
      let request;

      if (isFollowing)
        request = () => axios.delete("/api/follow", { data: { userId } });
      else request = () => axios.post("/api/follow", { userId });

      await request();
      await mutateCurrentUser();
      await mutateFetchedUser();

      setIsLaoding(false);
      return toast.success(
        isFollowing ? "Unfollow Successfully!" : "Following Successfully"
      );
    } catch (error) {
      return toast.error("Something went wrong!");
    }
  }, [
    currentUser,
    loginModal,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
  ]);

  return { isFollowing, toggleFollow, isLoading };
};

export default useFollow;
