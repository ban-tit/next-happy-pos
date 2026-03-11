// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

// type Data = {
//   name: string;
// };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json([
    { id: 1, name: 'mote-hin-khar', price: 500 },
    { id: 2, name: 'shan-khout-swell', price: 1500 },
  ]);
}
