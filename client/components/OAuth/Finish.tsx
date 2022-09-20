import axios from 'axios';
import React, { useCallback } from 'react';

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from 'react-plaid-link';
import { useRouter } from 'next/router';

const Finish = () => {
  const link_token = localStorage.getItem('linkToken');
  const router = useRouter();

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    (publicToken, metadata) => {
      // send public_token to your server
      // https://plaid.com/docs/api/tokens/#token-exchange-flow
      console.log(publicToken, metadata);

      // Exchange the token
      const exchangeToken = async () => {
        const response = await axios.post('/api/plaid/exchange_token', {
          publicToken: publicToken,
        });

        //TODO: Check the response status

        //start the sync process
        await axios.post('/api/sync/start');
        router.replace('/link/sync');
      };
      exchangeToken();
    },
    [router],
  );
  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    console.log(eventName, metadata);
  }, []);
  const onExit = useCallback<PlaidLinkOnExit>(
    (error, metadata) => {
      console.log(error, metadata);

      //Something went wrong...send them back to the re-link flow
      router.replace('/link/start');
    },
    [router],
  );

  const config: PlaidLinkOptions = {
    token: link_token,
    receivedRedirectUri: window.location.href,
    onSuccess,
    onEvent,
    onExit,
  };

  const { open, ready, error } = usePlaidLink(config);

  React.useEffect(() => {
    if (ready) {
      open();
    }
  }, [ready, open]);
  return <></>;
};

export default Finish;
