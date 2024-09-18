import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly reflector: Reflector,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();
        return this.validateRequest(request);
    }

    validateRequest(request: Request): boolean {
        const authHeader = request.headers['authorization'] || request.headers['Authorization'];
        if (authHeader !== this.configService.get('api_key')) {
            throw new UnauthorizedException('User Unauthorized');
        }
        return true;
    }
}
