import { useRouter } from "next/dist/client/router";
import { ReactNode, FunctionComponent } from "react";
import Head from "next/head";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import styles from "./PageContainer.module.css";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  image?: string;
  ogType?: string;
  date?: Date;
  dateModified?: Date;
};

const PageContainer: FunctionComponent<Props> = ({
  children,
  ...customMetaTags
}: Props) => {
  const router = useRouter();
  const defaultMetaTitle =
    "Marta Moros Batlle - Software Engineer and Web Developer";
  const metaTitleTail = "Marta Moros Batlle";
  let metaTags = {
    title: defaultMetaTitle,
    description: "Fast learning web developer with 9 years of experience",
    image: "/profilePic.png",
    ogType: "website",
    ...customMetaTags,
  };

  if (metaTags.title !== defaultMetaTitle) {
    metaTags.title += ` | ${metaTitleTail}`;
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <div className="page-container">
      <Head>
        <title>{metaTags.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={metaTags.description} name="description" />
        <meta property="og:url" content={`${siteUrl}${router.asPath}`} />
        <link rel="canonical" href={`${siteUrl}${router.asPath}`} />
        {/* Open Graph */}
        <meta property="og:type" content={metaTags.ogType} />
        <meta property="og:site_name" content="Marta Moros Batlle" />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:image" content={metaTags.image} />
        {metaTags.dateModified && (
          <meta
            property="og:updated_time"
            content={metaTags.dateModified.toISOString()}
          />
        )}
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@myddna" />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content={metaTags.image} />
        {metaTags.ogType == "article" && metaTags.date && (
          <meta
            property="article:published_time"
            content={metaTags.date.toISOString()}
          />
        )}
        {metaTags.ogType == "article" && metaTags.dateModified && (
          <meta
            property="article:modified_time"
            content={metaTags.dateModified.toISOString()}
          />
        )}
        {metaTags.ogType == "article" && (
          <meta property="article:publisher" content={siteUrl} />
        )}
      </Head>
      <div className="w-full">
        <Navigation />
        <main className={styles.mainContainer}>{children}</main>
        <Footer />
      </div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#fffbeb",
          },
        }}
      />
    </div>
  );
};

export default PageContainer;
