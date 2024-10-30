import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

interface Data<T>{
    data:T
}

export class ResponseInterceptor<T> implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> | Promise<Observable<Data<T>>>{
        return next.handle().pipe(map(data=>{
            return {
                data,
                status:200,
                message:'成功',
                succecc:true
            }
        }))
    }

}