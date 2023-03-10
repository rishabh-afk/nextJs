import Layout from "@/components/Layout";
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
      <Layout>
        <h1>E-Commerce Website</h1>
      </Layout>
    </>
  );
}
