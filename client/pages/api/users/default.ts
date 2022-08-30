// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const response = await axios.post(`http://127.0.0.1:5000/users/default`, {
    email: req.body['email'],
    password: req.body['password'],
    firstName: req.body['firstName'],
    lastName: req.body['lastName'],
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  console.log(response.data);
  res.status(200).json(response.data);
}
