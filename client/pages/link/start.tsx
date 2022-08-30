
import React from 'react';

import dynamic from "next/dynamic";

const Start = dynamic(() => import('../../components/OAuth/Start'), {
  ssr: false
})



const OAuthStartPage: React.FC = () => {
  
  return (
    <>
      <Start />
    </>
  );

}

export default OAuthStartPage;