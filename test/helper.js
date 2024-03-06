const t = require('tap')
const fcli = require('fastify-cli/helper')

const startArgs = '--options app.js'
const defaultEnv = {
    NODE_ENV: 'test',
    MONGO_URL: 'mongodb://localhost:27017/test'
}
async function buildApp (t, env = defaultEnv, serverOptions) {
    const app = await fcli.build(startArgs, { configFata: env }, serverOptions )
    t.teardown(() => { app.close() })
    return app
}

module.exports = {
  buildApp,
}