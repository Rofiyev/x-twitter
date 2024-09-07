import { useCallback, useMemo, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import toast from "react-hot-toast";
import axios from "axios";

const usePrivate = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hasPrivate = useMemo(() => {
    return currentUser?.isPrivate;
  }, [currentUser]);

  const togglePrivate = useCallback(async () => {
    try {
      setIsLoading(true);
      let request;

      if (hasPrivate) {
        request = () =>
          axios.post(`/api/private/${currentUser.id}`, { isPrivate: false });
      } else {
        request = () =>
          axios.post(`/api/private/${currentUser.id}`, { isPrivate: true });
      }

      await request();
      mutateCurrentUser();
      return toast.success(
        hasPrivate
          ? "Your account has been made public!"
          : "Your account has been made private!"
      );
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser, mutateCurrentUser, hasPrivate]);

  return { togglePrivate, hasPrivate, isLoading };
};

export default usePrivate;
