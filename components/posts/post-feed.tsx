import { FC } from "react";
import usePosts from "@/hooks/usePosts";
import PostItem from "./post-item";

interface Props {
  userId?: string;
}

const PostFeed: FC<Props> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem key={post.id} userId={userId} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
