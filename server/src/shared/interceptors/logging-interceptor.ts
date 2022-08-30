import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { performance } from 'perf_hooks';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const startTime = performance.now();
    this.logger.debug(`Start - path: ${req.url} | method: ${req.method}`);

    res.on('close', () => {
      const endTime = performance.now();
      this.logger.debug(
        `Finish (${res.statusCode}) - totalTime: ${(
          endTime - startTime
        ).toFixed(2)} milliseconds`,
      );
    });

    return next.handle();
  }
}
