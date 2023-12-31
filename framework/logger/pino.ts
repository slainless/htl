import pino, { stdSerializers } from 'pino'

export const createLogger = () => pino({
  level: "trace",
  serializers: {
    error: stdSerializers.err
  },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

export const logger = createLogger()