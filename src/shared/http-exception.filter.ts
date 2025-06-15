import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  private _logger = new Logger(HttpExceptionFilter.name);

  constructor(private readonly i18n: I18nService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const {
      code,
      message: initialMessage = 'Internal Server Error',
      data = null,
    }: ResponseException = exception.getResponse() as ResponseException;
    this._logger.error('Unhandled exception', exception.getResponse());

    let message = initialMessage;

    if (typeof message === 'string') {
      const key = `message.${message}`;
      message = this.i18n.translate(key, {
        lang: I18nContext.current()!.lang || 'en',
        debug: true,
      });

      if (message === key) {
        message = initialMessage; // Fallback to initial message if translation not found
      }
    }

    response.status(status).json({
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      code: code || 'unknown',
      message: message,
      data,
    });
  }
}

export type ResponseException = {
  status?: HttpStatus;
  error?: string;
  code?: string;
  url?: string;
  message?: string;
  module?: string;
  data?: object | null;
};
