import { NextApiRequest, NextApiResponse } from 'next';
import { createDefaultAPI, handleAPIError } from '../../../utils/api-utils';

const httpMethodToHandlerMethod: Record<string, Function> = {
  GET: httpGet,
  PATCH: httpPatch,
  DELETE: httpDel,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const method = httpMethodToHandlerMethod[req.method!];
    const { id } = req.query;

    if (!id) {
      res.status(400).json({
        code: 400,
        message: 'Bad Request',
      });
      return;
    }

    method(req, res, Number(id));
  } catch (err) {
    res.status(405).json({
      code: 405,
      message: 'Method Not Allowed',
    });
  }
}

async function httpDel(req: NextApiRequest, res: NextApiResponse, id: number) {
  try {
    const api = createDefaultAPI(req);
    const response = await api.rulesControllerDelete(id);
    res.json(response.data);
  } catch (err) {
    handleAPIError(res, err);
  }
}

async function httpGet(req: NextApiRequest, res: NextApiResponse, id: number) {
  try {
    const api = createDefaultAPI(req);
    const response = await api.rulesControllerSelectById(id);
    res.json(response.data);
  } catch (err) {
    handleAPIError(res, err);
  }
}

async function httpPatch(
  req: NextApiRequest,
  res: NextApiResponse,
  id: number,
) {
  try {
    const api = createDefaultAPI(req);
    const response = await api.rulesControllerUpdate(req.body, id);
    res.json(response.data);
  } catch (err) {
    handleAPIError(res, err);
  }
}
