import type { NextApiRequest, NextApiResponse } from 'next';
import { createDefaultAPI, handleAPIError } from '../../../utils/api-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const api = createDefaultAPI(req);
  try {
    const response = await api.syncControllerStatus();
    res.status(response.status).json(response.data);
  } catch (err) {
    handleAPIError(res, err);
  }
}
