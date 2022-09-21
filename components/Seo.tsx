import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
}

const Seo = ({ title, description }: Props) => {
  const titleText = title ? `${title} | HOBBY Discovery` : "HOBBY Discovery";
  const descriptionText = description
    ? description
    : "당신에게 꼭 맞는 취미를 선물 해드려요. 3개월 마다 새롭고 흥미로운 취미를 받아보세요. 남녀노소 즐길 수 있고 실내, 실외 모두 선택하여 즐길 수 있어요.";

  return (
    <Head>
      <title>{titleText}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={descriptionText} />
      <meta property="og:title" content={titleText} />
      <meta
        property="og:description"
        content="당신에게 꼭 맞는 취미를 선물 해드려요. 3개월 마다 새롭고 흥미로운 취미를 받아보세요. 남녀노소 즐길 수 있고 실내, 실외 모두 선택하여 즐길 수 있어요."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:image" content="" />
      <meta property="og:article:author" content="HOBBY Discovery" />
      <meta property="og:site_name" content="HOBBY Discovery" />
      <meta property="og:locale" content="ko_KR" />
      <meta name="twitter:card" content="" />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:description" content={descriptionText} />
      <meta name="twitter:image" content="" />
      <meta name="twitter:site" content="@hobbydiscovery" />
      <meta name="twitter:creator" content="@hobbydiscovery" />
      <meta property="author" content="HOBBY Discovery" />
    </Head>
  );
};

export default Seo;
