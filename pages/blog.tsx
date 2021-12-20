import type { NextPage } from "next";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Head from "next/head";
import PageContainer from "../components/structure/PageContainer";

type Props = {
  repos?: any;
};

const Blog: NextPage<Props> = ({ repos }) => {

  return (
    <PageContainer image="/screenshotPortfolio.png">
      <Head>
        <title>Blog</title>
      </Head>
      <p>Holiholi</p>
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  return {
    props: {
      test: 'test'
    },
  };
};

export default Blog;
