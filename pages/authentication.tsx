import Form from "@/components/authentication/form";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

const Authentication = () => {
  return (
    <>
      <Head>
        <title>X - Authentication</title>
        <link
          rel="shortcut icon"
          href="/images/x-logo.png"
          type="image/x-icon"
        />
      </Head>
      <div className="h-screen bg-black">
        <div className="container h-full mx-auto px-0 xl:px-10 max-w-7xl">
          <div className="h-full w-full flex items-center justify-center md:gap-16 xl:gap-40">
            <Image
              width={350}
              height={350}
              src="/images/x-logo.png"
              alt="X-logo"
              loading="lazy"
              className="hidden md:block"
              style={{
                objectFit: "contain",
                filter:
                  "brightness(0) saturate(100%) invert(97%) sepia(54%) saturate(223%) hue-rotate(176deg) brightness(98%) contrast(88%)",
              }}
            />
            <Form />
          </div>
        </div>
      </div>
    </>
  );
};

export default Authentication;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
