import React from 'react';

import dynamic from 'next/dynamic';
import { GetServerSidePropsContext } from 'next';
import { getUserSSR } from '../../utils/server-side-render-utils';

const Start = dynamic(() => import('../../components/OAuth/Start'), {
  ssr: false,
});

const OAuthStartPage: React.FC = () => {
  return (
    <>
      <Start />
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const user = await getUserSSR(context.req.cookies);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};

export default OAuthStartPage;
