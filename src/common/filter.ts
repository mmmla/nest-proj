import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";


@Catch()
export class HttpFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost){
        const ctx=host.switchToHttp()
        const request=ctx.getRequest()
        const response=ctx.getResponse()
        const status=exception?.getStatus()
        response.status(status).json({
            success:false,
            time:new Date(),
            data:exception.message,
            path:request.url,
            status,
        })
    };
}