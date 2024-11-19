import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";


@Catch(HttpException)
export class HttpFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost){
        const ctx=host.switchToHttp()
        const request=ctx.getRequest()
        const response=ctx.getResponse()
        const status=exception.getStatus()

        response.status(status).json({
            time:new Date().toISOString(),
            data:exception.message,
            // message:'请求失败',
            path:request.url,
            status,
        })
    };
}