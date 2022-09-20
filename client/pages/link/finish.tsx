import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { getUserSSR } from '../../utils/server-side-render-utils';

const Finish = dynamic(() => import('../../components/OAuth/Finish'), {
  ssr: false,
});

const FinishPage: React.FC = () => {
  return <Finish />;
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

export default FinishPage;
