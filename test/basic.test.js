const t = require('tap')

const { buildApp } = require('./helper')
const dockerHelper = require('./helper-docker')
const { Containers } = dockerHelper
const docker = dockerHelper()


t.before(async function before () {
    await docker.startContainer(Containers.mongo)
})

t.teardown(async () => {
    await docker.stopContainer(Containers.mongo)
})

t.test('the application should start', async (t) => {
    const app = await buildApp(t)
    t.teardown(() => { app.close() })
    await app.ready()
    t.pass('the application is ready')
})
t.test('the alive route is online', async (t) => {
    const app = await buildApp(t)
    const response = await app.inject({
        method: 'GET',
        url: '/'
    })
    t.same(response.json(), { root: true })
})
t.todo('the application should not start', async mainTest => {
    mainTest.test('if there are missing ENV vars', async t => {
        try {
            await buildApp(t, {
                NODE_ENV: 'test',
                MONGO_URL: undefined
            })
            t.fail('the server must not start')
        } catch (error) {
            t.ok(error, 'error must be set')
            t.match(error.message, "required property 'MONGO_URL'")
        }
    })
    mainTest.test('when mongodb is unreachable', async t => {
        try {
            await buildApp(t, {
                NODE_ENV: 'test',
                MONGO_URL: 'mongodb://localhost:27099/test'
            })
            t.fail('the server must not start')
        } catch (error) {
            t.ok(error, 'error must be set')
            t.match(error.message, 'connect ECONNREFUSED')
        }
    })
})
