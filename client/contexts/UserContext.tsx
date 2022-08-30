import { useRouter } from 'next/router';
import React from 'react';
import { User } from '../api-client';
import { UseUser } from '../hooks/UseUser';
import { logger } from '../utils/logger';

interface UserContextProps {
  children?: React.ReactNode;
  user: User;
}

export const UserContext = ({ children, user }: UserContextProps) => {
  const { data, error } = UseUser(user);
  const router = useRouter();
  
  if (!data && !error) {
    return <></>
  }

  if (error) {
    if (!router.pathname.match(/(login)/)) {
      logger.log("User Not Found, Redirecting");
      router.replace("/login");
      return <></>;
    }
  }

  if (data && (router.pathname.match(/(login)/))) {
    logger.log("User Found But On Login Page, Redirecting");
    router.replace("/dashboard");
    return <></>;
  }

  logger.log("User Found, Rendering");
  return <>{children}</>;
};
