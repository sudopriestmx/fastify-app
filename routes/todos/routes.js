module.exports = async function todoRoutes (fastify, _opts) {
    const todos = fastify.mongo.db.collection('todos')
    fastify.route({
        method: 'GET',
        url: '/',
        handler: async function listTodo (request, reply) {
            return { data: [], totalCount: 0 }
        }
    })
    fastify.route({
        method: 'POST',
        url: '/',
        handler: async function createTodo (request, reply) {
           const _id = new this.mongo.ObjectId()
           const now = new Date()
           const createdAt = now
           const modifiedAt = now
           const newTodo = {
            _id,
            id: _id,
            ...request.body,
            done: false,
            createdAt,
            modifiedAt
           }
           await todos.insertOne(newTodo)
           reply.code(201)
           return {id: _id}
        }
    })
    fastify.route({
        method: 'GET',
        url: '/:id',
        handler: async function readTodo (request, reply) {
            return {}
        }
    })
    fastify.route({
        method: 'PUT',
        url: './:id',
        handler: async function updateTodo (request, reply) {
            reply.code(204)
        }
    })
    fastify.route({
        method: 'DELETE',
        url: '/:id',
        handler: async function deleteTodo (request, reply) {
            reply.code(204)
        }
    })
    fastify.route({
        method: 'POST',
        url: '/:id/:status',
        handler: async function changeStatus (request, reply) {
            reply.code(204)
        }
    })
}