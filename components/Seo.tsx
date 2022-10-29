import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const Seo = ({ title, description, url, image }: Props) => {
  const titleText = title ? `${title} | 취함(CHIHAM)` : "취함(CHIHAM)";
  const descriptionText = description
    ? description
    : "문 앞으로 취미를 선물 해드려요. 한 달 마다 새롭고 흥미로운 취미 박스를 받아보세요. 남녀노소 집 안에서 즐길 수 있어요.";
  const urlPath = url ? url : "https://chiham.vercel.app";
  const imagePath = image ? image : "asset/image/chiham-poster.png";

  return (
    <Head>
      <title>{titleText}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={descriptionText} />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={descriptionText} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={urlPath} />
      <meta property="og:image" content={imagePath} />
      <meta property="og:article:author" content="취함(CHIHAM)" />
      <meta property="og:site_name" content="취함(CHIHAM)" />
      <meta property="og:locale" content="ko_KR" />
      <meta name="twitter:card" content={imagePath} />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:description" content={descriptionText} />
      <meta name="twitter:image" content={imagePath} />
      <meta name="twitter:site" content={urlPath} />
      <meta name="twitter:creator" content="@취함(CHIHAM)" />
      <meta property="author" content="취함(CHIHAM)" />
    </Head>
  );
};

export default Seo;
