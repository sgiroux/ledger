import { GetServerSideProps, GetServerSidePropsContext } from "next";
import PageWrapper from "../components/PageWrapper";
import { UserContext } from "../contexts/UserContext";
import { getUserSSR } from "../utils/server-side-render-utils";
import { InferGetServerSidePropsType } from 'next'
import Dashboard from "../components/Dashboard/Dashboard";



const IndexPage = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <UserContext user={user}>
      <PageWrapper page="Dashboard">
        <Dashboard />
      </PageWrapper>
    </UserContext>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const user = await getUserSSR(context.req.cookies);
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


export default IndexPage;