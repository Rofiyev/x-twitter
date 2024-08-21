import { useRouter } from "next/router";
import Head from "next/head";
import Form from "@/components/form";
import Header from "@/components/header";
import CommentFeed from "@/components/posts/comment-feed";
import PostItem from "@/components/posts/post-item";
import usePost from "@/hooks/usePost";
import { ClipLoader } from "react-spinners";
import Layout from "@/components/layout";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost)
    return (
      <div className="flex items-center justify-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );

  return (
    <>
      <Head>
        <title>Post View - X</title>
      </Head>
      <Header label="Post" showBackArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        placeholder="Post your replay"
        isComment
      />
      <CommentFeed comments={fetchedPost?.comment} />
    </>
  );
};

export default PostView;
