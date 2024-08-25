import Head from "next/head";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/layout";
import LoginModal from "@/components/modals/login-modal";
import RegisterModal from "@/components/modals/register-modal";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import EditModal from "@/components/modals/edit-modal";
import useCurrentUser from "@/hooks/useCurrentUser";
import Loading from "@/components/loading";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const router = useRouter();
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading || !currentUser) return <Loading />;

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="/images/x-logo.png"
          type="image/x-icon"
        />
      </Head>
      <SessionProvider session={session}>
        <Toaster />
        <EditModal />
        <LoginModal />
        <RegisterModal />
        {router.pathname.includes("/authentication") ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SessionProvider>
    </>
  );
}
