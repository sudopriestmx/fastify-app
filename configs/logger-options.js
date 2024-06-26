module.exports = {
  level: process.env.LOG_LEVEL || 'warn',
  redact: {
    censor: '***',
    paths: [
      'req.headers.authorization',
      'req.body.password',
      'req.body.email'
    ]
  },
  serializers: {
    req: function (request) {
      const shoudLogBody = request.routeOptions.config.logBody === true
      return {
        method: request.method,
        url: request.url,
        routeUrl: request.routeOptions.url,
        version: request.headers?.['accept-version'],
        user: request.user?.id,
        headers: request.headers,
        body: shoudLogBody ? request.body : undefined,
        hostname: request.hostname,
        remoteAddress: request.ip,
        remotePort: request.socket?.remotePort
      }
    },
    res: function (reply) {
      return {
        statusCode: reply.statusCode,
        responseTime: reply.elapsedTime
      }
    }
  }
  /* transport: {
    target: 'pino-pretty'
  } */
}
