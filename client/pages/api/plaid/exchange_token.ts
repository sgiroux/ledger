import { NextApiRequest, NextApiResponse } from 'next';
import { createDefaultAPI, handleAPIError } from '../../../utils/api-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const api = createDefaultAPI(req);
    await api.oauthControllerExchangeToken(req.body);
    res.status(200);
    res.end();
  } catch (err) {
    handleAPIError(res, err);
  }
}
