const fp = require('fastify-plugin')
const generateHash = require('./generate-hash')
module.exports.prefixOverride = ''
module.exports = fp(
    async function applicationAuth (fastify, opts) {
        fastify.post('/register' , {
            //TODO implementation
        })
        fastify.post('/authenticate', {
            //TODO implementation
        })
        fastify.get('/me', {
            //TODO implementation
        })
        fastify.post('/refresh', {
            //TODO implementation
        })
        fastify.post('/logout', {
            //TODO implementation
        })
        async function refreshHandler (request, reply) {
            //TODO implementation
        }
    }, {
        name: 'auth.routes',
        dependencies: ['authentication-plugin'],
        encapsulate: true
    }
)