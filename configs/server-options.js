const crypto = require('node:crypto')

const loggerOptions = require('./logger-options')
module.exports = {
  disableRequestLogging: true,
  logger: loggerOptions,
  requestIdLogLabel: 'requestId',
  requestIdHeader: 'x-request-id',
  genReqId (req) {
    return req.headers['x-amz-request-id'] || crypto.randomUUID()
  },
  ajv: {
    customOptions: {
      removeAdditional: 'all'
    }
  }
}
