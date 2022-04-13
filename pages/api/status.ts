import type { VercelRequest, VercelResponse } from '@vercel/node'

import { about } from './service/about'

export default function(req: VercelRequest, res: VercelResponse) {
  const { name = 'status' } = req.query

  const data = about(name as string)

  res.status(200).json({ from: 'status', ...data })
}
