import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import PageWrapper from "../../components/PageWrapper";
import EditForm from "../../components/Rules/EditForm";
import { UserContext } from "../../contexts/UserContext";
import { getUserSSR } from "../../utils/server-side-render-utils";



const EditRulesPage:React.FC = ({user}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <UserContext user={user}>
      <PageWrapper page="Rules">
        <EditForm />
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

export default EditRulesPage;