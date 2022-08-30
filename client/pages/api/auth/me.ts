import { NextApiRequest, NextApiResponse } from 'next';
import { createDefaultAPI, handleAPIError } from '../../../utils/api-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const api = createDefaultAPI(req);
    const response = await api.authControllerMe();
    res.json(response.data);
  } catch (err) {
    handleAPIError(res, err);
  }
}
