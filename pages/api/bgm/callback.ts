import type { VercelRequest, VercelResponse } from '@vercel/node'
import axios from 'axios'

export default async function(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query

  if (!code)
    return res.status(400).json({ error: 'Missing code' })

  try {
    const accessTokenRes = await axios.post('https://bgm.tv/oauth/access_token', {
      grant_type: 'authorization_code',
      client_id: process.env?.BGM_APP_ID,
      client_secret: process.env?.BGM_APP_SECRET,
      code,
      redirect_uri: 'https://api.conteman.me/bgm/callback',
    })

    res.status(200).json(accessTokenRes?.data ?? accessTokenRes)
  }
  catch (e) {
    return res.status(500).json({ error: e })
  }
}
