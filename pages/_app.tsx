import "styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import { SWRConfig } from "swr";
import fetcher from "util/fetcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </>
  );
}

export default MyApp;
