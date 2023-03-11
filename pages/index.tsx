import Banner from "@/components/home/Banner";
import Blog from "@/components/home/Blog";
import Testimonials from "@/components/home/Testimonials";
import Layout from "@/components/Layout";
import Head from "next/head";
import { BsGrid3X3GapFill } from 'react-icons/bs';

export default function Home() {
  return (
    <>
      <Head>
        <title>E-Commerce Website</title>
        <meta name="description" content="E-commece" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Banner />
        {/* <Blog /> */}
        <Testimonials />
      </Layout>
    </>
  );
}
