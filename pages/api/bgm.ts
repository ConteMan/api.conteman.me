import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function(req: VercelRequest, res: VercelResponse) {
  const { appId } = req.query

  if (appId !== process.env?.BGM_APP_ID)
    return res.status(403).json({ error: 'Invalid appId' })

  const redirect_uri = 'https://api.conteman.me/bgm/callback'

  res.status(302).redirect(`https://bgm.tv/oauth/authorize?client_id=${process.env?.BGM_APP_ID}&response_type=code&redirect_uri=${redirect_uri}`)
}
