const fp = require('fastify-plugin')
const fastifySwagger = require('@fastify/swagger')
const fastifySwaggerUI = require('@fastify/swagger-ui')

module.exports = fp(async function swaggerPlugin (fastify, opts) {
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Fastify app',
        description: 'Fastify Book examples',
        version: require('../package.json').version
      }
    }
  })
  fastify.register(fastifySwaggerUI, {
    routePrefix: '/docs',
    exposeRoute: fastify.secrets.NODE_ENV !== 'production'
  })
}, { dependencies: ['application-config'] })
