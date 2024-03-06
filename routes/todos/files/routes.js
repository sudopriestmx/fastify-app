const fastifyMultiPart = require('@fastify/multipart')
const { parse: csvParse } = require('csv-parse')
const { stringify: csvStringify } = require('csv-stringify')

module.exports = async function fileTodoRoutes (fastify, _opts) {
  await fastify.register(fastifyMultiPart, {
    attachFieldsToBody: 'keyValues',
    async onFile (part) {
      const lines = []

      const stream = part.file.pipe(csvParse({
        bom: true,
        skip_empty_lines: true,
        trim: true,
        columns: true
      }))

      for await (const line of stream) {
        lines.push({
          title: line.title,
          done: line.done === 'true'
        })
      }

      part.value = lines
    },
    sharedSchemaId: 'schema:todo:import:file',
    limits: {
      fileNameSize: 50,
      fieldSize: 100,
      fields: 10,
      fileSize: 1_000_000,
      files: 1
    }
  })

  fastify.addHook('onRequest', fastify.authenticate)

  fastify.route({
    method: 'POST',
    url: '/import',
    schema: {
      body: {
        type: 'object',
        required: ['todoListFile'],
        description: 'Import a todo list from a CSV file with the following format: title,done',
        properties: {
          todoListFile: {
            type: 'array',
            items: {
              type: 'object',
              required: ['title', 'done'],
              properties: {
                title: { type: 'string' },
                done: { type: 'boolean' }
              }
            }
          }
        }
      }
    },
    handler: async function listTodo (request, reply) {
      const inserted = await request.todosDataSource.createTodos(request.body.todoListFile)
      reply.code(201)
      return inserted
    }
  })
  fastify.route({
    method: 'GET',
    urL: '/export',
    schema: {
      queryString: fastify.getSchema('schema:todo:list:export')
    },
    handler: async function listTodo (request, reply) {
      const { title } = request.query

      const cursor = await request.todosDataSource.listTodos({
        filter: { title },
        skip: 0,
        limit: undefined,
        asStream: true
      })

      reply.header('Content-Disposition', 'attachment; filename="todo-list.csv"')
      reply.type('text/csv')

      return cursor.pipe(csvStringify({
        quoted_string: true,
        header: true,
        columns: ['title', 'done', 'createdAt', 'modifiedAt', 'id'],
        cast: {
          boolean: (value) => value ? 'true' : 'false',
          date: (value) => value.toISOString()
        }
      }))
    }
  })
}
