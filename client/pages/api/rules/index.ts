import { NextApiRequest, NextApiResponse } from 'next';
import { createDefaultAPI, handleAPIError } from '../../../utils/api-utils';

const httpMethodToHandlerMethod: Record<string, Function> = {
  GET: httpGet,
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

async function httpGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const api = createDefaultAPI(req);
    const response = await api.rulesControllerSelectAll();
    res.json(response.data);
  } catch (err) {
    handleAPIError(res, err);
  }
}

async function httpPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const api = createDefaultAPI(req);
    const response = await api.rulesControllerCreate(req.body);
    res.json(response.data);
  } catch (err) {
    handleAPIError(res, err);
  }
}
