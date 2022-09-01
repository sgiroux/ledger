import { NextApiRequest, NextApiResponse } from 'next';
import { createDefaultAPI, handleAPIError } from '../../../utils/api-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const api = createDefaultAPI(req);
    await api.plaidOauthControllerExchangeToken(req.body);
    res.status(200);
  } catch (err) {
    handleAPIError(res, err);
  }
}
