import { NextApiRequest, NextApiResponse } from 'next';
import { createDefaultAPI, handleAPIError } from '../../../utils/api-utils';
import Cookies from 'cookies';

const httpMethodToHandlerMethod: Record<string, Function> = {
  POST: httpPost,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const method = httpMethodToHandlerMethod[req.method!];
    method(req, res);
  } catch (err) {
    res.status(405).json({
      code: 405,
      message: 'Method Not Allowed',
    });
  }
}

async function httpPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const api = createDefaultAPI(req);
    const response = await api.authControllerLogin(req.body);

    console.log(response.data);
    console.log(response.data.accessToken);

    const cookies = new Cookies(req, res);

    console.log('SETTING COOKIES');
    cookies.set('auth-token', response.data.accessToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.json({});
  } catch (err) {
    handleAPIError(res, err);
  }
}
