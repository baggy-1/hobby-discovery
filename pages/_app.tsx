import "public/asset/fonts/font.css";
import "styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/layout/Layout";
import { SWRConfig } from "swr";
import { fetcher } from "config/fetcher";
import CartProvider from "components/provider/CartProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
