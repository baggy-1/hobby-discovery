import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const Seo = ({ title, description }: Props) => {
  const titleText = title ? `${title} | Hobby Discovery` : "Hobby Discovery";
  const descriptionText = description ? description : "Hobby Discovery";

  return (
    <Head>
      <title>{titleText}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={descriptionText} />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={descriptionText} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:image" content="" />
      <meta property="og:article:author" content="Hobby Discovery" />
      <meta property="og:site_name" content="Hobby Discovery" />
      <meta property="og:locale" content="ko_KR" />
      <meta name="twitter:card" content="" />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:description" content={descriptionText} />
      <meta name="twitter:image" content="" />
      <meta name="twitter:site" content="@hobbydiscovery" />
      <meta name="twitter:creator" content="@hobbydiscovery" />
      <meta property="author" content="Hobby Discovery" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Seo;
