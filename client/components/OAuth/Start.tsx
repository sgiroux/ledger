import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';



import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from 'react-plaid-link';
import { useRouter } from 'next/router';

const Start = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();


  // get a link_token from your API when component mounts
  useEffect(() => {
    const createLinkToken = async () => {
      const response = await axios.post('/api/plaid/create_link_token');
      const { link_token } = await response.data;
      setToken(link_token);
      localStorage.setItem("link_token", link_token);
    };
    createLinkToken();
  }, []);


  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(publicToken, metadata);

    const exchangeToken = async () => {
      const response = await axios.post(
        '/api/plaid/exchange_token', {
          'publicToken': publicToken
        }
      )

      await axios.post('/api/sync/start');
      router.replace("/link/sync");
    };
    exchangeToken();

  }, [router]);
  
  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    // log onEvent callbacks from Link
    // https://plaid.com/docs/link/web/#onevent
    console.log(eventName, metadata);
  }, []);
  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    // log onExit callbacks from Link, handle errors
    // https://plaid.com/docs/link/web/#onexit
    console.log(error, metadata);
  }, []);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    onEvent,
    onExit,
  };

  const {
    open,
    ready,
    // error,
    // exit
  } = usePlaidLink(config);

  return (
    <div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to connect?</span>
          <span className="block text-indigo-600">Connect your account using Plaid.</span>
        </h2>
        <div className="mt-8 flex">
          <div className="inline-flex rounded-md shadow">
            <button
              onClick={() => {open()}}
              disabled={!ready}
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Connect
            </button>
          </div>
          {/*<div className="ml-3 inline-flex">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
            >
              Learn more
            </a>
          </div>*/}
        </div>
      </div>
    </div>
  );
}

export default Start;





