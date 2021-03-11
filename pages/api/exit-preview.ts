import { NextApiRequest, NextApiResponse } from 'next';

export default function exitPreview(_, res: NextApiResponse) {
  res.clearPreviewData();
  res.writeHead(307, { Location: '/' });
  res.end();
}
