module.exports = {
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty'
    }
  },
  ajv: {
    customOptions: {
      removeAdditional: 'all'
    }
  }
}