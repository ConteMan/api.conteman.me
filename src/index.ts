import Koa from 'koa'
import next from 'next'
import Router from '@koa/router'
import cors from '@koa/cors'

const port = parseInt(process.env.PORT as string, 10) || 80
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev })

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  router.get('/one', async(ctx) => {
    const res = await fetch('https://api.isconte.com/ones/random', {
      method: 'GET',
      headers: {
        'x-user-agent': 'conte-world-f',
      },
    }).then((res: any) => res.json())
    ctx.body = res.data
  })

  router.all('(.*)', async(ctx: any) => {
    ctx.redirect('/one')
    ctx.status = 301
  })

  server.use(async(ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(cors())
  server.use(router.routes())
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`)
  })
})
