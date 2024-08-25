import Head from "next/head";
import Image from "next/image";

const Loading = () => {
  return (
    <>
      <Head>
        <title>X - Loading..</title>
        <link
          rel="shortcut icon"
          href="/images/x-logo.png"
          type="image/x-icon"
        />
      </Head>
      <div className="h-screen w-full flex items-center justify-center">
        <Image
          width={300}
          height={300}
          src="/images/x-logo.png"
          alt="image"
          loading="lazy"
          className="animate-pulseImage"
        />
      </div>
    </>
  );
};

export default Loading;
