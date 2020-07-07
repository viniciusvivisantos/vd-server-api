import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpSuccessFilter<T> implements NestInterceptor<T, any>{
    getResponse(data: any, offset: number, limit: number) {
        const hostname = require("os").hostname();
        const recordCount = data ? data.itemCount || 1 : 0;
        const records = data ? data.items || [data] : [];

        const meta = {
            meta: {
                server: hostname,
                recordCount: recordCount,
                offset: offset,
                limit: limit
            },
            records: records
        }
        return meta;
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.getArgs()[0];
        const offset = parseInt(request.query.offset || 1);
        const limit = parseInt(request.query.limit || 100);
        return next.handle().pipe(map(data => {
            return this.getResponse(data, offset, limit);
        }));
    }
}