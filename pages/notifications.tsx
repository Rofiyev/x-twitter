import Head from "next/head";
import Header from "@/components/header";
import NotificationsFeed from "@/components/notifications/notifications-feed";

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
