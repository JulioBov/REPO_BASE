import winston from 'winston';

const tsFormat = () => new Date().toLocaleTimeString();

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: tsFormat }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
      level: 'info',
    }),
  ],
});

export default logger;
