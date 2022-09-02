import axios from 'axios';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { User } from '../api-client';
import { SystemStatusDTO } from '../api-client/models/system-status-dto';

const AUTH_TOKEN_COOKIE_NAME = 'auth-token';

const extractAuthCookies = (cookies: NextApiRequestCookies) => {
  if (cookies) {
    return cookies[AUTH_TOKEN_COOKIE_NAME];
  }
};

const getSystemStatusSSR = async (
  cookies: NextApiRequestCookies,
): Promise<SystemStatusDTO> => {
  const response = await axios.get<SystemStatusDTO>(
    'http://localhost:3000/api/system/status',
    {
      headers: {
        Cookie: `${AUTH_TOKEN_COOKIE_NAME}=${extractAuthCookies(cookies)};`,
      },
    },
  );
  return response.data;
};

const getUserSSR = async (
  cookies: NextApiRequestCookies,
): Promise<User | null> => {
  try {
    const response = await axios.get<User>(
      'http://localhost:3000/api/auth/me',
      {
        headers: {
          Cookie: `${AUTH_TOKEN_COOKIE_NAME}=${extractAuthCookies(cookies)};`,
        },
      },
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

export { getUserSSR, getSystemStatusSSR };
