import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LogService } from '../logger/log.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  constructor(private readonly logger: LogService) { }

  private switchcase = cases => defaultCase => key =>
    cases.hasOwnProperty(key) ? cases[key] : defaultCase

  private defaultCaseValue = 20019;

  private getErrorCode = (statusCode) =>
    this.switchcase({
      400: 20019,
      401: 30001,
      403: 20160,
      404: 20022,
      405: 20021,
      409: 20078,
      429: 20077,

      500: 10000,
      501: 10002,
      503: 10001,
      504: 10005
    })(this.defaultCaseValue)(statusCode)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus() || 500;
    const hostname = require("os").hostname();
    const errorCode = this.getErrorCode(status);

    const errors = [];
    if (!exception.message) {
      errors.push({
        errorCode: errorCode,
        developerMessage: "Unexpected error while attempting the process",
        userMessage: "Unexpected error while attempting the process",
        moreInfo: "Was encountered an error when processing your request. We apologize for the inconvenience."
      });
    } else {
      if (typeof (exception.message) === "string") {
        errors.push({
          errorCode: errorCode,
          developerMessage: exception.message,
          userMessage: exception.message,
          moreInfo: exception.stack
        });
      }
      if (exception.message.message) {
        if (typeof (exception.message.message) === 'string') {
          errors.push({
            errorCode: errorCode,
            developerMessage: exception.message.message,
            userMessage: exception.message.message,
            moreInfo: exception.stack
          });
        } else {
          exception.message.message.map(err => {
            const erro = err.constraints;
            if (erro) {
              const keys = Object.getOwnPropertyNames(erro);
              for (let keyNumber in keys) {
                let keyName = keys[keyNumber];
                if (keyName) {
                  errors.push({
                    errorCode: errorCode,
                    developerMessage: err.constraints[keyName],
                    userMessage: err.constraints[keyName],
                    moreInfo: `Property ${err['property']}`
                  });
                }
              }
            }
          });
        }
      }
    }

    var jsonObject = {
      meta: {
        server: hostname
      },
      errors: errors,
      statusCode: status,
      success: false
    };

    response
      .status(status)
      .json(jsonObject);

    this.logger.error(`${request.method} ${status} ${request.url}`, {
      headers: request.headers,
      body: request.body,
      stack: exception.stack,
      path: request.url,
    });
  }
}