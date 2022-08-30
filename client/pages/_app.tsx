import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import axios from 'axios';
import { StrictMode } from 'react';
import { SWRConfig } from 'swr';
import { UserContext } from '../contexts/UserContext';



interface ExtendedAppProps extends AppProps {
  locale: string;
}

const CoreApp = ({ Component, pageProps }: ExtendedAppProps) => {
  return (
    <div>
      <Head>
        <title>Ledger</title>
      </Head>
      <SWRConfig value={{
        fetcher: (url) => axios.get(url).then((res) => res.data),
      }}>
        <Component {...pageProps} />
      </SWRConfig>
    </div>
  )
}

export default CoreApp
