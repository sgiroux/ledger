import axios from 'axios';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../api-client';

const getUserSSR = async (): Promise<User | null> => {
  try {
    const response = await axios.get<User>('http://localhost:3000/api/auth/me');
    return response.data;
  } catch (err) {
    return null;
  }
};

export { getUserSSR };
