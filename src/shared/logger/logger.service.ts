import { LoggerService, Logger } from '@nestjs/common';
const fs = require('fs');
const logDir = 'logs';
const date = new Date().toISOString().substr(0, 10);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export class MyLogger implements LoggerService {
  log(message: string, trace: string, request = null) {
    /* if (!fs.existsSync(`${logDir}/request`)) {
      fs.mkdirSync(`${logDir}/request`);
    }
    let reqStr = '';
    if (request) {
      reqStr = ` [${request.ip}][${request.method} ${request.path}] `;
    }
    fs.appendFile(`${logDir}/request/${date}.log`, `[${new Date().toISOString()}]${request}[${trace} ${message}]\n`, function (err) {
      if (err) throw err;
    }); */
  }
  response(message: string, trace: string, request) {
    /* if (!fs.existsSync(`${logDir}/response`)) {
      fs.mkdirSync(`${logDir}/response`);
    }
    fs.appendFile(`${logDir}/response/${date}.log`, `[${new Date().toISOString()}] [${request.ip}] [${request.method} ${request.path}] [${trace}: ${message}]\n`, function (err) {
      if (err) throw err;
    }); */
  }
  error(message: string, trace: string) {
    /* Logger.error(message);

    if (!fs.existsSync(`${logDir}/error`)) {
      fs.mkdirSync(`${logDir}/error`);
    }
    fs.appendFile(`${logDir}/error/${date}.log`, `[${new Date().toISOString()}] [${trace}] Message: ${message}\n`, function (err) {
      if (err) throw err;
    }); */
  }
  warn(message: string, trace: string) {
    /* Logger.warn(message);
    if (!fs.existsSync(`${logDir}/warn`)) {
      fs.mkdirSync(`${logDir}/warn`);
    }
    fs.appendFile(`${logDir}/warn/${date}.log`, `[${new Date().toISOString()}] [${trace}] Message: ${message}\n`, function (err) {
      if (err) throw err;
    }); */
  }
  debug(message: string, trace: string) {
    /* if (!fs.existsSync(`${logDir}/debug`)) {
      fs.mkdirSync(`${logDir}/debug`);
    }
    fs.appendFile(`${logDir}/debug/${date}.log`, `[${new Date().toISOString()}] [${trace}] Message: ${message}\n`, function (err) {
      if (err) throw err;
    }); */
  }
  verbose(message: string, trace: string) {
    /* if (!fs.existsSync(`${logDir}/verbose`)) {
      fs.mkdirSync(`${logDir}/verbose`);
    }
    fs.appendFile(`${logDir}/verbose/${date}.log`, `[${new Date().toISOString()}] [${trace}] Message: ${message}\n`, function (err) {
      if (err) throw err;
    }); */
  }
}