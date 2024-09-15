import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();

        return this.validateRequest(request);
    }

    validateRequest(request: Request): boolean {
        const authHeader = request.headers['authorization'] || request.headers['Authorization'];
        if (authHeader !== '123456') {
            throw new UnauthorizedException('User Unauthorized');
        }
        return true;
    }
}
