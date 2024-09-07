import Head from "next/head";
import Header from "@/components/header";
import NotificationsFeed from "@/components/notifications/notifications-feed";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>X - Notifications</title>
      </Head>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
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