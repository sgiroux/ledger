import useSWR from 'swr';
import { User } from '../api-client';

export const UseUser = (user?: User) => {
  return useSWR<User>('/api/auth/me', {
    fallbackData: user,
    refreshInterval: 30000, // Check every 30 seconds
  });
};
