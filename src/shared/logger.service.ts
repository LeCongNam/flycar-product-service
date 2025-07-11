import { Logger } from '@nestjs/common';
import * as httpContext from 'express-http-context';
import { COMMON_CONSTANTS } from '../constants';

type LOG_METHOD = 'log' | 'error' | 'warn' | 'debug';

export class LoggerService implements ILogger {
  private _logger: Logger;

  constructor(context: string) {
    this._logger = new Logger(context);
  }

  log(message: string, data?: string | Record<string, any>) {
    this._writeLog('log', message, data);
  }

  error(message: string, data?: string | Record<string, any>) {
    this._writeLog('error', message, data);
  }

  warn(message: string, data?: string | Record<string, any>) {
    this._writeLog('warn', message, data);
  }

  debug(message: string, data?: string | Record<string, any>) {
    this._writeLog('debug', message, data);
  }

  private _writeLog(
    method: LOG_METHOD,
    message: string,
    data?: string | Record<string, any>,
  ) {
    const payload = this._preparePayload(message, data);
    this._logger[method](payload);
  }

  private _preparePayload(message: any, data?: string | Record<string, any>) {
    const requestId = httpContext.get(COMMON_CONSTANTS.HEADER.REQUEST_ID);
    return `${requestId} - ${message}${data ? ` ${JSON.stringify(data)}` : ''}`;
  }
}

export interface ILogger {
  log(message: string, data?: string | Record<string, any>): void;
  error(message: string, data?: string | Record<string, any>): void;
  warn(message: string, data?: string | Record<string, any>): void;
  debug(message: string, data?: string | Record<string, any>): void;
}

export type LoggerFactory = {
  create(context: string): ILogger;
};
