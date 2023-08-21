import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ApiResponseDto } from '../dto/api-response-dto';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<T>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = response.statusCode;

        return {
          statusCode,
          message: 'success',
          data,
          errors: [data?.errors],
        };
      }),
      catchError((err) => {
        const response = err.getResponse();
        const status = err.getStatus();

        return throwError(() => new HttpException(response, status));
      }),
    );
  }
}
