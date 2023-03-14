import Banner from "@/components/home/Banner";
import Testimonials from "@/components/home/Testimonials";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>E-Commerce Website</title>
        <meta name="description" content="E-commece" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner />
      <Testimonials />
    </>
  );
}
