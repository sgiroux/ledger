import axios from 'axios';
import React, { useCallback } from 'react';

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from 'react-plaid-link';

const Link = () => {
  const link_token = localStorage.getItem('link_token');

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(publicToken, metadata);

    // Exchange the token
    const exchangeToken = async () => {
      const response = await axios.post('/api/plaid/exchange_token', {
        publicToken: publicToken,
      });
    };
    exchangeToken();
  }, []);
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

export default Link;
