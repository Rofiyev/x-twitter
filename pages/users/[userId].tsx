import Header from "@/components/header";
import PostFeed from "@/components/posts/post-feed";
import UserBio from "@/components/users/user-bio";
import UserHero from "@/components/users/user-hero";
import useUser from "@/hooks/useUser";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/authentication",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

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
