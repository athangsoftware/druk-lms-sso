import { ErrorResponseModel } from './core/models/error-response.model';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, BadRequestException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@app/prisma-sso';
import { Response } from 'express';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const errorResponse: ErrorResponseModel = { errorMessages: [] };

    if (exception instanceof BadRequestException) {
      const badRequestResponse = exception.getResponse() as any;
      if (typeof badRequestResponse === 'string') {
        errorResponse.errorMessages = [badRequestResponse];
      } else if (badRequestResponse.message) {
        errorResponse.errorMessages = Array.isArray(badRequestResponse.message)
          ? badRequestResponse.message
          : [badRequestResponse.message];
      }
      statusCode = exception.getStatus() || HttpStatus.BAD_REQUEST;
    } else if (exception instanceof HttpException) {
      const httpExceptionResponse = exception.getResponse() as any;
      errorResponse.errorMessages =
        typeof httpExceptionResponse === 'string'
          ? [httpExceptionResponse]
          : [httpExceptionResponse.message || 'An error occurred'];
      statusCode = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    } else if (exception instanceof Error) {
      errorResponse.errorMessages = ['An unexpected error occurred. Please try again later.'];
      errorResponse.systemErrorMessage = exception.message;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaError = this.handlePrismaErrors(exception);
      statusCode = prismaError.statusCode;
      errorResponse.errorMessages = [prismaError.message];
    } else {
      errorResponse.errorMessages = ['An unknown error occurred. Please contact the administrator.'];
    }

    response.status(statusCode).json(errorResponse);
  }

  private handlePrismaErrors(exception: Prisma.PrismaClientKnownRequestError): {
    statusCode: number;
    message: string;
  } {
    switch (exception.code) {
      case 'P2000':
        return { statusCode: HttpStatus.BAD_REQUEST, message: 'Input value is too long for the field.' };
      case 'P2001':
        return { statusCode: HttpStatus.NOT_FOUND, message: 'The requested record was not found.' };
      case 'P2002':
        return { statusCode: HttpStatus.CONFLICT, message: 'A record with this value already exists.' };
      case 'P2003':
        return { statusCode: HttpStatus.BAD_REQUEST, message: 'Foreign key constraint failed. Please check related records.' };
      case 'P2004':
        return { statusCode: HttpStatus.BAD_REQUEST, message: 'A constraint failed in the database operation.' };
      case 'P2005':
        return { statusCode: HttpStatus.BAD_REQUEST, message: 'Invalid value provided for a field.' };
      case 'P2025':
        return { statusCode: HttpStatus.NOT_FOUND, message: 'The requested record was not found.' };
      case 'P2026':
        return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Database connectivity issues detected.' };
      default:
        return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'An unexpected database error occurred.' };
    }
  }
}
