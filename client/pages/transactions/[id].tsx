import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import PageWrapper from "../../components/PageWrapper";
import TransactionDetail from "../../components/Transactions/TransactionDetail";
import { UserContext } from "../../contexts/UserContext";
import { getUserSSR } from "../../utils/server-side-render-utils";


const TransactionPage:React.FC = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const {id} = router.query;

  if (!id) {
    return (
      <>Boom</>
    )
  }

  return (
    <UserContext user={user}>
      <PageWrapper page="Transactions">
        <TransactionDetail id={id.toString()} />
      </PageWrapper>
    </UserContext>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getUserSSR();
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user,
    },
  }
}

export default TransactionPage;