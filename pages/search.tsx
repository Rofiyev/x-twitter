import Header from "@/components/header";
import SearchBar from "@/components/search/search-bar";
import SearchFeed from "@/components/search/search-feed";
import Head from "next/head";

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
