import Head from "next/head";
import Form from "@/components/form";
import Header from "@/components/header";
import PostFeed from "@/components/posts/post-feed";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>X - Home</title>
      </Head>
      <Header label="Home" />
      <Form placeholder="What's happening!?" />
      <PostFeed />
    </>
  );
}

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
