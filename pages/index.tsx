import Seo from "components/Seo";
import HomeView from "components/view/home/HomeView";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Seo />
      <HomeView />
    </>
  );
};

export default Home;
