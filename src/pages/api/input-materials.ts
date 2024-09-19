import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    labels: ['CDAM', 'Acetone', 'Isopropyl Alcohol', 'Others'],
    values: [4.6, 4.6, 15.6, 36.7]

  };

  res.status(200).json(data);
}
