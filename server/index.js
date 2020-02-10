const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const bodyParser = require('koa-bodyparser')
const api = require('./routes/api');
const router = require('koa-router')()

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'
app.use(bodyParser())
app.use(router.routes())
app.use(api.routes(), api.allowedMethods())
async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)
  console.log(process.env.HOST)
  console.log(process.env.PORT)
  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 8888
  } = nuxt.options.server
  console.log(host,port)
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
