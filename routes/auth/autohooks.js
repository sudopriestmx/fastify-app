const fp = require('fastify-plugin')
const schemas = require('./schemas/loader')

module.exports = fp(async function userAutoHooks (fastify, opts) {
    const users = fastify.mongo.db.collection('users')
    
    fastify.register(schemas)

    fastify.decorate('usersDataSource', {
        async readUser (userName) {
            const user = await users.findOne({ userName })
            return user
        },
        async createUser (user) {
            const newUser = await users.insertOne(user)
            return newUser.insertedId
        }
    })
}, {
    encapsulate: true,
    dependencies: ['@fastify/mongodb']
})
