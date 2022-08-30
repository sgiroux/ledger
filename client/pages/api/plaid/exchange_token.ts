import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { createDefaultAPI, handleAPIError } from '../../../utils/api-utils';
import { ExchangeTokenDTO } from '../../../api-client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  try {
    const api = createDefaultAPI(req);
    const response = await api.plaidOauthControllerExchangeToken(req.body);
    res.json({});
  } catch (err) {
    handleAPIError(res, err);
  }
}
