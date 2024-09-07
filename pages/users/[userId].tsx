import Header from "@/components/header";
import PostFeed from "@/components/posts/post-feed";
import UserBio from "@/components/users/user-bio";
import UserHero from "@/components/users/user-hero";
import useUser from "@/hooks/useUser";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>User Profile - X</title>
      </Head>
      <Header showBackArrow label={fetchUser?.name} />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
