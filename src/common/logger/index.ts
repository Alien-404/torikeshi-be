import moment from 'moment-timezone';
import winston, { format, transports as WinstonTransports } from 'winston';

// create format log
const logFormat = format.printf(({ level, message, timestamp }) => {
  const wibTime = moment(timestamp as string)
    .tz('Asia/Jakarta')
    .format('YYYY-MM-DD HH:mm:ss');
  return `${wibTime} UTC+7 [${level.toUpperCase()}]: ${message}`;
});

// create transport
const loggerTransports: winston.transport[] = [
  new WinstonTransports.Console({
    level: 'info',
    format: format.combine(format.timestamp(), logFormat),
  }),
];

// Inisialisasi logger
export const logger = winston.createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), logFormat),
  transports: loggerTransports,
});
