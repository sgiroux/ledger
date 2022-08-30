import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { SyncStatusDTO } from "../../api-client/models/sync-status-dto";
import Loader from "../../components/Loader";


const SyncPage:React.FC = () => {
  const router = useRouter();
  const {data, error} = useSWR<SyncStatusDTO>('/api/sync/status', {
    refreshInterval: 1000
  });


  if (error) {
    return (
      <div className="mt-4 px-4 sm:px-6 md:px-8">
        <div className="bg-gray-700 border-l-4 border-gray-800 text-gray-300 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>Something went wrong.</p>
        </div>
      </div>
    )
  }

  if (data && data.status !== 'RUNNING') {
    router.replace("/");
  }
  
  return (
    <div className="flex items-center justify-center mt-10">
      <Loader />
    </div>
  )
}

export default SyncPage

export async function getServerSideProps() {
  // Fetch data from external API
  console.log("hit i22")

  //Grab all the data we need

  // Pass data to the page via props
  return { props: { } }
}