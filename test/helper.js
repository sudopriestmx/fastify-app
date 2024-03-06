const fcli = require('fastify-cli/helper')

const startArgs = '--options app.js'
const defaultEnv = {
  NODE_ENV: 'test',
  MONGO_URL: 'mongodb://localhost:27017/test',
  JWT_SECRET: 'secret-1234567890'
}

function config (env) {
  return {
    configData: env
  }
}

async function buildApp (t, env) {
  const app = await fcli.build(startArgs, config({ ...defaultEnv, ...env }))
  t.teardown(() => { app.close() })
  return app
}

module.exports = {
  buildApp
}
