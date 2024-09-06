import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

import Layout from "@/components/layout";
import Providers from "@/components/providers";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="/images/x-logo.png"
          type="image/x-icon"
        />
      </Head>
      <Providers session={session}>
        {router.pathname.includes("/authentication") ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Providers>
    </>
  );
}
