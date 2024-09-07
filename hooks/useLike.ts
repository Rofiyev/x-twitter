import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import toast from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);

  const hasLike = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id);
  }, [fetchedPost?.likedIds, currentUser?.id]);

  const toggleLike = useCallback(async () => {
    try {
      let request;

      if (hasLike)
        request = () => axios.delete("/api/like", { data: { postId } });
      else request = () => axios.post("/api/like", { postId });

      await request();
      mutateFetchedPost();
      mutateFetchedPosts();
      toast.success(
        hasLike ? "Post Unlike successfully!" : "Post like successfully!"
      );
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }, [hasLike, postId, mutateFetchedPost, mutateFetchedPosts]);

  return {
    toggleLike,
    hasLike,
  };
};

export default useLike;
