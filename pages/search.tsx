import Header from "@/components/header";
import SearchBar from "@/components/search/search-bar";
import SearchFeed from "@/components/search/search-feed";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";


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

export default function Home() {
  return (
    <>
      <Head>
        <title>X - Search</title>
      </Head>
      <Header label="Search" showBackArrow />
      <SearchBar />
      <SearchFeed />
    </>
  );
}
