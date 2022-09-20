import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import axios from 'axios';
import { SWRConfig } from 'swr';
import { Router } from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

const CoreApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Head>
        <title>Ledger</title>
      </Head>
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </div>
  );
};

export default CoreApp;
