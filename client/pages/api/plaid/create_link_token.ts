import { NextApiRequest, NextApiResponse } from 'next';
import { LinkTokenDTO } from '../../../api-client';
import { createDefaultAPI, handleAPIError } from '../../../utils/api-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LinkTokenDTO>,
) {
  try {
    const api = createDefaultAPI(req);
    const response = await api.oauthControllerCreateLinkToken();
    res.json(response.data);
  } catch (err) {
    handleAPIError(res, err);
  }
}
