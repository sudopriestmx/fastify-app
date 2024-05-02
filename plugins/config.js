'use strict'

const fp = require('fastify-plugin')
const fastifyEnv = require('@fastify/env')

module.exports = fp(async function configLoader (fastify, opts) {
  const options = {
    confKey: 'secrets',
    schema: fastify.getSchema('schema:dotenv')
  }
  if (opts.configData) {
    options.data = opts.configData
  }
  await fastify.register(fastifyEnv, options)
  fastify.log.level = fastify.secrets.LOG_LEVEL
},
{
  name: 'application-config',
  dependencies: ['application-schemas']
})
