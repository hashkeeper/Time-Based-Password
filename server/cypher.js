const fs = require('fs');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console()
    ]
})

const hourS = new Date().getHours();
const minuteS = new Date().getMinutes();
const secondS = new Date().getSeconds();
const milliS = new Date().getMilliseconds();

const secondInDay = (hourS * 3600) + (minuteS * 60) + secondS;

logger.info(`Millisecond count: ${milliS}`);
logger.info(`Second in day count: ${secondInDay}`);

try{
    fs.writeFileSync('./key/password.txt', secondInDay.toString(), {encoding:'utf8',flag:'w'});
} catch (err) {
    console.error(err);
}