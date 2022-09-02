import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Accounts from "../../components/Accounts/Accounts";
import PageWrapper from "../../components/PageWrapper";
import { UserContext } from "../../contexts/UserContext";
import { getUserSSR } from "../../utils/server-side-render-utils";



const AccountsPage:React.FC = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <UserContext user={user}>
      <PageWrapper page="Accounts">
        <Accounts />
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

export default AccountsPage;