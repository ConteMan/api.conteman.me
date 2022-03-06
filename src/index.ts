import Koa from 'koa'

const app = new Koa()
const msg = 'Hello World, By ConteMan~'

app.use(async(ctx: Koa.Context): Promise<void> => {
  ctx.body = msg
})

app.listen(7777)
