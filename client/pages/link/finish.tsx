import dynamic from 'next/dynamic';


const Finish = dynamic(() => import('../../components/OAuth/Finish'), {
  ssr: false
})

const FinishPage: React.FC = () => {
  
  return <Finish />;
};

export default FinishPage;
